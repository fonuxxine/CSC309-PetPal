import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

let bearer = 'Bearer ' + localStorage.getItem('access_token');

function Message() {
    const {appID} = useParams();
    const messageURL = `applications/${appID}/messages/`;
    const [messages, setMessages] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        async function fetchMessage() {
            await fetch(messageURL, {
                method: 'GET',
                headers: {'Authorization': bearer},
            }).then(response => response.json())
                .then(json => {
                    setMessages(json.results);
                    setTotalPages(Math.ceil(json.count / 9));
                })
        }
        fetchMessage();
    }, [appID]);

    function sendMessage() {
        fetch(messageURL, {
            method: 'POST',
            headers: {
                'Authorization': bearer,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
            }),
        }) .then(response => response.json())
            .then(json => {
                if (json.detail) {
                  setError("Error: error with sending message");
                }
            }).catch((err) => {
                setError('error:' + err);
              });
    }

    return <>
        <div className="container-fluid p-4 return-to-bar">
            <h1 className="text-center fw-bold">Message</h1>
         </div>
        <div className="m-5">
            <form className="w-50">
              <div className="form-group p-2">
                  <label>Message</label>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Enter message"
                      onChange={(event) => setMessage(event.target.value)}
                      required
                  />
              </div>
              <button className="login-but mt-2 p-2" onClick={() => sendMessage()}>Send Message</button>
            </form>
            <h3 className="pt-5">Message history</h3>
            {messages?.map(m => (
                <messageTemplate mess={m}></messageTemplate>
            ))}
        </div>
    </>
}

export default Message;