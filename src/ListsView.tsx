import React, {useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useLocation
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import ListAlt from "@material-ui/icons/ListAlt";
import Edit from "@material-ui/icons/Edit";
import DeleteForever from "@material-ui/icons/DeleteForever";
import {ShoppingList} from "./App";
import NavBar from "./AppBar";
import axios from "axios";


interface listViewProps {
    shoppingLists: ShoppingList[],
    username: string,
    deleteItem: (id: string) => void;
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


export default function ListView(props: listViewProps) {
    const classes = useStyles();

    return (
        <>
        <NavBar username={props.username}/>

            <Grid item xs={12} md={6}>
                <Typography variant="h6" >
                </Typography>
                <div >
                    <List >
                        {props.shoppingLists.map(list => {
                            return ( <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ListAlt/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={list.title}/>
                                    <Link to={`/editList/${list.id}`}>
                                <Button>
                                    <Edit/>
                                </Button>
                                    </Link>
                                <Button onClick={() => {props.deleteItem(list.id);}}>
                                    <DeleteForever/>
                                </Button>
                            </ListItem>
                            )
                        })}
                    </List>
                </div>
            </Grid>
    </>
    );
}