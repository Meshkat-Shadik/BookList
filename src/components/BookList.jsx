import React, { useContext } from "react";
import { BookContext } from "../contexts/BookContext";
import { ListGroup } from "react-bootstrap";
import BookDetails from "../components/BookDetails";

const BookList = () => {
  const { books } = useContext(BookContext);

  return books.length ? (
    <div>
      <ListGroup>
      <ListGroup.Item className="bg-warning rounded-0 text-center">Currently you have {books.length} books for reading!!</ListGroup.Item>
        {books.map((book) => {
          //   <ListGroup.Item key={book.id}>{book.title}</ListGroup.Item>
          return <BookDetails book={book} key={book.id} />;
        })}
      </ListGroup>
    </div>
  ) : (
    <ListGroup.Item className="bg-warning rounded-0 text-center">Currently you have {books.length} books for reading!!</ListGroup.Item>
  );
};

export default BookList;
