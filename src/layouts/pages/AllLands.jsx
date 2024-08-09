// AllLands.js
import React from 'react';
import Product from './Product';

const AllLands = () => {
  return (
    <>
      <div className="product pt-3 pb-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "var(--button-color)" }}>Our All Deals</h2>
          <div className="product-content">
            <Product /> {/* This component fetches its own data */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllLands;
