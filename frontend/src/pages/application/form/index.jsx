import app from "../../../App";
import React from "react";
import { Link } from "react-router-dom";

function Form({application}, {pet_listing}) {
   
    return <>
        <div className="application-form">
              <div className="container-fluid">
                 <table className="table table-bordered">
                     <tbody>
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
                     {pet_listing ? <tr>
                      <th>Pet Listing</th>
                      <td>{pet_listing}</td>
                   </tr> : <></>}
                   <tr>
                      <th>Status</th>
                      <td>{application.status}</td>
                   </tr>
                   <tr>
                      <th>Reason</th>
                      <td>{application.reason}</td>
                   </tr>
                     </tbody>
                 </table>
                  <div className="container-fluid d-flex justify-content-start pt-4 pb-4">
                      {application.id ? <Link to={`/applications/${application.id}/`} className="btn btn-outline-dark adoption-btn m-4">View Application</Link> : <></>}
                    <Link to={`messages/`} className="btn btn-outline-dark adoption-btn m-4">Message</Link>
                    <Link to={`/user/${application.applicant}/`} className="btn btn-outline-dark adoption-btn m-4">Applicant Profile</Link>
                </div>

            </div>
        </div>
    </>;
}

export default Form;