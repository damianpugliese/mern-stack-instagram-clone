import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../../assets/images/logo.png'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, ButtonBase, Typography, InputAdornment } from '@material-ui/core';
import { Link } from 'react-router-dom';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        maxWidth: 350,
        [loginTheme.breakpoints.down('xs')]: {
            maxWidth: 'unset',
            width: '100%',
            background: 'transparent',
            border: 0
        }
    },
    paper2: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: theme.spacing(2),
        maxWidth: 350,
        [loginTheme.breakpoints.down('xs')]: {
            maxWidth: 'unset',
            width: '100%',
            background: 'transparent',
            border: 0
        }
    },
    logo: {
        width: 175,
        marginBottom: 30
    },
    input: {
        marginTop: theme.spacing(1),
        background: 'rgba(var(--b3f,250,250,250),1)',
        width: '100%'
    },
    errorIcon: {
        color: 'rgba(var(--i30,237,73,86),1)',
    },
    button: {
        padding: 8,
        width: '100%',
        backgroundColor: '#0095f6',
        color: '#fff',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: theme.spacing(2),
        '&:disabled': {
            backgroundColor: '#b2dffc'
        }
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
    linkResetPassword: {
        textDecoration: 'none',
        color: '#000',
        fontSize: '12px'
    },
    linkSignup: {
        marginLeft: theme.spacing(1),
        textDecoration: 'none',
        color: '#0095f6',
        fontWeight: 'bold'
    },
    error: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        color: 'rgba(var(--i30,237,73,86),1)',
        fontSize: '14px'
    }
}));

const loginTheme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    overrides: {
        MuiInputBase: {
            input: {
                fontSize: '11px',
                height: 18
            },
        },
        MuiOutlinedInput: {
            root: {
                '& $notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&$focused $notchedOutline': {
                    borderColor: 'rgba(168,168,168)',
                    borderWidth: 1,
                },
            },
        },
    },
});

const Login = () => {

    const classes = useStyles();

    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: ''
        },
    });

    const [buttonLoginDisabled, setButtonLoginDisabled] = useState(true);
    const [serverErrors, setServerErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        const { errors } = loginFormData;

        switch (name) {
            case 'email':
                errors.email =
                    !(/\S+@\S+\.\S+/.test(value)) && value.length > 3
                        ? "Enter a valid email"
                        : '';
                break;
            case 'password':
                errors.password =
                    /^\s+$/.test(value)
                        ? 'Field must contain almost one character'
                        : '';
                break;
            default:
                break;
        }

        setLoginFormData({
            ...loginFormData,
            [name]: value
        });
    }

    const handleSubmit = () => {
        axios.post('/api/users/login', loginFormData)
            .then(res => console.log(res.data))
            .catch(err => setServerErrors(err.response.data));
    }

    useEffect(() => {
        if (loginFormData.email.length > 3 &&
            loginFormData.password.length > 5 &&
            loginFormData.errors.email.length === 0 &&
            loginFormData.errors.password.length === 0
        ) {
            setButtonLoginDisabled(false)
        } else {
            setButtonLoginDisabled(true)
        }
    }, [loginFormData]);

    return (
        <ThemeProvider theme={loginTheme}>
            <Paper variant="outlined" square className={classes.paper}>
                <img src={logo} alt="logo" className={classes.logo} />
                <TextField
                    error={loginFormData.errors.email.length > 0}
                    variant="outlined"
                    size="small"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={classes.input}
                    type="text"
                    value={loginFormData.email}
                    helperText={loginFormData.errors.email}
                    InputProps={{
                        endAdornment: (
                            loginFormData.errors.email.length > 0 && <InputAdornment><HighlightOffOutlinedIcon className={classes.errorIcon} /></InputAdornment>
                        )
                    }}
                />
                <TextField
                    error={loginFormData.errors.password.length > 0}
                    variant="outlined"
                    size="small"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className={classes.input}
                    type="password"
                    value={loginFormData.password}
                    helperText={loginFormData.errors.password}
                    InputProps={{
                        endAdornment: (
                            loginFormData.errors.password.length > 0 && <InputAdornment><HighlightOffOutlinedIcon className={classes.errorIcon} /></InputAdornment>
                        )
                    }}
                />
                <ButtonBase className={classes.button} onClick={handleSubmit} disabled={buttonLoginDisabled}>
                    Login
                </ButtonBase>
                <div className={classes.adormentContainer}>
                    <div className={classes.adormentLines}></div>
                    <div className={classes.adormentLetter}>o</div>
                    <div className={classes.adormentLines}></div>
                </div>
                {serverErrors.msg && <p className={classes.error}>{serverErrors.msg}</p>}
                <Link to='/password/reset' className={classes.linkResetPassword}>
                    Did you forget password?
                </Link>
            </Paper>
            <Paper variant="outlined" square className={classes.paper2}>
                <Typography variant="body2">
                    Haven´t an account?
                </Typography>
                <Link to='/signup' className={classes.linkSignup}>
                    Signup
                </Link>
            </Paper>
        </ThemeProvider>
    )

}

export default Login;