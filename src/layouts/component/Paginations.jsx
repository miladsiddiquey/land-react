import React, { useEffect, useState } from 'react'


export default function Paginations({showParPage, onPageinationChange, total}) {

  const [counter, setCounter] = useState(1);
  const [numberOfBtn, setNumberOfBtn] =  useState(Math.ceil(total/showParPage));

  useEffect(()=>{
    const value = showParPage * counter;
    onPageinationChange(value - showParPage, value);
  },[counter]);

  const onButtonClick = (type)=>{
    if(type === "prev"){
      if(counter === 1){
        setCounter(1);
      }else{
        setCounter(counter - 1);
      }
    }else if(type === "next"){
      if(numberOfBtn === counter){
        setCounter(counter);
      }else{
        setCounter(counter + 1);
      }
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link"  onClick={()=>onButtonClick("prev")} >Previous</a></li>
          {
            new Array(numberOfBtn).fill("").map((el, index)=>(
              <li style={{ background:'none', content: 'none' }} className={`page-item ${index+1 === counter ? "active" : null}`}>
                <a  className="page-link" onClick={()=> setCounter(index+1)}>
                  {index + 1}
                </a>
              </li>
            ))
          }
          
          <li className="page-item"><a className="page-link"  onClick={()=>onButtonClick("next")} >Next</a></li>
        </ul>
      </nav>
      </div>
    </div>
  )
}
