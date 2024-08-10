import React, { useEffect, useState } from 'react';
import abadImage from '../../assets/image/abadimage.jpg';
import land1 from '../../assets/image/imageland.jpg';

const About = () => {

  const bannerImage = {
    background: `url(${abadImage})`,
  };

  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/land/admin/about_api.php')
      .then(response => response.json())
      .then(data => {
        setAboutData(data);
      });
  }, []);

  return (
    <>
      {/* -----about-banner section start---- */}
      <div className="about-banner" style={bannerImage}>
        <div className="container">
          <div className="about-hero">
            <h1>About Us</h1>
          </div>
        </div>
      </div>
      {/* -----about-banner section End------ */}
      {/* -----about section start-------- */}
      {
        aboutData.map((about, index) => {
          const isEven = index % 2 === 0;
          const imageSrc = about.images ? `http://localhost/land/admin/upload_images/${about.images}` : 'http://localhost/land/admin/upload_images/default.jpg';
          return (
            <div key={index} className={`about-sec ${isEven ? 'even' : 'odd'}`}>
              <div className="container">
                <div className="row">
                  <div className={`about-left col-md-6 ${isEven ? 'order-1' : 'order-2'}`}>
                   <div>
                   <h1 style={{ color: "var(--button-color)" }}>{about.title}</h1>
                   <p>{about.description}</p>
                   </div>
                  </div>
                  <div className={`about-right col-md-6 ${isEven ? 'order-2' : 'order-1'}`}>
                    <img src={imageSrc} alt="" />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    </>
  );
};

export default About;
