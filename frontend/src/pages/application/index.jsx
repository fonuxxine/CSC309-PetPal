import Applications from "../applications";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Form from "../applications/form";

function Application () {
    const [application, setApplication] = useState({});
    const { applicationID } = useParams();

    useEffect(() => {
        fetch(`applications/${applicationID}/`)
            .then(response => response.json())
            .then(json => {
                setApplication(json);
            });
    }, [applicationID])

    return <>
        <div className="container-fluid p-4 return-to-bar">
          <h1 className="text-center fw-bold">Application</h1>
        </div>
        <Form application={application}/>
    </>
}

export default Application;