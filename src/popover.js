import React, { useState ,useEffect} from 'react';
import { Popover, Button, TextInput } from '@mantine/core';
import styled from 'styled-components'

const PopoverList = ({item,email}) =>
{
    const [currentValue, setCurrentValue] = useState("");
    const [currentItem,setCurrentItem] = useState("");

    const setValue = () =>{
        setCurrentValue(item);
        setCurrentItem(email)
    }

    return (
      <Wrapper>
        <Popover width={300} trapFocus position="bottom" withArrow shadow="md" onOpen={setValue}>
            <Popover.Target >
                <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
                <TextInput label="Name" placeholder="Name" size="xs" defaultValue={currentValue} />
                <TextInput label="Email" placeholder="john@doe.com" size="xs" mt="xs"  defaultValue={currentItem}/>
            </Popover.Dropdown>
        </Popover>
      </Wrapper>
    );
}

const Wrapper = styled.div`
  button#mantine-r1-target{
    margin-top:16px;
  }
    

`



export default PopoverList