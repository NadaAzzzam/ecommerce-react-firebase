import React from 'react';
import authReducer from '../reducers/authReducer';


export const authContext=React.createContext();

const initialState ={
    users:{}
}
export const AuthProvider =(props)=>{
    const [state,dispatch] = React.useReducer(authReducer,initialState);
    const value = {state,dispatch};

    return <authContext.Provider value={value}>
        {props.children}
    </authContext.Provider>
}