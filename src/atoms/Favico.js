import { useState } from 'react';
import { useFavicon } from '@mantine/hooks';
import { Group, Button,Switch,useMantineTheme   } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import styled from 'styled-components'
function ChangeFavico() {
    const [favicon, setFavicon] = useState('https://mantine.dev/favicon.svg');
    const setTwitterFavicon = () => setFavicon('https://twitter.com/favicon.ico');
    const setMantineFavicon = () => setFavicon('https://mantine.dev/favicon.svg');
    const [checked, setChecked] = useState(false);
    const theme = useMantineTheme();
    useFavicon(favicon);

    const HandleChange = (event) => {
        setChecked(event.currentTarget.checked)
        if (checked){
            setMantineFavicon()

        }else{
            setTwitterFavicon()
        }
    }

    return (
        <Group position="center">
            <Switch
                checked={checked}
                onChange={(event) => HandleChange(event)}
            />
        </Group>
    );
}


const IconChecked = styled(IconCheck)`
`

export default ChangeFavico