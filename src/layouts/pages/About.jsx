import React from 'react'
import abadImage from '../../assets/image/abadimage.jpg';
import land1 from '../../assets/image/imageland.jpg';


const About = () => {

  const bannerImage = {
    background: `url(${abadImage}) ` ,
     
  };


  return (
    <>
    {/* -----about-banner section start---- */}
    <div className="about-banner"  style={ bannerImage }>
      <div className="container">
        <div className="about-hero">
          <h1>About Us</h1>
        </div>
      </div>
    </div>
    {/* -----about-banner section End------ */}
    {/* -----about section start-------- */}
    <div className="about-sec">
      <div className="container">
        <div className="row">
          <div className="about-left col-md-6">
            <h1 style={{color: "var(--button-color)"}}>About Us</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
              corporis perferendis, deserunt voluptatum temporibus doloribus
              rerum. Quasi aliquam veritatis obcaecati nisi enim? Eos quae iste
              accusantium dignissimos cumque possimus facilis sed voluptas cum
              dolores repellendus error impedit, maiores nam aut!
            </p>
          </div>
          <div className="about-right col-md-6">
            <img src={land1} alt="" />
          </div>
        </div>
      </div>
    </div>
    {/* -----about section End---------- */}
    {/* -----sale section start-------- */}
    <div className="about-sec sale-sec pt-0">
      <div className="container">
        <div className="row">
          <div className="about-right sale-sec col-md-6">
            <img src={land1} alt="" />
          </div>
          <div className="about-left col-md-6">
            <h1 style={{color: "var(--button-color)"}}>For Sale</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
              corporis perferendis, deserunt voluptatum temporibus doloribus
              rerum. Quasi aliquam veritatis obcaecati nisi enim? Eos quae iste
              accusantium dignissimos cumque possimus facilis sed voluptas cum
              dolores repellendus error impedit, maiores nam aut!
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* -----sale section End---------- */}
  </>
  
  )
}

export default About
