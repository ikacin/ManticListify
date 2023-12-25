import React, { useState ,useEffect,useContext} from 'react';
import { Input,PasswordInput} from '@mantine/core';
import Box from "../atoms/box";
import { Flex, Button } from '@mantine/core';
import styled from 'styled-components'
import {Space } from '@mantine/core';
import { Title } from '@mantine/core';
import { showNotification,updateNotification } from '@mantine/notifications';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { IconCheck } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import {MyContext} from "./Contenxt.api";
const Login = (props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const[once,setOnce] = useState(true);
    const navigate = useNavigate();
    const { state, dispatch } = useContext(MyContext);

    const gotoHome = () => {
        navigate("/")
    }

    const handleSubmit  =  () => {

        if (name !== "" && password !==  "") {
            if (once){
                setOnce(false)
                dispatch({type: "SET_AUTHORIZATION", payload: {
                        authorization: {user: name, isLogin: true},

                    }})
                axios.post('https://jsonplaceholder.typicode.com/posts', {
                    body: {
                        title: name,
                        body: password,
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


                setTimeout(() => gotoHome("/"), 3000);
                window.localStorage.setItem("name",name);
                window.localStorage.setItem("password",password);
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




    return(
        <>


          <Card>
            <Flex
                mih={1000}
                bg="rgba(0, 0, 0, .3)"
                gap="md"
                justify="center"
                align="center"
                wrap="wrap"

            >
                <Box>
                    <Title align={"center"} order={2}>Sıgn In</Title>
                    <Space h="lg" />

                    <div>
                            <Input.Wrapper
                                name="name"
                                id="input-demo"
                                withAsterisk
                                label="UserName"
                                description="Please enter your credit card information, we need some money"
                                error={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                                <Input id="input-demo" placeholder="UserName" />
                            </Input.Wrapper>
                                <Space h="lg" />
                            <Input.Wrapper >
                            <PasswordInput
                                name="password"
                                placeholder="Password"
                                label="Password"
                                description="Password must include at least one letter, number and special character"
                                withAsterisk
                                error={false}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                           </Input.Wrapper>
                                <Space h="lg" />
                            <div>
                                <Button type="button" fullWidth={true} onClick={() =>
                                    handleSubmit()
                                }
                                >Login</Button>
                            </div>
                    </div>
                </Box>
            </Flex>
          </Card>
        </>    )

}


const Card = styled.div`
  .mantine-1scm9rv{
    width: 500px;
  }

  .mantine-mvpwk9 {
    background: rgb(0 0 0 / 6%);
  }
`
export default Login