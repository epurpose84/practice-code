import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Card = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    useEffect(() => {
        axios.get(`https://dummyjson.com/users?limit=100`) // get more users
            .then((response) => {
                setData(response?.data.users);
            });
    }, []);

    // Calculate indices for slicing the data
    const indexOfLastUser = currentPage * usersPerPage;
    // console.log(indexOfLastUser)
    console.log(indexOfLastUser);
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    console.log(indexOfFirstUser);
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(data.length / usersPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className='container mt-4'>
            <div className="row">
                {currentUsers.map((value, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                        <div className="card h-100">
                            <div className='card-body'>
                                <h1 className="card-title">{value.firstName}</h1>
                                <h3 className="card-text">{value.gender}</h3>
                                <h3 className="card-text">{value.email}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button onClick={handlePrev} disabled={currentPage === 1} className="btn btn-primary mx-2">Previous</button>
                <span className="align-self-center">Page {currentPage} of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages} className="btn btn-primary mx-2">Next</button>
            </div>
        </div>
    );
};

export default Card;
