import React from "react";

function MessageTemplate({messages}) {
    return <>
        <div className="container-fluid">
             <table className="table table-bordered">
             <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
            {messages.map(m => (
                <tr key={m.id}>
                    <td>{m.user_from}</td>
                    <td>{m.user_to}</td>
                    <td>{m.message}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    </>
}

export default MessageTemplate;