import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    logOutButton: {
       display: 'flex',
       flexDirection: "column",
        alignItems: 'right',
        backgroundColor: "white",
    },
}));

const cards = [1, 2];

export default function MainPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative" style={{display: "flex"}}>
                <Toolbar>
                    <AccountCircle className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        User's Shopping Lists
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.logOutButton}
                    >
                        <Link href={"/signIn"}  >
                        Log out
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <main>
                <Container className={classes.cardGrid} >
                    <Grid container spacing={8} >
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.toString() === "1" ? "My Lists" : "Shared Lists"}
                                        </Typography>
                                        <Typography>
                                            {card.toString() === "1" ?
                                            "Look at your own amazing lists and get to know what you have to by today!" :
                                            "Interested in other's lists? Get a look at what your friends shared with you!"}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" fullWidth>
                                            <Link href={card.toString() === "1" ? "/myLists" : "/sharedLists"}>
                                            GO
                                            </Link>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Button fullWidth>
                        <Link href={"/editList"}>
                        Create
                        </Link>
                    </Button>
                </Container>
            </main>
        </React.Fragment>
    );
}