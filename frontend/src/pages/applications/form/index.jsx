import app from "../../../App";

function Form({application}) {
    return <>
        <div className="application-form">
            <div className="container-fluid d-flex justify-content-center p-4 message">
                 <a href="message.html">
                  <button type="submit" className="btn btn-outline-dark submit">Message</button>
                 </a>
            </div>
            <div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="firstname">First Name</label>
                      <input type="text" id="firstname" name="firstname" value={application.firstname}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="lastname">Last Name</label>
                      <input type="text" id="lastname" name="lastname" value={application.lastname}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="email">Email</label>
                      <input type="text" id="email" name="email" value={application.email}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field" id="location-field">
                      <label htmlFor="address">Location</label>
                      <input type="text" id="address" name="address" value={application.address}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <p>Adoption Preference</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="pet_listing">Pet Listing</label>
                      <input type="text" id="pet_listing" name="pet_listing" value={application.pet_listing.name}/>
                    </div>
                    <div className="field">
                      <label htmlFor="status">Status</label>
                      <input type="text" id="status" name="status" value={application.status}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="reason">Reason</label>
                      <textarea rows="8" id="reason" name="reason" value={application.reason}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid d-flex justify-content-center p-4 message">
                <button type="submit" className="btn btn-outline-dark submit">View only</button>
              </div>
            </div>
        </div>
    </>;
}

export default Form;