import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import Modal from 'react-bootstrap/Modal';
// Import Swiper styles and other necessary imports

const SinglePage = () => {
    const { id } = useParams();
    console.log(id);

    const [show, setShow] = useState(false);
    const [singleTD, setSingleTD] = useState(null); // Initialize with null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const url = `http://localhost/land/admin/api_single.php?id=${id}`;
    
        fetch(url)
            .then(res => {
                if (res.ok) {
                    // Check if the response is JSON
                    const contentType = res.headers.get('Content-Type');
                    if (contentType && contentType.includes('application/json')) {
                        return res.json();
                    } else {
                        throw new Error('Expected JSON response');
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                setSingleTD(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!singleTD) return <p>No data found</p>;