import shortid from 'shortid';

export const BookReducer = (state,action) =>
{
    switch(action.type)
    {
        case 'ADD_BOOK':
            return [{
                title:action.book.title,
                author:action.book.author,
                id: shortid.generate()
            },...state]    
            break;
        case 'REMOVE_BOOK':
            return state.filter(book=> book.id !== action.id)  
            break;
        
        default:
            return state    
    }
}