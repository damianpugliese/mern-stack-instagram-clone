import React, { useState } from 'react';
import logo from '../../../assets/images/logo.png'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, ButtonBase, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        maxWidth: 350
    },
    paper2: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: theme.spacing(2),
        maxWidth: 350
    },
    logo: {
        width: 175,
        marginBottom: 30
    },
    input: {
        marginTop: theme.spacing(1),
        background: 'rgba(var(--b3f,250,250,250),1)',
        width: 280,
        fontSize: '10px'
    },
    button: {
        padding: 8,
        width: '100%',
        backgroundColor: '#0095f6',
        color: '#fff',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: theme.spacing(2)
    },
    adormentContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing(3)
    },
    adormentLetter: {
        display: 'flex',
        flex: 0,
        color: 'rgba(var(--f52,142,142,142),1);',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: '15px',
        margin: '0 18px',
        textTransform: 'uppercase'
    },
    adormentLines: {
        display: 'flex',
        flex: 1,
        background: 'rgba(var(--b38,219,219,219),1)',
        height: '1px'
    },
    link: {
        marginLeft: theme.spacing(1),
        textDecoration: 'none',
        color: '#0095f6',
        fontWeight: 'bold'
    }
}));

const signinTheme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            input: {
                fontSize: '11px',
                color: '#000',
            },
        },
        MuiOutlinedInput: {
            root: {
                '& $notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: 'rgba(168,168,168)',
                },
                '&$focused $notchedOutline': {
                    borderColor: 'rgba(168,168,168)',
                    borderWidth: 1,
                },
            },
        },
    },
});

const Signin = () => {

    const classes = useStyles();

    const [signinFormData, setSigninFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setSigninFormData(prevState=>({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        console.log(signinFormData);
    }

    return (
        <ThemeProvider theme={signinTheme}>
            <Paper variant="outlined" square className={classes.paper}>
                <img src={logo} alt="logo" className={classes.logo} />
                <TextField
                    variant="outlined"
                    size="small"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={classes.input}
                    type="text"
                />
                <TextField
                    variant="outlined"
                    size="small"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className={classes.input}
                    type="password"
                />
                <ButtonBase className={classes.button} onClick={handleSubmit}>
                    Signin
                </ButtonBase>
                <div className={classes.adormentContainer}>
                    <div className={classes.adormentLines}></div>
                    <div className={classes.adormentLetter}>o</div>
                    <div className={classes.adormentLines}></div>
                </div>
            </Paper>
            <Paper variant="outlined" square className={classes.paper2}>
                <Typography variant="body2">
                    Haven´t an account? 
                </Typography>
                <Link to='Signup' className={classes.link}>
                    Signup
                </Link>
            </Paper>
        </ThemeProvider>
    )

}

export default Signin;