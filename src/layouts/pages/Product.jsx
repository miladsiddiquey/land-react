
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS if not already done
import Paginations from '../component/Paginations';



const Product = () => {
  const [productData, setProductData] = useState([]); // Default to empty array
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showParPage, setShowParPage] = useState(3);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showParPage,
  });

  const onPageinationChange = (start, end)=>{
    setPagination({start: start, end: end});
  };

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost/land/admin/api.php')
      .then(response => response.json())
      .then(data => {
        setProductData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="row">
        {productData.length > 0 ? (
          productData.slice(pagination.start,pagination.end).map((product, index) => {
            
            // Construct the full URL to the image
            const imageSrc = product.images ? `http://localhost/land/admin/upload_images/${product.images}` : 'http://localhost/land/admin/upload_images/default.jpg';
            
            return (
              <div key={index} className=" col-sm-12 col-md-4  mb-4">
                <div className="product-box border ">
                  <img src={imageSrc} alt={product.title || 'Product Image'} className="img-fluid mb-2" />
                  <div className="product-text">
                    <h3 style={{ fontSize: 'var(--font-20px)' }}>
                      {product.title || 'Default Title'}
                    </h3>
                    <ul className="list-unstyled">
                      
                      <li><b>Status:</b> {product.status || 'Default Status'}</li>
                      <li><b>State:</b> {product.state || 'Default State'}</li>
                      <li><b>Size:</b> {product.size || 'Default Size'}</li>
                      <li><b>Sale Price:</b> {product.sale_price || 'Default Price'}</li>
                    </ul>
                    <Link to={`/SinglePage/${product.id}`} className="btn btn-primary">View Details</Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No products available.</p>
        )}
      </div>
      {/* <Paginations  
      showParPage={showParPage} 
      onPageinationChange={onPageinationChange}
      total ={productData.length}
      /> */}

      {productData.length > 3 && ( // Only render Paginations if there are more than 6 items
        <Paginations  
          showParPage={showParPage} 
          onPageinationChange={onPageinationChange}
          total={productData.length}
        />
      )}


    </div>
  );
}

export default Product;
