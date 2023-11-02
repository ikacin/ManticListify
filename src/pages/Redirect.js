import React, { useContext, useEffect } from 'react';
import { MyContext } from 'src/pages/Contenxt.api';
import { useNavigate } from 'react-router-dom';
function SomeComponent() {
    const { state } = useContext(MyContext);
    const navigate = useNavigate();

    useEffect(() => {
        debugger
        if (!state.authorization) {
                navigate("/login")
        }
    }, [state.authorization, navigate]);



    return (
      <></>
    );
}

export default SomeComponent;
