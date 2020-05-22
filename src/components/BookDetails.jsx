import React, { useContext,useState } from "react";
import { BookContext } from "../contexts/BookContext";
import {Button} from "react-bootstrap"
import './stylee.css'

const BookDetails = ({ book }) => {
  // const { RemoveBook } = useContext(BookContext);  (before using reducer)

  const {dispatch} = useContext(BookContext);



  return (
    <div className="list-group" id='fl'>
      <a
        href="#"
        className="list-group-item list-group-item-action flex-column align-items-start "
      >
        <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1" id='hed'>{book.title}</h5>
        {/* <Button variant="outline-danger" onClick={()=>RemoveBook(book.id)} id='btn'>Complete</Button>     (before using reducer) */}
        <Button variant="outline-danger" onClick={()=>dispatch({type:'REMOVE_BOOK',id:book.id})} id='btn'>Complete</Button>
        </div>
        <p className="mb-1" style={{fontSize:'12px'}} >
         {book.author}
        </p>
      </a>
    
    </div>
  );
};

export default BookDetails;
