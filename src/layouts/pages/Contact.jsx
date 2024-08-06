
import React from 'react'
import abadImage from '../../assets/image/abadimage.jpg';
import land1 from '../../assets/image/imageland.jpg';


const contact = () => {

  const bannerImage = {
    background: `url(${abadImage}) ` ,
     
  };


  return (
    <>
    {/* -----about-banner section start---- */}
    <div className="about-banner"  style={ bannerImage }>
      <div className="container">
        <div className="about-hero">
          <h1>Request For Your Lands</h1>
        </div>
      </div>
    </div>
    {/* -----about-banner section End------ */}

    {/* Form  */}

    <div className='container text-center pt-5'>
      <h2>Enter Your Information</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div className='container pt-3 pb-4' style={{maxWidth: "600px"}}>
      <form action="">
        <div className="row">
          <div className="form-input col-md-6">
            <label htmlFor="">Name</label>
            <input type="text"  placeholder='Name' />
          </div>
          <div className="form-input col-md-6">
            <label htmlFor="">Email</label>
            <input type="email"  placeholder='Email' />
          </div>
          <div className="form-input col-md-12">
            <label htmlFor="">Phone</label>
            <input type="tel"  placeholder='Phone' />
          </div>
          {/* <div className="form-input col-md-12">
            <label htmlFor="">Land Title</label>
            <input type="text"  placeholder='Land Title' />
          </div> */}
          <div className="form-input col-md-12">
            <label htmlFor=""> Describtion</label>
              <textarea placeholder='Land Describtion' style={{height: "80px"}}></textarea>
          </div>
          {/* <div className="form-input col-md-12">
            <label htmlFor="">Country</label>
            <select name="" id="">
              <option value="">Select Country</option>
              <option value="">Select Country</option>
              <option value="">Select Country</option>
              <option value="">Select Country</option>

            </select>
          </div>
          <div className="form-input col-md-6">
            <label htmlFor="">State</label>
            <input type="text"  placeholder='State' />
          </div>
          <div className="form-input col-md-6">
            <label htmlFor="">size</label>
            <input type="text"  placeholder='size' />
          </div>
          <div className="form-input col-md-6">
            <label htmlFor="">Market value </label>
            <input type="text"  placeholder='Market value ' />
          </div>
          <div className="form-input col-md-6">
            <label htmlFor="">Sale price            </label>
            <input type="text"  placeholder='Sale price' />
          </div> */}
        </div>
        <button type="submit" className='mt-2 w-100 btn  btn-success' style={{background: "var(--button-color)" , borderRadius: "30px"}}>Submit</button>
      </form>
    </div>

  </>
  
  )
}

export default contact
