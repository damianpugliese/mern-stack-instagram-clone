import React, { useState, useEffect } from 'react';
import logo from '../../../assets/images/logo.png';
import axios from 'axios';
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
        [signupTheme.breakpoints.down('xs')]: {
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
        [signupTheme.breakpoints.down('xs')]: {
            maxWidth: 'unset',
            width: '100%',
            background: 'transparent',
            border: 0
        }
    },
    logo: {
        width: 175,
        marginBottom: 20
    },
    signupTitle: {
        color: 'rgba(var(--f52,142,142,142),1)',
        textAlign: 'center',
        fontSize: '17px',
        fontWeight: 'bold'
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
        margin: theme.spacing(2)
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
    },
    error: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        color: 'rgba(var(--i30,237,73,86),1)',
        fontSize: '14px'
    }
}));

const signupTheme = createMuiTheme({
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

const Signup = () => {

    const classes = useStyles();

    const [signupFormData, setSignupFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
    });

    const [buttonSignupDisabled, setButtonSignupDisabled] = useState(true);
    const [serverErrors, setServerErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        const { errors } = signupFormData;

        switch (name) {
            case 'username':
                errors.username =
                    /^\s+$/.test(value) 
                        ? 'Field must contain almost one character'
                        : '';
                break;
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
            case 'confirmPassword':
                errors.confirmPassword =
                    value !== signupFormData.password && value.length > 0
                        ? 'Passwords do not match'
                        : '';
                break;
            default:
                break;
        }

        setSignupFormData({
            ...signupFormData,
            [name]: value
        });
        
    }
    
    const handleSubmit = () => {
        axios.post('/api/users/signup', signupFormData)
            .then(res => console.log(res.data))
            .catch(err => setServerErrors(err.response.data));
    }
    
    useEffect(()=>{
        if (signupFormData.username.length > 0 && 
            signupFormData.email.length > 3 && 
            signupFormData.password.length > 5 && 
            signupFormData.confirmPassword.length > 5 && 
            signupFormData.errors.username.length === 0 &&
            signupFormData.errors.email.length === 0 &&
            signupFormData.errors.password.length === 0 &&
            signupFormData.errors.confirmPassword.length === 0
        ) {
            setButtonSignupDisabled(false)
        } else {
            setButtonSignupDisabled(true)
        }
    }, [signupFormData]);

    return (
        <ThemeProvider theme={signupTheme}>
            <Paper variant="outlined" square className={classes.paper}>
                <img src={logo} alt="logo" className={classes.logo} />
                <Typography variant="h2" className={classes.signupTitle}>
                    Signup to see your friends photos and videos
                </Typography>
                <div className={classes.adormentContainer}>
                    <div className={classes.adormentLines}></div>
                    <div className={classes.adormentLetter}>o</div>
                    <div className={classes.adormentLines}></div>
                </div>
                <TextField
                    error={signupFormData.errors.username.length > 0}
                    variant="outlined"
                    size="small"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className={classes.input}
                    type="text"
                    value={signupFormData.username}
                    helperText={signupFormData.errors.username}
                    InputProps={{
                        endAdornment: (
                            signupFormData.errors.username.length > 0 && <InputAdornment><HighlightOffOutlinedIcon className={classes.errorIcon} /></InputAdornment>
                        )
                    }}
                />
                <TextField
                    error={signupFormData.errors.email.length > 0}
                    variant="outlined"
                    size="small"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={classes.input}
                    type="text"
                    value={signupFormData.email}
                    helperText={signupFormData.errors.email}
                    InputProps={{
                        endAdornment: (
                            signupFormData.errors.email.length > 0 && <InputAdornment><HighlightOffOutlinedIcon className={classes.errorIcon} /></InputAdornment>
                        )
                    }}
                />
                <TextField
                    error={signupFormData.errors.password.length > 0}
                    variant="outlined"
                    size="small"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className={classes.input}
                    type="password"
                    value={signupFormData.password}
                    helperText={signupFormData.errors.password}
                    InputProps={{
                        endAdornment: (
                            signupFormData.errors.password.length > 0 && <InputAdornment><HighlightOffOutlinedIcon className={classes.errorIcon} /></InputAdornment>
                        )
                    }}
                />
                <TextField
                    error={signupFormData.errors.confirmPassword.length > 0}
                    variant="outlined"
                    size="small"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    className={classes.input}
                    type="password"
                    value={signupFormData.confirmPassword}
                    helperText={signupFormData.errors.confirmPassword}
                    InputProps={{
                        endAdornment: (
                            signupFormData.errors.confirmPassword.length > 0 && <InputAdornment><HighlightOffOutlinedIcon className={classes.errorIcon} /></InputAdornment>
                        )
                    }}
                />
                <ButtonBase className={classes.button} onClick={handleSubmit} disabled={buttonSignupDisabled}>
                    Signup
                </ButtonBase>
                {serverErrors.msg && <p className={classes.error}>{serverErrors.msg}</p>}
            </Paper>
            <Paper variant="outlined" square className={classes.paper2}>
                <Typography variant="body2">
                    Do you have an account?
                </Typography>
                <Link to='/' className={classes.link}>
                    Login
                </Link>
            </Paper>
        </ThemeProvider>
    )

}

export default Signup;
