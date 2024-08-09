import React, { useState, useEffect } from 'react';
import abadImage from '../../assets/image/abadimage.jpg';
import Product from './Product';
import { Link } from "react-router-dom";

const Home = () => {
  const bannerImage = {
    background: `url(${abadImage})`,
  };

  const [formLocation, setFormLocation] = useState([]);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const [formType] = useState([
    { id: 1, name: "Home" },
    { id: 2, name: "Commercial Rent" },
    { id: 3, name: "Home" },
    { id: 4, name: "Commercial Rent" },
    { id: 5, name: "Home" },
    { id: 6, name: "Commercial Rent" },
  ]);

  useEffect(() => {
    // Fetch locations for the filter dropdown
    fetch('http://localhost/land/admin/search_api.php')
      .then(res => res.json())
      .then(data => setFormLocation(data))
      .catch(error => console.error('Fetch error:', error));

    // Fetch all data for the product listing
    fetch('http://localhost/land/admin/api.php')
      .then(response => response.json())
      .then(data => {
        const reversedData = data.reverse();
        setAllData(reversedData);
        setFilteredData(data); // Initialize filtered data with all data
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'filterLocation') {
      setSelectedLocation(value);
    } else if (name === 'filterType') {
      setSelectedType(value);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Filter data based on selected location and type
    const filtered = allData.filter(item => {
      return (
        (selectedLocation ? item.state === selectedLocation : true) &&
        (selectedType ? item.type === selectedType : true)
      );
    });

    setFilteredData(filtered); // Update the filtered data
  };

  return (
    <>
      <div className="about-banner" style={bannerImage}>
        <div className="container">
          <div className="about-hero">
            <h1>Search Your Dream Land</h1>
            <form onSubmit={handleSearch} className="product-search">
              <div className="moonray-form">
                <select name="filterLocation" onChange={handleFilterChange} value={selectedLocation}>
                  <option value="">Location</option>
                  {filteredData.map(item => (
                    <option key={item.id} value={item.state}>{item.state}</option>
                  ))}
                </select>
              </div>

              <div className="moonray-form product-search-input">
                <select name="filterType" onChange={handleFilterChange} value={selectedType} style={{ width: 300 }}>
                  <option value="">Select Type</option>
                  {formType.map(item => (
                    <option value={item.name} key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-success" style={{ background: "var(--button-color)" }}>
                Find
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="product pt-5 pb-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "var(--button-color)" }}>Here are a few deals</h2>
          <div className="product-content">
            <Product data={filteredData} />
          </div>

          <div className='text-center mt-4 pt-3'>
            <Link to="/lands" className='btn btn-success' style={{ background: "var(--button-color)" }}>All Deals</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
