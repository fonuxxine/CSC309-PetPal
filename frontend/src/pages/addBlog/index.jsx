import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

let bearer = "Bearer " + localStorage.getItem("access_token");

function AddBlog() {

    const [ blogInfo, setBlogInfo] = useState({});
    const [ errors, setErrors] = useState("");

    const { shelterID } = useParams();

    let navigate = useNavigate();

    function navBack() {
        return navigate(-1);
    }

    function addBlog() {
        const formData = new FormData();
        for (let key in blogInfo) {
            if (blogInfo[key] !== null) {
              formData.append(key, blogInfo[key]);
            }
        }

        fetch(`/blog/${shelterID}/`, {
            method: "POST",
            headers: {
                Authorization: bearer,
            },
            body: formData,
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

    // function handleFileChange(event) {
    //     const selectedFile = event.target.files[0];
    //     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    
    //     if (!allowedTypes.includes(selectedFile?.type)) {
    //       setErrors((errors) => ({
    //         ...errors,
    //         profile_pic: "Must be JPG, JPEG or PNG",
    //       }));
    //     } else {
    //         setBlogInfo({ ...blogInfo, photo: selectedFile });
    //         setErrors((errors) => ({ ...errors, profile_pic: "" }));
    //     //   const file = new FileReader();
    //     //   file.onload = function () {
    //     //     setProfilePicPreview(file.result);
    //     //   };
    //     //   file.readAsDataURL(selectedFile);
    //     }
    //   }


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
                    {errors ? (<p className="login-error p-0">{errors}</p>) : (<></>)}
                        <label>Title</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Enter your title"
                            onChange={(event) =>
                                setBlogInfo({ ...blogInfo, title: event.target.value })
                              }
                            // onChange={(event) => setTitle(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Photo</label>
                        {/* <label
            htmlFor="profile"
            className="btn btn-primary position-absolute bottom-0 start-0"
          ></label> */}
                        <input 
                            type="file"
                            className="form-control"
                            onChange={(event) =>
                                setBlogInfo({ ...blogInfo, photo: event.target.files[0] })
                              }
                            required
                        />
                    </div>
                    <div className="form-group p-2">
                        <label>Content</label>
                        <textarea className="form-control" onChange={(event) =>
                                setBlogInfo({ ...blogInfo, content: event.target.value })
                              }
                            required/>
                    </div>
                    <div><button className="login-but mt-2 p-2" onClick={() => addBlog()}>Submit</button></div>
                </div>
            </div>
        </>
    )

}

export default AddBlog;