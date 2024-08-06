
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider, BrowserRouter , Routes , Route
} from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import "./assets/css/style.css";
import Home from "./layouts/pages/Home";
import About from "./layouts/pages/About";
import AllLands from "./layouts/pages/AllLands";
import Contact from "./layouts/pages/Contact";
import Product from './layouts/pages/Product';
import SinglePage from './layouts/pages/SinglePage';




function App() {


  return (
    <>
      <main className='wrapper'>
        <BrowserRouter>
          <Header/>

          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/lands' element={<AllLands/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/Request' element={<Contact/>} />
            <Route path="/product" element={<Product />} />
            <Route path="/SinglePage/:id" element={<SinglePage />} />  


          </Routes>

          <Footer />

        </BrowserRouter>
        
      </main>

    </>
  )
}

export default App
