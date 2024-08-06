import React from 'react'
import abadImage from '../../assets/image/abadimage.jpg';
import Product from './Product'
import { Link } from "react-router-dom";



const Home = () => {

  const bannerImage = {
    background: `url(${abadImage}) ` , 
  };

  const formLocation = [
    {
      id: 1 , name: "Sylhet" } , 
     { id: 2 , name: "Dhaka" } , 
     { id: 3 , name: "K"  }, 
     { id: 4 , name: "Cox Bazar"  }, 
     { id: 5 , name: "Borisal" } , 
     { id: 6 , name: "Mymansing" } , 
     { id: 7 , name: "abc" } , 

    
  ];

  const formType = [
   
    { id: 1 , name: "Home" } , 
    { id: 2 , name: "Commercial Rent" } , 
    { id: 3 , name: "Home" } , 
    { id: 4 , name: "Commercial Rent" } , 
    { id: 5 , name: "Home" } , 
    { id: 6 , name: "Commercial Rent" } , 

  ];


  return (
<>
  {/* -----about-banner section start---- */}
  <div className="about-banner" style={ bannerImage } >
    <div className="container">
      <div className="about-hero">
        <h1>Search Your Dream Land</h1>
        <form action="" className="product-search">
          <div className="moonray-form ">
            <select name="filtertype" id="search_slct">
              <option value="Location" selected="">
                Location
              </option>
              {formLocation.map(item => {
                return (
                  <option key={item.id} value={item.name}>{item.name}</option>
                )
              })}
            </select>
          </div>
     
          <div className="moonray-form product-search-input" >
            <select style={{ width: 300 }}>
              <option value="" selected="">Select Type  </option>

              {formType.map(item => {
                return (
                  <option value={item.name} key={item.id}>{item.name} </option>
                )
              })}

            </select>
          </div>
      
          <button type="submit" className="btn btn-success " style={{background: "var(--button-color)"}}>
            Find
          </button>
        </form>
      </div>
    </div>
  </div>

  {/* -----about-banner section End------ */}



  {/* product box  */}
  <div className="product pt-5 pb-5">
    <div className="container">
      <h2 className="text-center mb-4 fw-bold" style={{color: "var(--button-color)"}}>Here are a few deals</h2>
      <div className=" product-content">
          <Product /> 
      </div>

      <div className='text-center mt-4 pt-3'>
         <Link to="/lands" className='btn btn-success' style={{background: "var(--button-color)"}}>All Deals</Link>
      </div>
    </div>
    {/* <div class="text-center mt-4">
      <a href="product.html" class="btn btn-success">View More</a>
    </div> */}
  </div>
  {/* product box  end  */}



</>

  )
}

export default Home
