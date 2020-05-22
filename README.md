************************************************************************************************
####                                        REDUCERS
************************************************************************************************

Centralizes of all our methods.
In this project,
Book Context has two function,

    1.addBook
    2.RemoveBook

Now, in the future if we make a bigger app or extend this app then it might be that we have four or five functions that interact with the state and do different things and then we have to pass each one of those functions into <provider value={{}}> property, and then when we consume this context we have to get all of those functions separately in our components.

Instead we can do, put together all of our functions into one single reducer function.

Reducers can be broken down into 3 different parts.

    1. Reducer Function -> contains all of our state manipulation logic, it interacts with the state/data.

    2. Action object -> Describes the type of change that we want to make inside this reducer function

    3. dispatch function -> which sends the action to the reducer

Suppose, we want to add a new book when a button is clicked. First of all , we create an 'ACTION' object and that describes the type of change that we want to make and we can also pass in a payload here too which is a second argument. This second argument/payload is the actual new book that we wanted to insert.

        {type:'ADD_BOOK',book:{title,author,id}}

The next step is, dispatching.
Dispatch function sends the previous action to the reducer

        dispatch({type:'ADD_BOOK',book:{title,author,id}})

Now, the reducer takes in the action as a parameter, it also takes in the state of whatever data we're manipulating (books state).

        reducer(state,action)

When, the reducer runs, it looks at the action and

        - check the action.type
        - update the state object
        - return the state

Example for add book, when the reducer runs, first it looks for the action type, is it for add or delete? if add then, update the state and then return the current state.

Example for deleteBook, when the reducer runs, first it looks for the action type, is it for add or delete? if delete the, delete and update the state via the id, the id is coming from the payload, and then return the state.

When, state returned then, the state goes back into the provider value. So, when we provide it two different components in the future and they consume it and when it updates over here they're going to get that updated value and re-render appropriately.

So, the use of reducer of this project is shown below,

I have created a new Folder *reducers inside it, I have created a file name *bookReducer.jsx.
Basically, this file works with BookContext.jsx.
Previously, BookContext.jsx had two functions

1. addNewBook(title,author)
2. RemoveBook(id)

For reducing complexity I have created a reducer which put together the function in one function, as a result by using \*useReducer() hook we can easily access the functions.

Previously the BookContext.jsx was,

    export const BookContext = createContext();

    const BookContextProvider = (props)=> {
    const [books,setBooks] = useState([
         {title:'হাজার বছর ধরে',author:'জহির রায়হান',id:1},
         {title:'বরফ গলা নদী',author:'জহির রায়হান',id:2},
         {title:'শঙ্খনীল কারাগার',author:'হুমায়ুন আহমেদ',id:3},
         {title:'সেই সময়',author:'সুনীল গঙ্গোপাধ্যায়',id:4},
         {title:'পুতুল নাচের ইতিকথা',author:'মানিক বন্দোপাধ্যায়',id:5},
    ]);


     const addNewBook = (title,author) =>
     {
         setBooks([{title,author,id:shortid.generate()},...books])
     }

     const RemoveBook = (id) =>
     {
         setBooks(books.filter(book=> book.id !== id));
     }


    return (
        <div>
            <BookContext.Provider value={{books,addNewBook,RemoveBook}}>
                {props.children}
            </BookContext.Provider>
        </div>
    )
    }

Here, I passed the function via the value    

Then, access those functions from different files, I access the *addNewBook in *BookForm.jsx and *RemoveBook in BookDetails.jsx

Previously, the BookForm.jsx was

       const{addNewBook} = useContext(BookContext) 
       const handleSubmit = (e) =>
        {
            e.preventDefault();
            addNewBook(title,author);
        }
        

and, the BookDetails.jsx was

        const { RemoveBook } = useContext(BookContext);
        <Button variant="outline-danger" onClick={()=>RemoveBook(book.id)} id='btn'>Complete</Button>


After using Reducer,

BookContext.jsx is, 

    export const BookContext = createContext();
    const BookContextProvider = (props)=> {
    const [books,dispatch] = useReducer(BookReducer,[]);
    return (
        <div>
            <BookContext.Provider value={{books,dispatch}}>
                {props.children}
            </BookContext.Provider>
        </div>
        )
    }

The functionality of addNewBook and RemoveBook is now put together on the bookReducer.jsx file. Here instead of those two function I use dispatch. In the top of this article, I wrote about the dispatch function and also about reducer function. 

Here I use *useReducer hook for reducer function. This reducer function contains two things.

1. BookReducer (whole reducer)
2. [] (initial as empty value)

then, books is the state of books, and dispatch is the function for action.

Now, the BookForm.jsx is look like this,

     const {dispatch} = useContext(BookContext)
     const handleSubmit = (e) =>
    {
        e.preventDefault();
        dispatch({type:'ADD_BOOK',book:{title,author}})      
    }

and the BookDetails.jsx is look like this,

          const {dispatch} = useContext(BookContext);
           <Button variant="outline-danger" onClick={()=>dispatch({type:'REMOVE_BOOK',id:book.id})} id='btn'>Complete</Button>

But where is the core activity? The core activity occurs in the *bookReducer.jsx file.           

        export const BookReducer = (state,action) =>
        {
            switch(action.type)
            {
                case 'ADD_BOOK':
                    return [...state,{
                        title:action.book.title,
                        author:action.book.author,
                        id: shortid.generate()
                    }]    
                case 'REMOVE_BOOK':
                    return state.filter(book=> book.id !== action.id)  
                default:
                    return state    
            }
        }

Previously, the two functions are working in BookContext.jsx. As I previously said, reducer put together all functions in a component, and by action.type we can easily run a function.        





************************************************************************************************
####                                   LOCAL STORAGE
************************************************************************************************


By writing localStorage, we can access the localStorage API. Basically it stores data in JSON format(all string object). 

    localStorage.setItem('name':'shadik');      (key:value pair)
    localStorage.getItem('name')                ( retrive via key)


**Assigning object to a key

    const book={title:'Blah',author:'blah'}     //book object
    localStorage.setItem('myBook',JSON.stringify(book))
    localStorage.getItem('myBook');              //but it is in json format

But we need to object format, so we need to parse it.

    localStorage.getItem(JSON.parse('myBook'));

By using lifeCycleMethod we can insert to the localStorage. In hook, we can easily use useEffect function.    

We can use a third argument in the useReducer() function, which it takes as a default(initial) value.