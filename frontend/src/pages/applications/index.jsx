
import "./style.css";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import Form from "./form";

let bearer = 'Bearer ' + localStorage.getItem('access_token');

function Applications() {

    const [applications, setApplications] = useState([]);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const { petID } = useParams();
    const statusList = ["pending", "accepted", "denied", "withdrawn"];

    const query = useMemo(() => ({
        page: parseInt(searchParams.get("page") ?? 1),
        status: searchParams.getAll("status") ?? [],
    }), [searchParams]);

    function to_url_params(object) {
        var result = [];
        for (const key in object) {
            if (Array.isArray(object[key])) {
                for (const value of object[key]) {
                    result.push(`${key}=${value}`);
                }
            }
            else {
                let value = object[key];
                result.push(`${key}=${value}`);
            }
        }
        return result.join('&');
    }

    useEffect(() => {
        const param = to_url_params(query);
        fetch(`/pet-listing/${petID}/applications/?${param}`,
            {
                headers: {'Authorization': bearer},
            })
            .then(response => response.json())
            .then(json => {
                setApplications(json.results);
                setTotalPages(Math.ceil(json.count / 9));
            })
    }, [query, petID]);

    return <>
        <div className="container-fluid p-4 return-to-bar">
          <h1 className="text-center fw-bold">Application</h1>
        </div>
        <div className="p-5">
             <div className="checkbox-group">
                <p>Status: </p>
                {statusList.map(stat => <label key={stat}>{stat}
                    <input type={"checkbox"}
                    onChange={event => {
                        if (event.target.checked) {
                            setSearchParams({status: [...query.status, stat], page: 1});
                        } else {
                            setSearchParams({status: query.status.filter(s => s !== stat), page: 1});
                        }
                    }}
                           checked={query.status.includes(stat)}
                    />
                </label>)}
            </div>
            {applications?.map(application => (
                <Form key={application.id} application={application} pet_listing={petID} />
            ))}
            <p>
                {query.page < totalPages ? <button onClick={() => setSearchParams({
                    ...query, page: query.page + 1
                })}>Next</button> : <></>}
                {query.page > 1 ? <button onClick={() => setSearchParams({
                    ...query, page: query.page - 1
                })}>Previous</button> : <></>}
            </p>
            <p>Page {query.page} out of {totalPages}</p>
        </div>
    </>
}

export default Applications;