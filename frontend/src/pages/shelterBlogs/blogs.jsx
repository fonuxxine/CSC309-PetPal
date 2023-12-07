import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BlogCard from "./blog";

// take in a list of blogs
function Blogs({ blogs }) {
  const { shelterID } = useParams();
  return (
    <div className="row container-fluid ps-5 justify-content-md-center">
      <h1 className="ms-5">
        Shelter Blogs{" "}
        {/** onclick take to create blog page */}
        {localStorage.getItem("user_id") === shelterID ? (
          <Link to="..."><button className="add-but p-2">+ New Blog</button></Link>
        ) : (
          <></>
        )}
      </h1>
      {blogs.map((blog) => (
        <BlogCard
          title={blog.title}
          photo={blog.photo}
          date={blog.publication_date.split("T")[0]}
          content={blog.content}
        />
      ))}
    </div>
  );
}

export default Blogs;
