import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import NotiTemplate from "./notiTemplate";

let bearer = 'Bearer ' + localStorage.getItem('access_token');

function Notification() {
    const [notification, setNotification] = useState("");
    const {notificationID} = useParams();

    useEffect(() => {
        fetch(`/notifications/${notificationID}/`, {
            headers: {'Authorization': bearer},
        })
            .then(response => response.json())
            .then(json => {
                setNotification(json.results);
            })
    }, [notificationID])

    return <>
        <div className="container-fluid p-4 return-to-bar">
            <h1 className="text-center fw-bold">Notifications</h1>
          </div>
        <NotiTemplate noti={notification}></NotiTemplate>
    </>
}

export default Notification;