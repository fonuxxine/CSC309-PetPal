import {Link} from "react-router-dom";
import React from "react";

function NotiTemplate({noti}) {
    return <div className="container-fluid">
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
                <tr key={noti.id}>
                    <td>{noti.message}</td>
                    <td><Link to={noti.link}>{noti.link}</Link></td>
                    <td>{noti.time_created}</td>
                    {noti.read ? <td>READ</td> : <td>UNREAD</td>}
                </tr>
            </tbody>
            </table>
        </div>
}

export default NotiTemplate;