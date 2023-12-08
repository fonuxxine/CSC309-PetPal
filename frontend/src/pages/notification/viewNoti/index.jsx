import {Link} from "react-router-dom";
import React from "react";

function ViewNoti({notification}) {
    return <div className="container-fluid w-75 mt-5">
             <table className="table table-bordered">
             <thead>
                <tr>
                    <th>Message</th>
                    <th>Link</th>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr key={notification.id}>
                    <td>{notification.message}</td>
                    <td><Link to={notification.link}>{notification.link}</Link></td>
                    <td>{notification.time_created}</td>
                    {notification.read ? <td>READ</td> : <td>UNREAD</td>}
                </tr>
            </tbody>
            </table>
        </div>
}

export default ViewNoti;