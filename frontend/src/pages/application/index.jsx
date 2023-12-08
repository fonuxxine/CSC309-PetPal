import Applications from "../applications";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Form from "../application/form";
import {sendNotification} from "../notification/sendNotification";


let bearer = 'Bearer ' + localStorage.getItem('access_token');

function Application () {
    const [application, setApplication] = useState({});
    const { applicationID } = useParams();
    const [status, setStatus] = useState("");
    const statusValues = ["pending", "accepted", "denied", "withdrawn"];

    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`/applications/${applicationID}/`,
            {
                headers: {
                    'Authorization': bearer,
                },
            })
            .then(response => response.json())
            .then(json => {
                setApplication(json);
            });
    }, [applicationID])


    function updateStatus() {
        fetch(`/applications/${applicationID}/`, {
            method: "PATCH",
            headers: {
                'Authorization': bearer,
                'content-type': "application/json",
            },
            body: JSON.stringify({
                status: status,
            })
        })
        .then((response) => {
            if (response.status === 200) {
              return {};
            }
            return response.json();
            })
            .then((err) => {
                setError("Error: " + err);
            })
        sendNotification("Status updated: " + status, application.applicant, `http://localhost:3000/applications/${applicationID}/`)
    }


    return <>
        <div className="container-fluid p-4 return-to-bar">
          <h1 className="text-center fw-bold">Application</h1>
        </div>
        <div className="d-flex flex-column justify-content-center pb-5">
            <form className="w-50 m-5 mb-0">
              <div className="form-group p-2">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    required
                  >
                     <option value="">Select status</option>
                    {statusValues.map((status, i) => (
                      <option value={status} key={i}>
                        {status}
                      </option>
                    ))}
                  </select>
              </div>
                {error ? <h4>{error}</h4> : <></>}
                <button className="login-but mt-2 p-2" onClick={() => updateStatus()}>Update</button>
          </form>
            <Form application={application} />
        </div>
    </>
}

export default Application;