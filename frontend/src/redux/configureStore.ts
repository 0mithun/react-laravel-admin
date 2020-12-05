import setUserReducer from "./reducers/setUserReducer";
import {createStore} from 'redux'

const configureStore = ()=>{
    return createStore(setUserReducer);
}


export default configureStore;
