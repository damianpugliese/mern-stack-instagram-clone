import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import profile from '../../../assets/images/profile.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 30
    },
    header: {
        display: 'flex',
        width: '100%',
        marginBottom: 44
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30
    },
    label: {
        display: 'flex',
        zIndex: 10,
        width: 150,
        height: 150,
        borderRadius: 75,
        cursor: 'pointer'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 75
    },
    inputFile: {
        display: 'none'
    },
    usernameContainer: {
        display: 'flex',
        marginBottom: 20
    },
    username: {
        fontSize: 28,
        fontWeight: 300
    },
    usernameList: {
        display: 'flex',
        marginBottom: 20
    },
    usernameListItem: {
        display: 'flex',
        textDecoration: 'none',
        marginRight: 40,
        fontSize: 16
    },
    usernameListItemAmount: {
        fontWeight: 'bold',
        marginRight: theme.spacing(1),
    },
    usernameFullName: {
        fontSize: 16,
        fontWeight: 600
    },
    posts: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        borderTop: '1px solid rgba(var(--b38,219,219,219),1)',
        paddingTop: 30
    },
    gridList: {
        display: 'flex',
        width: '100%'
    }
}));

const Profile = () => {

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <header className={classes.header}>
                <Grid item xs={4} className={classes.imageContainer}>
                    <label htmlFor="upload" className={classes.label}>
                        <img src={profile} alt="profile" className={classes.image}>

                        </img>
                    </label>
                    <input id="upload" type="file" className={classes.inputFile} accept="image/*" />
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.usernameContainer}>
                        <Typography variant="h2" className={classes.username}>
                            username
                        </Typography>
                    </div>
                    <ul className={classes.usernameList}>
                        <li className={classes.usernameListItem}><span className={classes.usernameListItemAmount}>0</span>posts</li>
                        <li className={classes.usernameListItem}><span className={classes.usernameListItemAmount}>0</span>followers</li>
                        <li className={classes.usernameListItem}><span className={classes.usernameListItemAmount}>0</span>following</li>
                    </ul>
                    <div className={classes.usernameContainer}>
                        <Typography variant="h1" className={classes.usernameFullName}>
                            First Last
                        </Typography>
                    </div>
                </Grid>
            </header>
            <section className={classes.posts}>
                <Grid container item xs={12}>
                    
                </Grid>
            </section>
        </Grid>
    )
}

export default Profile;
