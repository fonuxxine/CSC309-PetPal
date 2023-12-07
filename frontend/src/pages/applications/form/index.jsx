import app from "../../../App";
import React from "react";

function Form({application}, {pet_listing}) {
    return <>
        <div className="application-form">
              <div className="container-fluid">
                 <table className="table table-bordered">
                   <tr>
                      <th>First Name</th>
                      <td>{application.firstname}</td>
                   </tr>
                   <tr>
                      <th>Last Name</th>
                      <td>{application.lastname}</td>
                   </tr>
                   <tr>
                      <th>Email</th>
                      <td>{application.email}</td>
                   </tr>
                   <tr>
                      <th>Address</th>
                      <td>{application.address}</td>
                   </tr>
                   <tr>
                      <th>Pet Listing</th>
                      <td>{pet_listing}</td>
                   </tr>
                   <tr>
                      <th>Status</th>
                      <td>{application.status}</td>
                   </tr>
                   <tr>
                      <th>Reason</th>
                      <td>{application.reason}</td>
                   </tr>
                 </table>
              <div className="container-fluid d-flex justify-content-center p-4 message">
                <button type="submit" className="btn btn-outline-dark submit">View only</button>
              </div>
            </div>
        </div>
    </>;
}

export default Form;