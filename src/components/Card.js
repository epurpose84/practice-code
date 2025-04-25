import { useState, useEffect } from "react";
import axios from "axios";

const Card = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      });
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    let start = Math.max(currentPage - 1, 1);
    let end = start + 2;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - 2, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div className="col-md-4 mb-4" key={post.id}>
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading posts...</div>
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>

            {getPageNumbers().map((number) => (
              <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                <button onClick={() => paginate(number)} className="page-link">
                  {number}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Card;
