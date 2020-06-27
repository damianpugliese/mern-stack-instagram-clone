import React, { useState } from 'react';
import './Header.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import logo from '../../../assets/images/logo.png'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        width: '100%',
        height: '55px',
        background: '#fff',
        boxShadow: '0px 0.5px 1px 0px rgba(0,0,0,0.2)'
    },
    container: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 0
    },
    logo: {
        marginTop: '7px',
        height: '30px'
    },
    navBar: {
        display: 'inline-flex',
    },
    links: {
        textDecoration: 'none',
        color: '#000',
        paddingLeft: '25px',
        fontSize: '1.2em'
    }
}));

const Header = () => {

    const classes = useStyles();

    return (
        <header className={classes.header}>
            <Container maxWidth="md" className={classes.container}>
                <Link to="/">
                    <img src={logo} alt="logo" className={classes.logo}/>
                </Link>
                <nav className={classes.navBar}>
                    <Link to="/signin" className={classes.links}>Signin</Link>
                    <Link to="/signup" className={classes.links}>Signup</Link>
                    <Link to="/profile" className={classes.links}>Profile</Link>
                </nav>
            </Container>
        </header>
    )
}

export default Header;