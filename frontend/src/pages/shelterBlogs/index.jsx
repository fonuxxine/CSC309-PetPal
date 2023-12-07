import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShelterInfo from "../shelterDetails/shelterInfo";
import Blogs from "./blogs";

function ShelterBlogs() {
  const { shelterID } = useParams();
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const blogsURL = `/blog/${shelterID}/all/?page=${curPage}`;

  useEffect(() => {
    fetch(blogsURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setBlogs(json.results);
        setTotalPages(Math.ceil(json.count / 6));
      });
  }, [curPage]);

  return (
    <>
      <ShelterInfo />
      <Blogs blogs={blogs}/>
      <p className="text-center">
          {curPage > 1 ? (
            <button
              className="page-but"
              onClick={() => setCurPage(curPage - 1)}
            >
              Previous
            </button>
          ) : (
            <></>
          )}
          {curPage < totalPages ? (
            <button
              className="page-but"
              onClick={() => setCurPage(curPage + 1)}
            >
              Next
            </button>
          ) : (
            <></>
          )}
        </p>
        <p className="text-center">
          Page {curPage} out of {totalPages}
        </p>
    </>
  );
}

export default ShelterBlogs;
