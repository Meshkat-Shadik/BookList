import React,{useState} from 'react';
import BookContextProvider from './contexts/BookContext';
import MyNav from './components/myNav'
import BookList from './components/BookList'
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import {Button} from 'react-bootstrap'
import shortid from 'shortid'
import CreateBook from './components/BookForm'

const App=()=> {

  const [show, setShow] = useState(false);
  const [age,setAge] = useState(10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <BookContextProvider>
        <MyNav/>
        <BookList/>
        <Button className="my-3 mr-5 form-control" variant="outline-danger" onClick={handleShow}>Add a new Book</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <CreateBook/>
        </Modal.Body>
      </Modal>
      </BookContextProvider>

   
    </div>
  );
}

export default App;
