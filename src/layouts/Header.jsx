import React , {useState} from 'react'
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";



const Header = () => {


    const navData = [
        {id: 1 , name: "Home" , url: "/" },
        {id: 2 , name: "Lands" , url: "/lands" },
        {id: 3 , name: "About" , url: "/about" },
        {id: 4 , name: "Request" , url: "/Request" },


    ]

    const [menu , setMenu ] = useState(false);



  return (
    <header className='pt-0'>
        <div className="container">
            <div className="navbar">
                <h1 className="logo"><Link to="/"><img src="https://varanibo.com/assets/img/uploaded/202310051041logo%201.png" alt="logo" /></Link></h1>
                <ul className={`nav gap-4  ${ menu ? "active" : ""}`} >
                    {navData.map(e => {
                        return  <li key={e.id}><Link to={e.url}>{e.name}</Link></li>
                    })}
                </ul>
                    { menu ?  <IoClose id='menu-bar' onClick={() =>  setMenu(false)}/> :  <IoMenu id='menu-bar' onClick={() =>  setMenu(true)}/> }
            </div>
        </div>
    </header>
  )
}

export default Header 
