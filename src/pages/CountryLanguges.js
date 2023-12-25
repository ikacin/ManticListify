import React, { useState, useEffect,useContext } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import Drawers from "../atoms/Drawers";
import { Input, Tooltip,Space,Button,Title,Radio,Group,Textarea,Select,    } from '@mantine/core';
import { IconBrandTwitter, IconAlertCircle } from '@tabler/icons-react';
import NavbarSimple from "../atoms/Navbar";
import styled from 'styled-components'
import AccordionType from "../atoms/Accordion";
import { showNotification,updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import {MyContext} from "./Contenxt.api";

const CountryLanguges = ({...props}) => {
    const { t, i18n } = useTranslation();
    const [commentsData, setCommentsData] = useState([]);
    const [dataList, setDataList] = useState([]);
    const[openedX,setOpenedX] = useState(false)
    const [twitterHandle, setTwitterHandle] = useState('');
    const [email, setEmail] = useState('');
    const [loading,setLoading] = useState(false)
    const [value, setValue] = useState('react');
    const[radioType,setRadioType] = useState('react')
    const[type,setType] = useState('react')
    const[textValue,setTextValue] = useState('')
    const[selectValue,setSelectValue] = useState('')
    const[selectData,setSelectData] = useState('')
    const[selectLibrary,setSelectLibrary] = useState('')
    const {common} = useParams();
    const [showError, setShowError] = useState(false);
    const { state, dispatch } = useContext(MyContext);
    useEffect(() => {
        const url = `https://restcountries.com/v3.1/name/${common}`;
        axios.get(url)
            .then(function (response) {
                setCommentsData(response.data);

                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        const url = `https://jsonplaceholder.typicode.com/comments`;
        axios.get(url)

            .then(function (response) {
                setDataList(response.data);

                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);



    const handleInputChange = (event) => {
        setTwitterHandle(event.target.value);
    };

    const handleInputEmail = (event) => {
        const value = event.target.value;
        if (value === value){
            setShowError(false)
        }else{
            setShowError(true)
        }
        setEmail(event.target.value)

    }

    const handleRadio = (event) => {
        setType(event)
        setRadioType(event)
    }

    const handleSubmit = () => {
        setLoading(true);
        if (twitterHandle){
            console.log('Twitter Handle:', twitterHandle);
            console.log('email',email);
            console.log('radio',radioType)
            console.log('TextArea',textValue)
            console.log('sanalDom',selectValue)
            console.log('test',selectLibrary)
            console.log('componentDidMount',selectData)
            setTimeout(() => {
                setLoading(false);
            }, 2000);

            showNotification({
                id: 'load-data',
                autoClose: false,
                disallowClose: true,
                loading: true,
                title:t("Please Wait"),
            })
            setTimeout(() => {
                updateNotification({
                    id: 'load-data',
                    color: 'teal',
                    title:t("Success"),
                    message: t('Notification_close'),
                    icon: <IconCheck size="1rem" />,
                    autoClose: 1000,
                });
            }, 1000);
        }else{
            showNotification({
                id: 'hello-there',
                disallowClose: false,
                autoClose: 5000,
                title:t("Unsuccessful"),
                message: t('Notification_close'),
                color: 'white',
                icon: <IconX size="1rem" />,
                className: 'my-notification-class',
                loading: false,
            });
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }

    };

    const handleCancel = () => {
        setOpenedX(false)
    }

    useEffect(() => {

        fetch('/api/data') // Backend rotasına istek gönderme
            .then((response) => response.json()) // JSON yanıtını çözme
            .then((data) => {
                console.log(data); // API'den gelen verileri kullanma
            })
            .catch((error) => {
                console.error('API isteği sırasında hata oluştu:', error);
            });

    })




    return (
        <ContentWrap>
            <NavbarSimple/>
            <DrawersWrap>
                <Drawers setOpenedX={setOpenedX} openedX={openedX} DrawerBtn={"Filter"} title={ <Title order={3}>Filter</Title>} >
                        <Radio.Group
                            name="favoriteFramework"
                            label="Select your favorite framework/library"
                            withAsterisk
                            value={radioType}
                            onChange={(event) => handleRadio(event)}
                        >
                            <Group mt="xs">
                                {/*{localStorage.getItem(name) ?  <Radio value="react" label="React" /> : ""}*/}
                                {/*{state.authorization.user === "ikacin" ?  <Radio value="react" label="React" /> : ""}*/}

                                <Radio  value="svelte" label="Svelte" />
                                <Radio value="Angular" label="Angular" />
                                <Radio value="vue" label="Vue" />
                            </Group>
                        </Radio.Group>

                    <Space h="xl" />



                    {
                        type === "react" ?
                      <>

                          <Space h="xl" />
                               <Textarea
                                   label="React'ta testing (test yazma) nasıl yapılır?"
                                   value={textValue}
                                   onChange={(event) => setTextValue(event.currentTarget.value)}
                               />



                          <Space h="xl" />
                              <Select
                                  label="React'in sanal DOM'u neden kullanılır?"
                                  placeholder="Pick one"
                                  value={selectValue}
                                  onChange={setSelectValue}
                                  data={[
                                      { value: 'Gerçek DOM simüle etmek için', label: 'Gerçek DOM simüle etmek için' },
                                      { value: 'Performansı artırmak için', label: 'Performansı artırmak için' },
                                      { value: 'Sadece estetik nedenlerle', label: 'Sadece estetik nedenlerle' },
                                      { value: 'İşlevselliği artırmak için', label: 'İşlevselliği artırmak için' },
                                  ]}
                              />

                       <Space h="xl" />
                          <Select
                              label="React'ta testing (test yazma) hangi kütüphane ile yapılır?"
                              placeholder="Pick one"
                              value={selectLibrary}
                              onChange={setSelectLibrary}
                              data={[
                                  { value: 'Jest', label: 'Jest' },
                                  { value: 'Chai', label: 'Chai' },
                                  { value: 'Mocha', label: 'Mocha' },
                                  { value: 'Enzyme', label: 'Enzyme' },
                              ]}
                          />

                          <Space h="xl" />
                          <Select
                              label="Bir React bileşeninde 'componentDidMount' yöntemi ne zaman çağrılır?"
                              placeholder="Pick one"
                              value={selectData}
                              onChange={setSelectData}
                              data={[
                                  { value: 'Bileşen oluşturulduğunda', label: 'Bileşen oluşturulduğunda' },
                                  { value: 'Bileşen güncellendiğinde', label: 'Bileşen güncellendiğinde' },
                                  { value: 'Bileşen kaldırıldığında', label: 'Bileşen kaldırıldığında' },
                                  { value: 'Bileşen yeniden boyutlandırıldığında', label: 'Bileşen yeniden boyutlandırıldığında' },
                              ]}
                          />
                      </>
                            :
                            ""

                    }
                    {
                        type === "svelte" ?
                            <>

                                <Space h="xl" />

                                <Select
                                    label="React'in sanal DOM'u neden kullanılır?"
                                    placeholder="Pick one"
                                    value={selectValue}
                                    onChange={setSelectValue}
                                    data={[
                                        { value: 'Gerçek DOM simüle etmek için', label: 'Gerçek DOM simüle etmek için' },
                                        { value: 'Performansı artırmak için', label: 'Performansı artırmak için' },
                                        { value: 'Sadece estetik nedenlerle', label: 'Sadece estetik nedenlerle' },
                                        { value: 'İşlevselliği artırmak için', label: 'İşlevselliği artırmak için' },
                                    ]}
                                />

                                <Space h="xl" />
                                <Select
                                    label="React'ta testing (test yazma) hangi kütüphane ile yapılır?"
                                    placeholder="Pick one"
                                    value={selectLibrary}
                                    onChange={setSelectLibrary}
                                    data={[
                                        { value: 'Jest', label: 'Jest' },
                                        { value: 'Chai', label: 'Chai' },
                                        { value: 'Mocha', label: 'Mocha' },
                                        { value: 'Enzyme', label: 'Enzyme' },
                                    ]}
                                />

                                <Space h="xl" />
                                <Select
                                    label="Bir React bileşeninde 'componentDidMount' yöntemi ne zaman çağrılır?"
                                    placeholder="Pick one"
                                    value={selectData}
                                    onChange={setSelectData}
                                    data={[
                                        { value: 'Bileşen oluşturulduğunda', label: 'Bileşen oluşturulduğunda' },
                                        { value: 'Bileşen güncellendiğinde', label: 'Bileşen güncellendiğinde' },
                                        { value: 'Bileşen kaldırıldığında', label: 'Bileşen kaldırıldığında' },
                                        { value: 'Bileşen yeniden boyutlandırıldığında', label: 'Bileşen yeniden boyutlandırıldığında' },
                                    ]}
                                />
                            </>
                            :
                            ""
                    }


                    <Space h="xl" />


                    {/*<div>{t('welcome')}</div>*/}
                    <Space h="xl" />



                    <Input.Wrapper
                        id="input-demo"
                        withAsterisk
                        label="Credit card information"
                        value={email}
                        onChange={handleInputEmail}
                        error={showError ? 'Your credit card expired' : null}
                    >
                        <Input id="input-demo" placeholder="Your email" />
                    </Input.Wrapper>

                    <Space h="xl" />

                    <BtnWrap>
                        <Button
                            loading={loading}
                            loaderPosition="center"
                            onClick={() => handleSubmit()}
                        >
                            {t("Submit")}
                        </Button>

                        <Button
                            color="red"
                            variant="outline"
                            onClick={() => handleCancel()}>
                            {t("Cancel")}
                        </Button>
                    </BtnWrap>

                </Drawers>
            </DrawersWrap>
            <AccordionType dataType={dataList}  />
        </ContentWrap>
    );
};



const ContentWrap = styled.div`
  margin:60px 30px 0 330px;

  
`

const DrawersWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  margin-top: 30px;

  .mantine-Button-centerLoader{
    top: 10px;
    left: 30px;
  }
`


export default CountryLanguges;

