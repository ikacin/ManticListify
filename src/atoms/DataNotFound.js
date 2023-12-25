import { Card, Image} from '@mantine/core';
import styled from 'styled-components'
import logo from '../images/data-not-found.jpg'

function DataNotFound() {
    return (
        <CardContent>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <CardWrap>
                    <Image
                        src={logo}
                        height={160}
                        alt="Norway"
                        width={230}
                    />
                </CardWrap>

            </Card>
        </CardContent>
    );
}


const CardWrap = styled(Card.Section)`
    display: flex;
    align-items: center;
    justify-content: center;

`

const CardContent = styled.div`
  .mantine-Card-root{
      border: none;
      box-shadow: none;
  }


`
















export default DataNotFound