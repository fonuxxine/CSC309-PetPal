
let bearer = 'Bearer ' + localStorage.getItem('access_token');

export function sendNotification(message, userID, link) {
        fetch(`/user/${userID}/notifications/`, {
            method: 'POST',
            headers: {
                'Authorization': bearer,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                link: link
            }),
        }).then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            } else {
                return response.json();
            }
        })
            .then(json => {
                if (json.detail) {
                    alert("Error: error with sending notifications");
                } else {
                    return json;
                }
        });
    }