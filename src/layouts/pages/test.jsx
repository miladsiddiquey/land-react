import React, { useEffect, useState } from 'react';
import { FaRegClock } from "react-icons/fa";
import { RiHome4Line } from "react-icons/ri";
import { IoIosResize } from "react-icons/io";
import { IoPricetags } from "react-icons/io5";
import { RiStackshareLine } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useParams } from 'react-router-dom';

const SinglePage = () => {
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [singleTD, setSingleTD] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        apnId: '',  // Initialize apnId
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const url = `http://localhost/land/admin/api_single.php?id=${id}`;

        fetch(url)
            .then(res => {
                if (res.ok) {
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
                console.log(data);
                const item = data[0];
                const imageUrls = item.slide_img.split(',').map(filename => `http://localhost/land/admin/upload_images/${filename}`);
                setSingleTD({ ...item, slide_img: imageUrls });

                // Update form state with apnId
                setForm(prevForm => ({
                    ...prevForm,
                    apnId: item.apn_id,
                }));

                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost/land/admin/submit_form.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success, maybe close modal and reset form
            setShow(false);
            setForm(prevForm => ({
                ...prevForm,
                name: '',
                email: '',
                phone: '',
                message: '',
            }));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!singleTD) return <p>No data found</p>;

    const shareUrl = `http://localhost/land/single-page/${id}`;
    const shareText = encodeURIComponent(`Check out this post: ${singleTD.title}\n${singleTD.description}`);

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const whatsappShareUrl = `https://wa.me/?text=${shareText}`;
    const instagramShareUrl = `https://www.instagram.com`;

    return (
        <div className='container py-4'>
            <div className="row align-items-start ">
                <div className="col-md-9 pe-md-4 mb-4 mb-md-0">
                    <div className="single-box p-3 pb-4">
                        <Swiper
                            spaceBetween={20}
                            pagination={true}
                            modules={[Pagination]}
                            slidesPerView={1}
                        >
                            {singleTD.slide_img.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img className='w-100' src={img} alt="slide img" />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <h4 className='mt-4 mb-1' style={{color: "var(--button-color)" , fontSize: "var(--font-24px)"}}>{singleTD.title}</h4>
                        <small className='mb-2 d-block' style={{color: "#777" , fontSize: "var(--font-12px)"}}>Posted on {singleTD.date}, Alhamra, Sylhet</small>
                        <div className='mb-2 d-flex align-items-center gap-2 ' style={{fontSize: "var(--font-20px)" }}>
                            <IoPricetags style={{color: "var(--button-color)"}} /> <span className='fw-semibold'>{singleTD.sale_price}TK</span>
                        </div>
                        <p style={{color: "#555" , fontSize: "var(--font-14px)"}}>
                            {singleTD.description}
                        </p>

                        <ul className=' single-items'>
                            <li className=''><FaRegClock /> <span>{singleTD.status}</span></li>
                            <li className=''><RiHome4Line/> <span>{singleTD.state}</span></li>
                            <li className=''><IoIosResize/> <span>{singleTD.area_size}</span></li>
                        </ul>

                        <div className='d-flex align-items-center gap-2'>
                            <Dropdown >
                                <Dropdown.Toggle id="dropdown-basic" type='button' className='btn btn-success' style={{background: "var(--button-color)" , fontSize: "var(--font-14px)"}}>
                                    <RiStackshareLine />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='dropdown-box'>
                                    <Dropdown.Item href={facebookShareUrl} target="_blank" rel="noopener noreferrer"><FaFacebook/> Facebook</Dropdown.Item>
                                    <Dropdown.Item href={whatsappShareUrl} target="_blank" rel="noopener noreferrer"><IoLogoWhatsapp/> Whatsapp</Dropdown.Item>
                                    <Dropdown.Item href={instagramShareUrl} target="_blank" rel="noopener noreferrer"><FaSquareInstagram/> Instagram</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <button className='btn btn-success'  style={{background: "var(--button-color)" , fontSize: "var(--font-14px)"}} onClick={handleShow}>
                                I'm Interested In This Property
                            </button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        <h4 className='m-0' 
                                        style={{fontSize: "var(--font-16px)"}}>I'm Interested In This Property (APN: {form.apnId})</h4>
                                    </Modal.Title>
                                </Modal.Header>
                                <form onSubmit={handleSubmit}>
                                    <Modal.Body>
                                        <div className="row px-3">
                                            <div className="col-sm-6 form-input p-0 pe-3">
                                                <label htmlFor="name">Name:</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                
                                            </div>
                                            <div className="col-sm-6 form-input p-0 pe-3">
                                                <label htmlFor="email">Email:</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-sm-12 form-input p-0">
                                                <label htmlFor="phone">Phone:</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-sm-12 form-input p-0">
                                                <label htmlFor="message">Message:</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={form.message}
                                                    onChange={handleInputChange}
                                                    style={{height: "100px"}}
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className='btn btn-danger'  style={{ fontSize: "var(--font-14px)"}} type='button' onClick={handleClose}>
                                            Cancel
                                        </button>
                                        <button className='btn btn-success'  style={{background: "var(--button-color)" , fontSize: "var(--font-14px)"}} type='submit'>
                                            Submit
                                        </button>
                                    </Modal.Footer>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 single-right">
                    <div className='mb-3'>
                        <img className='w-100' src="https://varanibo.com/assets/img/uploaded/ads/202405070838Add-Banner-For-Varanibo-2.jpg" alt="" />
                    </div>
                    <div className='mb-3'>
                        <img className='w-100' src="https://varanibo.com/assets/img/uploaded/ads/202405070838Add-Banner-For-Varanibo-2.jpg" alt="" />
                    </div>
                    <div className='mb-3'>
                        <img className='w-100' src="https://varanibo.com/assets/img/uploaded/ads/202405070838Add-Banner-For-Varanibo-2.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;
