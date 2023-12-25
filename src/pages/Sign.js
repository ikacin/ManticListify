import React, { useState ,useEffect,useContext} from 'react';
import {  TextInput, Button } from '@mantine/core';
import Box from "../atoms/box";
import styled from 'styled-components'
import { showNotification,updateNotification } from '@mantine/notifications';
import axios from 'axios'
import { IconCheck } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import {MyContext} from "./Contenxt.api";
function Demo() {
    const[name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const[email,setEmail] = useState("")
    const [once,setOnce] = useState(true)
    const navigate = useNavigate();
    const { state, dispatch } = useContext(MyContext);

    const gotoHome = () => {
        navigate("/")
    }

    const handleSubmit  =  (e) => {
        e.preventDefault()

        if (name !== "" && surname !==  "" && email ? email : "") {
            if (once){
                setOnce(false)
                dispatch({type: "SET_AUTHORIZATION", payload: {
                        authorization: {user: name,email:email, isLogin: true},

                    }})
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    body: {
                        title: name,
                        body: surname,
                        userId: 1,
                    },
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then(function (response) {
                        showNotification({
                            id: 'load-data',
                            autoClose: false,
                            disallowClose: true,
                            loading: true,
                            title:"Please Wait",
                        })
                        setTimeout(() => {
                            updateNotification({
                                id: 'load-data',
                                color: 'teal',
                                title:"Success",
                                message:"Bildirim 2 saniye içinde kapanacak, bu bildirimi şimdi kapatabilirsiniz",
                                icon: <IconCheck size="1rem" />,
                                autoClose: 1000,
                            });
                        }, 1000);

                        setTimeout(() => gotoHome("/"), 3000);
                    })
                    .catch(function (error) {
                        showNotification({
                            id: 'hello-there',
                            disallowClose: false,
                            autoClose: 5000,
                            title:"Success",
                            message:"Bildirim 2 saniye içinde kapanacak, bu bildirimi şimdi kapatabilirsiniz",
                            color: 'white',
                            icon: <IconX size="1rem" />,
                            className: 'my-notification-class',
                            style: { backgroundColor: 'red' },
                            sx: { backgroundColor: 'red' },
                            loading: false,
                        });
                    });


            }
        } else {
            console.log('input value is empty');

            showNotification({
                id: 'hello-there',
                disallowClose: false,
                autoClose: 5000,
                title: 'your transaction failed!',
                message:"Bildirim 2 saniye içinde kapanacak, bu bildirimi şimdi kapatabilirsiniz",
                color: 'red',
                icon: <IconX size="1rem" />,
                className: 'my-notification-class',
                style: { backgroundColor: 'white' },
                sx: { backgroundColor: 'white' },
                loading: false,
            });
        }
    }


    return (

        <Box >
            <WrapForm>
                <Title>Sing Up</Title>
                <form onSubmit={ (e) => handleSubmit(e)}>
                    <TextInput  mt="sm"
                                label="Name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                    <TextInput  mt="sm"
                                label="Surname"
                                placeholder="Surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}/>
                    <TextInput mt="sm"
                               label="Email"
                               placeholder="Email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    <Button  mt="md"
                             type="submit">
                        Submit
                    </Button>
                </form>
            </WrapForm>

        </Box>
    );
}


const WrapForm = styled.div`
  
   form{
      width:500px;
    }
`

const Title = styled.div`
  font-size: 18px;
  font-family: Arial;
`



export default Demo