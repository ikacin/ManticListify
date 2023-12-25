import React from 'react';
import { Container, Text, Button } from '@mantine/core';
import image from '../images/data-not-found.jpg';

function NotFoundImage() {
    return (
        <Container style={{ textAlign: 'center', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={image} alt="Not Found" style={{ maxWidth: '100%', height: 'auto' }} />
                <div style={{ marginLeft: '20px', textAlign: 'left' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something is not right...</h1>
                    <Text color="dimmed" size="lg">
                        Page you are trying to open does not exist. You may have mistyped the address, or the
                        page has been moved to another URL. If you think this is an error contact support.
                    </Text>
                    <Button variant="outline" size="md" style={{ marginTop: '1rem' }}>
                        Get back to home page
                    </Button>
                </div>
                <img src={image} alt="Not Found" style={{ display: 'none' }} />
            </div>
        </Container>
    );
}

export default NotFoundImage;
