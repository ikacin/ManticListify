import React from 'react';
import { Accordion } from '@mantine/core';
import styled from 'styled-components'
import DataNotFound from "./DataNotFound";

export default ({ dataType }) => {
    return (
        <div>
            <Accordions defaultValue="customization">
                <Accordion.Item value="customization">
                    <Accordion.Control>Customization</Accordion.Control>
                    {
                        dataType ? dataType.map((item,index)=>{

                            return(
                                <Accordion.Panel>{item.body}</Accordion.Panel>
                            )
                        })
                            :
                            <DataNotFound/>
                    }
                </Accordion.Item>

                <Accordion.Item value="flexibility">
                    <Accordion.Control>Flexibility</Accordion.Control>
                    {
                        dataType ? dataType.map((item,index) => {
                            return(
                                <Accordion.Panel>{item.email}</Accordion.Panel>
                            )
                        })
                         :
                            <DataNotFound/>

                    }
                </Accordion.Item>

                <Accordion.Item value="focus-ring">
                    <Accordion.Control>No annoying focus ring</Accordion.Control>
                    {
                        dataType ? dataType.map((item,index) => {
                            return(
                                <Accordion.Panel>{item.name}</Accordion.Panel>
                            )
                        })
                            :
                            <DataNotFound/>
                    }
                </Accordion.Item>
            </Accordions>
        </div>
    );
};

const Accordions = styled(Accordion)`
    margin-top: 60px;
`