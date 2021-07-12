import { GET_ITEMS,ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';


const initialState = {
    items: [],
    loading: false    //b
}

export default function itemReducer(state = initialState, action){
    switch (action.type) {
        case GET_ITEMS:
            return{
                ...state,
                items: action.payload, // b fetch
                loading: false //b
            }  
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter(item => item._id!==action.payload) //just add _id in place of id bcoz mongo prefer _id
            }  
        case ADD_ITEM:
            return{
                ...state,
                items: [action.payload, ...state.items]
            } 
        case ITEMS_LOADING://b
            return{
                ...state,
                loading: true
            }
        default:
            return state; 
    }
}