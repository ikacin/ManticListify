import React, { useContext, useEffect } from 'react';
import { MyContext } from './Contenxt.api';
import { useNavigate } from 'react-router-dom';

function Redirect() {
    const { state, dispatch } = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        const storedAuthorization = localStorage.getItem('authorization');
        if (storedAuthorization) {
            dispatch({ type: 'SET_AUTHORIZATION', payload: { authorization: storedAuthorization } });
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        localStorage.setItem('authorization', state.authorization);
    }, [state.authorization]);

    return (
        <>asa</>
    );
}

export default Redirect;
