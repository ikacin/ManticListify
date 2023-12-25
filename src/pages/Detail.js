import React, { useState ,useEffect,lazy, Suspense} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios'
import { Loader } from '@mantine/core';
import Headers from "./Header";
import { Table } from '@mantine/core';
import Modals from "../atoms/modal";
import styled from 'styled-components'
import { Tabs,Badge } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { Image, Box ,Text, Group,Space } from '@mantine/core';
import { showNotification,updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { Popover,Button } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useToggle } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

const Detail = ({data,galleryContent,messageContent,settingContent} ) => {
    const[list,setList] = useState([]);
    const[imagesList,setImagesList] = useState([]);
    const[loading,setLoading] = useState(true)
    const[openedX,setOpenedX] = useState(false)
    const desiredPath = '/layout/restCountries';
    const currentPath = window.location.pathname;
    const [location,setLocation] = useState(true)
    const[listData,setListData] = useState([])
    const [sortAscending, setSortAscending] = useState(true);
    const {id} = useParams();
    const [opened, setOpened] = useState(true);
    const ref = useClickOutside(() => setOpened(false));
    const [value, toggle] = useToggle(['blue', 'orange', 'cyan', 'teal']);
    const navigate = useNavigate()
    const { t, i18n } = useTranslation();

    const getClick = () => {
        navigate(`/layout/restCountries`);
    }


    const getClicked = (name) => {
        navigate(`/layout/restCountries/${name}`);
    }


    useEffect(() => {
            axios.get(`https://dummyjson.com/products/${id}`)
                .then(function (response) {
                    setList(response.data)
                    setImagesList(response.data.images)
                    setLoading(false)
                })
                .catch(function (error) {

                })
                .finally(() => setLoading(false))
    },[])


    const getLocation = () => {
        if (currentPath === desiredPath){
            setLocation(false)
        }
    }


    useEffect(() => {
        getLocation()
    },[])


    const ths = (
        <tr>
            <th>Brand</th>
            <th>Category</th>
            <th>Description</th>
            <th>Title</th>
            <th>Price</th>
            <th>Images</th>
        </tr>
    );
    const getImages = () => {
        setOpenedX(true)
    }
    const rows = list && imagesList ?
        <tr key={list.id}
            onClick={() => getClick()}
        >
            <td>{list.brand}</td>
            <td>{list.category}</td>
            <td>{list.description}</td>
            <td>{list.title}</td>
            <td>{list.price}</td>
            <td><img onClick={() => getImages()}  src={imagesList[0]} style={{width:"100px"}}/></td>
        </tr>
        :
        ""


    const getMaps = () => {
        showNotification({
            id: 'load-data',
            autoClose: false,
            disallowClose: true,
            loading: true,
            title:t("Please_wait"),
        })
        setTimeout(() => {
            updateNotification({
                id: 'load-data',
                color: 'teal',
                title:t("Success"),
                message:t("Notification_will_close_in_2_seconds_you_can_close_this_notification_now"),
                icon: <IconCheck size="1rem" />,
                autoClose: 1000,
            });
        }, 1000);
    }




    const toggleSortOrder = () => {
        setSortAscending(prevSortOrder => !prevSortOrder);
        if (opened){
            setOpened(false);
        }
    };

    const sortedData = data
        ? [...data].sort((a, b) =>
            sortAscending && a.subregion && b.subregion
                ? sortAscending
                    ? a.subregion.localeCompare(b.subregion)
                    : b.subregion.localeCompare(a.subregion)
                : 0
        )
        : [];


    return(
        <Content>
            <Headers/>
            {

                loading &&
                <div className={"loading-wrap"}>
                    <Loader />
                </div>
            }


            {
                location ?
                    <Table captionSide="bottom">
                        <thead>{ths}</thead>
                        <tbody>{rows}</tbody>
                    </Table>
                :
                    ""
            }




            {
                !location &&  <Tabs defaultValue="settings">
                    <Tabs.List>
                        <Tabs.Tab
                            value="settings"
                            rightSection={
                                <Badge
                                    w={30}
                                    h={30}
                                    sx={{ pointerEvents: 'none' }}
                                    variant="filled"
                                    size="xs"
                                    p={0}
                                >
                                    {

                                     data? <div>{data.length}</div>
                                      :
                                      "0"
                                    }


                                </Badge>
                            }
                            icon={
                                <Popover  width={200} withArrow shadow="md" position={"right-start"} zIndex={99999}>
                                    <Popover.Target>
                                        <IconPhoto size="0.8rem" />
                                    </Popover.Target>

                                    { opened ?
                                    <Popover.Dropdown>
                                        <Text size="sm">
                                            <button
                                                ref={ref}
                                                onClick={() => {
                                                    toggleSortOrder();
                                                }}>
                                                Toggle Sort Order
                                            </button>
                                        </Text>
                                    </Popover.Dropdown>
                                        :
                                        ""
                                }

                                </Popover>
                                }>
                            Settings
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="messages"
                            rightSection={
                                <Badge
                                    w={30}
                                    h={30}
                                    sx={{ pointerEvents: 'none' }}
                                    variant="filled"
                                    size="xs"
                                    p={0}
                                >
                                    {
                                     0
                                    }

                                </Badge>
                            }
                            icon={<IconMessageCircle size="0.8rem" />}>
                            Messages
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="gallery"
                            rightSection={
                                <Badge
                                    w={30}
                                    h={30}
                                    sx={{ pointerEvents: 'none' }}
                                    variant="filled"
                                    size="xs"
                                    p={0}
                                >
                                    {
                                        data && data.length > 0 ? (
                                            <div>{data[0].flags.svg.length}</div>
                                        ) : (
                                            <div>0</div>
                                        )
                                    }
                                </Badge>
                            }
                             icon={<IconSettings size="0.8rem" />}>
                            Gallery
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel
                        value="settings"
                        pt="xs">
                        <Space h="xl" />
                        {sortedData.map(item => (
                            <div key={item.id}>{item.subregion}</div>
                        ))}
                    </Tabs.Panel>

                    <Tabs.Panel
                        value="messages"
                        pt="xs">
                        <Space h="xl" />
                        {
                            data ? data?.map(item => {
                                    return(
                                        <div onClick={() => getClicked(item.name.common)}>{item.altSpellings[2]}</div>
                                    )

                                })
                                :
                                ""
                        }
                    </Tabs.Panel>

                    <Tabs.Panel value="gallery" pt="xs">
                        <Space h="xl" />
                        {

                            data ? data.map(item => {
                                    return (
                                        <>
                                            <Box maw={240} mx="auto">
                                                <Space h="xl" />
                                                <CustomLink onClick={() => getMaps()} target={"_blank"} href={item.maps.googleMaps}>
                                                    <Image
                                                        radius="md"
                                                        src={item.flags.svg}
                                                        caption={item.name.common}
                                                    />
                                                </CustomLink>
                                                <Population>{item.population}</Population>

                                            </Box>
                                        </>
                                    )
                                })
                                :
                                <Group position="center">
                                    <Image width={200} height={120} src={null} alt="With default placeholder" withPlaceholder />
                                </Group>
                        }
                    </Tabs.Panel>
                </Tabs>
            }



                <Modals
                    setOpenedX={setOpenedX}
                    openedX={openedX}
                    title={list.title}
                    size={1000}
                >
                    <img src={imagesList[0]}/>
                </Modals>
        </Content>
    )
}




const Content = styled.div`
    img{
      cursor: pointer;
    }
  .mantine-Text-root{
    font-size: 16px;
  }

  .mantine-Tabs-tab{
    width: 600px;
  }
  
`
const Population = styled.div`
    display: flex;
    justify-content: center;
    font-size: 13px;
`
const CustomLink = styled.a`
  text-decoration: none;
`

export default Detail

