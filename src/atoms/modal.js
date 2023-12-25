import React, { useState ,useEffect} from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal} from '@mantine/core';
import styled from 'styled-components'
import { Title } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { Avatar } from '@mantine/core';

function Modals({openedX,setOpenedX,children,title,size}) {
    const [opened, { open, close }] = useDisclosure(false);

    const getClose = () => {
        setOpenedX(false)
    }

    return (
        <>
            <Modal
                opened={openedX}
                onClose={() => getClose()}
                title={<Title order={3}>   <Avatar color="blue" radius="sm">
                    <IconStar size="1.5rem" />
                </Avatar>{title}</Title>}
                size={size ?? 800}
                centered>

                {children}
            </Modal>

        </>
    );
}




export default Modals