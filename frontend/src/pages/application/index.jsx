import {useEffect, useState} from "react";
import Landing from "../landing";
function Application() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        async function fetchApplications(){
            let response = await fetch('pet-listing/<int:pk>/applications/');
            if (response.ok) {

            }
        }
    })
}

export default Application;