import React,{useState,useContext} from "react";
import {Form,Button} from 'react-bootstrap';
import {BookContext} from '../contexts/BookContext'

const CreateBook = ({addSong}) => {

    // const{addNewBook} = useContext(BookContext)  (before using reducer)
    const {dispatch} = useContext(BookContext)

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const handleSubmit = (e) =>
    {
        e.preventDefault();
     //   addNewBook(title,author);       (before using reducer)
        dispatch({type:'ADD_BOOK',book:{title,author}})      
        setTitle(''); 
        setAuthor('');
    }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" placeholder="Enter New Book Name" value={title} required onChange={(e)=>{setTitle(e.target.value)}} />
          <Form.Label>Author Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Author's Name" value={author} required onChange={(e)=>{setAuthor(e.target.value)}} />
        </Form.Group>


        <Button variant="primary" type="submit" className="form-control">
          Add
        </Button>
      </Form>
    </div>
  );
};
export default CreateBook;