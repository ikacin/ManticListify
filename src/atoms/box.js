import { Text, Paper } from '@mantine/core';
import styled from 'styled-components'

const Box = ({children,display}) => {
    return (
        <Paperes shadow="sm" radius="md" p="xl">
            <Text>
                {children}
            </Text>
        </Paperes>
    );
}

const Paperes = styled(Paper)`
  display:${({display}) => display ? "" : "flex"};
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`






export default Box