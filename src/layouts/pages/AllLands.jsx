import React from 'react'
import Product from './Product'


const AllLands = () => {
  return (
    <>

        <div className="product pt-3 pb-5">
            <div className="container">
            <h2 className="text-center mb-4 fw-bold" style={{color: "var(--button-color)"}}>Our All deals</h2>
            <div className="product-content">
                <Product /> 
            </div>
            </div>
            {/* <div class="text-center mt-4">
            <a href="product.html" class="btn btn-success">View More</a>
            </div> */}
        </div>
    
    
    </>
  )
}

export default AllLands
