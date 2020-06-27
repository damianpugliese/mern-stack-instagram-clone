import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Footer = () => {
    return (
        <footer>
            <Container maxWidth="md" style={{ padding: 0 }} style={{ height: 50 }}>
                <Typography style={{ textAlign: 'center', color: 'rgba(var(--f52,142,142,142),1)' }} variant="body2">&copy;2020 Damián Pugliese</Typography>
            </Container>
        </footer>
    )
}

export default Footer;