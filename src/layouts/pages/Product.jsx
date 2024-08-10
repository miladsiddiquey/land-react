import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS if not already done
import Paginations from '../component/Paginations';

const Product = ({ data: propData }) => {
  const [productData, setProductData] = useState(propData || []);
  const [loading, setLoading] = useState(!propData);
  const [error, setError] = useState(null);
  const [showParPage] = useState(3);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showParPage,
  });

  const onPageinationChange = (start, end) => {
    setPagination({ start, end });
  };

  useEffect(() => {
    if (!propData) {
      // Fetch data if not provided via props
      fetch('http://localhost/land/admin/api.php')
        .then(response => response.json())
        .then(data => {
          const reversedData = data.reverse(); // Ensure latest products are first
          setProductData(reversedData);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    } else {
      setProductData(propData); // Use the provided data
      setLoading(false);
    }
  }, [propData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        {productData.length > 0 ? (
          productData.slice(pagination.start, pagination.end).map((product, index) => {
            const imageSrc = product.images ? 
              `http://localhost/land/admin/upload_images/${product.images}` : 
              'http://localhost/land/admin/upload_images/default.jpg';
            return (
              <div key={index} className="col-sm-12 col-md-6 col-lg-4 mt-5 mb-5 ">
                <div className="product-box border p-3">
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

      {productData.length > showParPage && (
        <Paginations
          showParPage={showParPage}
          onPageinationChange={onPageinationChange}
          total={productData.length}
        />
      )}
    </div>
  );
};
export default Product;
