import axios from 'axios'; //b fetch
import { GET_ITEMS,ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems =  ()=> dispatch/*b fetch added dispatch=> */ =>{
    /*return {
        type: GET_ITEMS
    }*/
    dispatch(setItemsLoading());//b fetch
    axios////////////////////MOST IMPORTANT
        .get('/api/items') ////b fetch
        .then(res => dispatch(
            {
                type: GET_ITEMS,
                payload: res.data
            }
        ))
}
export const deleteItem = id =>dispatch => /*dispatch=>*/{
    /*return {
        type: DELETE_ITEM,
        payload: id
    }*/
    axios
        .delete(`/api/items/${id}`).then(res=>dispatch=>({
            type: DELETE_ITEM,
            payload: id
        }))
}
export const addItem = item =>dispatch=>/*added dispatch=>*/{
    axios
        .post('/api/items', item)
        .then(res=> dispatch=>({
            type: ADD_ITEM,
            payload: res.data
        }))
}
export const setItemsLoading = () =>{//b
    return {
        type: ITEMS_LOADING //b
    }
}