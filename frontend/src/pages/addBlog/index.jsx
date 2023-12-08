import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function AddBlog() {

    const [ title, setTitle ] = useState("");
    const [ image, setImage ] = useState(null);
    const [ content, setContent ] = useState("");
    const [ errors, setErrors] = useState("");

    const { shelterID } = useParams();

    let navigate = useNavigate();

    function navBack() {
        return navigate(-1);
    }

    function addBlog() {
        fetch(`/blog/${shelterID}/`, {
            method: "POST",
            headers: {
                Authorization: bearer,
            },
            body: JSON.stringify({
                title: title,
                photo: image,
                content: content,
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if ("id" in json) {
                alert("Successfully added blog post!");
                navigate(-1);
            } else {
                setErrors(JSON.stringify(json));
            }
        });
    }


    return (
        <>
            <div className="container-fluid return-to-bar">
                <div className="row">
                    <div className="col-sm-4 justify-content-start p-3">
                        <button className="btn btn-outline-dark search-btn" onClick={() => navBack()}>Return to blog posts</button>
                    </div>
                    <div className="col-sm-4 justify-content-center p-3">
                        <h1 className="login-h1 text-center fw-bold">Create Shelter Blog</h1>
                    </div>
                </div> 
            </div>
            <div className="d-flex justify-content-center pt-4">
                <div className="w-75">
                    <div className="form-group p-2">
                    {errors === "" ? (<p className="login-error p-0">{errors}</p>) : (<></>)}
                        <label>Title</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your title"
                            onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Photo</label>
                        <input 
                            type="file"
                            className="form-control"
                            onChange={(event) => setImage(event.target.files[0])}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Content</label>
                        <input 
                            type="textarea"
                            className="form-control"
                            onChange={(event) => setContent(event.target.value)}
                            required
                        />
                    </div>
                    <div><button className="login-but mt-2 p-2" onClick={() => addBlog()}>Submit</button></div>
                </div>
            </div>
        </>
    )

}

export default AddBlog;