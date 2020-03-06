import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

interface AppBarProps {
    username: string;
}

const useStyles = makeStyles(theme => ({
    usersData: {
        display: 'flex',
        flexDirection: 'row',
        "& *": {
            display: 'inline-block',
        }
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    logOutButton: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'right',
    },
}));

export default function NavBar(props: AppBarProps) {
    const classes = useStyles();

    return (
        <AppBar position="relative" style={{display: "flex"}}>
            <Toolbar className={classes.toolbar}>
                <div className={classes.usersData}>
                    <AccountCircle className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        {props.username}'s Shopping Lists
                    </Typography>
                </div>
                <Link to={"/signIn"}  >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.logOutButton}
                    >
                        Log out
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}