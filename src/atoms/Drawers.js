import React, { useState ,useEffect,lazy, Suspense} from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Group } from '@mantine/core';

function Drawers({title,openedX,setOpenedX,children,DrawerBtn,size,zIndex,position}) {



    const close = () => {
        setOpenedX(false)
    }


    return (
        <>
            <Drawer
                opened={openedX}
                onClose={close}
                title={title}
                size={size ?? "600px"}
                zIndex={zIndex ?? 9999}
                position={position ?? "right"}
            >
                {children}
            </Drawer>

            <Group position="center">
                <Button onClick={() => setOpenedX(true)}>{DrawerBtn}</Button>
            </Group>
        </>
    );
}

export default Drawers