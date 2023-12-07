import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MessageTemplate from "./messageTemplate";

let bearer = 'Bearer ' + localStorage.getItem('access_token');

function Message() {
    const {appID} = useParams();
    const messageURL = `/applications/${appID}/messages/`;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [error, setError] = useState("");

    const notiLink = `/applications/${appID}/`;

     function sendNotification(notiMessage, link, userID) {
        fetch(`/user/${userID}/notifications/`, {
            method: 'POST',
            headers: {
                'Authorization': bearer,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: notiMessage,
                link: link
            }),
        }).then(response => response.json())
            .then(json => {
                if (json.detail) {
                    setError("Error: error with sending notifications");
                }
            }).catch((err) => {
                setError("Error: " + err)
        });
    }


    useEffect(() => {
        async function fetchMessage() {
            await fetch(messageURL, {
                method: 'GET',
                headers: {
                    'Authorization': bearer,
                },
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
        }) .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            } else {
                return response.json();
            }
        })
            .then(json => {
                console.log(json);
                if (json.detail) {
                    alert("Error: error with sending message");
                } else {
                     const { userID } = message.user_to;
                     sendNotification(message, notiLink, userID);
                }
            }).catch((err) => {
                setError('Error: ' + err);
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
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                  />
              </div>
              <button className="login-but mt-2 p-2" onClick={() => sendMessage()}>Send Message</button>
            </form>
            <h3 className="pt-5">Message history</h3>
            <MessageTemplate messages={messages} />
            <p>
                {page < totalPages ? <button className="m-4 p-1" onClick={() => setPage(page + 1)}>Next</button> : <></>}
                {page > 1 ? <button className="m-4 p-1" onClick={() => setPage(page - 1)}>Previous</button> : <></>}
            </p>
            <p>{page} out of {totalPages}</p>
        </div>
    </>
}

export default Message;