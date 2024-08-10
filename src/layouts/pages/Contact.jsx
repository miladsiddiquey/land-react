import React, { useState } from 'react';
import abadImage from '../../assets/image/abadimage.jpg';
import Modal from 'react-bootstrap/Modal';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    apnId: 'contact message' // Set default or dynamic value as needed
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const bannerImage = {
    background: `url(${abadImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
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
      setShowSuccess(true); // Show success modal
      // Reset form if needed
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        apnId: 'contact message', // Reset hidden field if needed
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleCloseSuccess = () => setShowSuccess(false);

  return (
    <>
      {/* -----about-banner section start---- */}
      <div className="about-banner" style={bannerImage}>
        <div className="container">
          <div className="about-hero">
            <h1>Request For Your Lands</h1>
          </div>
        </div>
      </div>
      {/* -----about-banner section End------ */}

      {/* Form */}
      <div className='container text-center pt-5'>
        <h2>Enter Your Information</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className='container pt-3 pb-4' style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-input col-md-6">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder='Name'
                required
              />
            </div>
            <div className="form-input col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder='Email'
                required
              />
            </div>
            <div className="form-input col-md-12">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder='Phone'
                required
              />
            </div>
            <div className="form-input col-md-12">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleInputChange}
                placeholder='Message'
                style={{ height: "80px" }}
                required
              ></textarea>
            </div>
            {/* Hidden input for apnId */}
            <input
              type="hidden"
              name="apnId"
              value={form.apnId}
            />
          </div>
          <button type="submit" className='mt-2 w-100 btn btn-success' style={{ background: "var(--button-color)", borderRadius: "30px" }}>
            Submit
          </button>
        </form>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your message has been successfully submitted. We will get back to you soon.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-success' style={{ background: "var(--button-color)" }} onClick={handleCloseSuccess}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Contact;
