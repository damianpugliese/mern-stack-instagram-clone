import React, { useState } from 'react';
import lock from '../../../assets/images/lock.png'
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
        [resetPasswordTheme.breakpoints.down('xs')]: {
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
        padding: 10,
        maxWidth: 350,
        background: '#FAFAFA',
        borderTop: 'none',
        [resetPasswordTheme.breakpoints.down('xs')]: {
            maxWidth: 'unset',
            width: '100%',
            border: 0
        }
    },
    lock: {
        width: 80,
        marginBottom: 30
    },
    resetTitle: {
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 600
    },
    resetSubtitle: {
        textAlign: 'center',
        color: 'rgba(var(--f52,142,142,142),1)',
        margin: theme.spacing(2)
    },
    input: {
        marginTop: theme.spacing(1),
        background: 'rgba(var(--b3f,250,250,250),1)',
        width: '100%',
    },
    errorIcon: {
        color: 'rgba(var(--i30,237,73,86),1)'
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
        marginBottom: theme.spacing(1),
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
    linkSignup: {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#000'
    },
    linkGoBack: {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#000'
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

const resetPasswordTheme = createMuiTheme({
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

const ResetPassword = () => {

    const classes = useStyles();

    const [resetPasswordFormData, setResetPasswordFormData] = useState({
        email: '',
        errorEmail: {
            msg: ''
        }
    })

    const handleChange = e => {
        const { name, value } = e.target;
        let { errorEmail } = resetPasswordFormData;

        switch (name) {
            case 'email':
                errorEmail.msg =
                    !(/\S+@\S+\.\S+/.test(value)) && value.length > 3
                        ? "Enter a valid email"
                        : '';
                break;
            default:
                break;
        }
       
        setResetPasswordFormData({
            ...resetPasswordFormData,
            [name]: value,
        });

    }

    const handleSubmit = () => {
        console.log(resetPasswordFormData);
    }

    return (

        <ThemeProvider theme={resetPasswordTheme}>
            <Paper variant="outlined" square className={classes.paper}>
                <img src={lock} alt="logo" className={classes.lock} />
                <Typography variant="h4" className={classes.resetTitle}>
                    Do you have problems to Signin?
                </Typography>
                <Typography variant="body2" className={classes.resetSubtitle}>
                    Enter your email and we'll send you a link to recover your account
                </Typography>
                <TextField
                    error={resetPasswordFormData.errorEmail.msg.length > 0}
                    variant="outlined"
                    size="small"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className={classes.input}
                    type="text"
                    value={resetPasswordFormData.email}
                    helperText={resetPasswordFormData.errorEmail.msg}
                    InputProps={{
                        endAdornment: (
                            resetPasswordFormData.errorEmail.msg.length > 0 && <InputAdornment><HighlightOffOutlinedIcon className={classes.errorIcon}/></InputAdornment>
                        )
                    }}
                />
                <ButtonBase className={classes.button} onClick={handleSubmit} disabled={!/\S+@\S+\.\S+/.test(resetPasswordFormData.email)}>
                    Send me a link
                </ButtonBase>
                {/* {error && <p className={classes.error}>{error.msg}</p>} */}
                <div className={classes.adormentContainer}>
                    <div className={classes.adormentLines}></div>
                    <div className={classes.adormentLetter}>o</div>
                    <div className={classes.adormentLines}></div>
                </div>
                <Link to='/Signup' className={classes.linkSignup}>
                    Signup
                </Link>
            </Paper>
            <Paper variant="outlined" square className={classes.paper2}>
                <Link to='/' className={classes.linkGoBack}>
                    Go back to Login
                </Link>
            </Paper>
        </ThemeProvider>
    )
}

export default ResetPassword;