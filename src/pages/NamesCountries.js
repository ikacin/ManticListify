import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import { Card, Image, Text, Badge, Button, Group,Space } from '@mantine/core';
import { Center } from '@mantine/core';
import Headers from "./Header";
import styled from 'styled-components'

const NamesCountries = () => {
    const [listData, setListData] = useState([]);
    const {name} = useParams();
    const navigate = useNavigate()



    useEffect(() => {
        const url =`https://restcountries.com/v3.1/name/${name}`;
        axios.get(url)
            .then(function (response) {
                setListData(response.data)
                console.log(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    const getPage = (common) => {
        navigate(`/layout/restCountries/name/${common}`)
    }




    return (
            <>
                <Headers/>
                <Space h="xl" />

                {
                    listData && listData.map(item => {
                        return (
                            <Center maw={400} h={500} mx="auto">
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Card.Section>
                                        <Image
                                            src={item.flags.svg}
                                            height={160}
                                            alt="Norway"
                                            onClick={() => getPage(item.name.common)}
                                        />
                                    </Card.Section>

                                    <Group position="apart" mt="md" mb="xs">
                                        <Text weight={500}>{item.altSpellings[2] ? item.altSpellings[2] : "-" }</Text>
                                        <Badge color="pink" variant="light">
                                            {item.continents[0]}
                                        </Badge>
                                    </Group>

                                    <Text size="sm" color="dimmed">
                                        {item.flags.alt ? item.flags.alt : "-"}
                                    </Text>


                                    <Space h="md" />

                                    <Text size="sm" color="dimmed">
                                        Population : <Badge>{item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Badge>
                                    </Text>

                                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                        <LinkMaps href={item.maps.openStreetMaps}>Go to Maps</LinkMaps>
                                    </Button>
                                </Card>
                            </Center>

                        );

                    })


                }

            </>
    );
};

export default NamesCountries;


const LinkMaps = styled.a`
  text-decoration: none;

`