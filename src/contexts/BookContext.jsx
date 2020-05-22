import React,{createContext,useState,useReducer,useEffect} from 'react'
import { BookReducer } from '../reducers/bookReducer';
// import shortid from 'shortid';

export const BookContext = createContext();

const BookContextProvider = (props)=> {
    // const [books,setBooks] = useState([
    //     {title:'হাজার বছর ধরে',author:'জহির রায়হান',id:1},
    //     {title:'বরফ গলা নদী',author:'জহির রায়হান',id:2},
    //     {title:'শঙ্খনীল কারাগার',author:'হুমায়ুন আহমেদ',id:3},
    //     {title:'সেই সময়',author:'সুনীল গঙ্গোপাধ্যায়',id:4},
    //     {title:'পুতুল নাচের ইতিকথা',author:'মানিক বন্দোপাধ্যায়',id:5},
    // ]);

    
    // const addNewBook = (title,author) =>
    // {
    //     setBooks([{title,author,id:shortid.generate()},...books])
    // }

    // const RemoveBook = (id) =>
    // {
    //     setBooks(books.filter(book=> book.id !== id));
    // }

    const [books,dispatch] = useReducer(BookReducer,[], ()=>{
        const localData = localStorage.getItem('books');
       return localData ? JSON.parse(localData):[]
    });

    useEffect(()=>{
        localStorage.setItem('books',JSON.stringify(books))
    },[books])

    return (
        <div>
            {/* <BookContext.Provider value={{books,addNewBook,RemoveBook}}> */}
            <BookContext.Provider value={{books,dispatch}}>         {/**we have to update those file where we use addNewBook and RemoveBook as a destructured item */}
                {props.children}
            </BookContext.Provider>
        </div>
    )
}

export default BookContextProvider;
