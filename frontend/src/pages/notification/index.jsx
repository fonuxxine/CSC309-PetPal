import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ViewNoti from "./viewNoti";

let bearer = 'Bearer ' + localStorage.getItem('access_token');

function Notification() {
    let navigate = useNavigate();
    const [notification, setNotification] = useState({});
    const {notificationID} = useParams();

    fetch(`/notifications/${notificationID}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': bearer,
            'content-type': "application/json",
        },
    }).then((response) => {
            if (response.status === 200) {
              return {};
            }
            return response.json();
            })

    function deleteNotification() {
        fetch(`/notifications/${notificationID}/`, {
            method: 'DELETE',
            headers: {
            'Authorization': bearer,
            'content-type': "application/json",
        },
        }).then((response) => {
            if (response.status === 204) {
              alert("Successfully delete!");
              navigate(`/user/${localStorage.getItem("user_id")}/notifications/`);
            }
        })
    }


    useEffect(() => {
        fetch(`/notifications/${notificationID}/`, {
            headers: {'Authorization': bearer},
        })
            .then(response => response.json())
            .then(json => {
                setNotification(json);
            })
    }, [notificationID])


    return <>
        <div className="container-fluid p-4 return-to-bar">
            <h1 className="text-center fw-bold">Notification</h1>
          </div>
        <button className="btn btn-primary m-5 mb-0" onClick={deleteNotification}>Delete</button>
        <ViewNoti notification={notification}></ViewNoti>
    </>
}

export default Notification;