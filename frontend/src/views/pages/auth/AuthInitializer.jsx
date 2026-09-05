import React from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../../../store/slices/authSllice';
import { useEffect } from 'react';

const AuthInitializer = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth())
    }, []);
    
    return children;
}

export default AuthInitializer