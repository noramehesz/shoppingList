import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import {
    Avatar,
    Checkbox,
    Grid,
    Input,
    ListItem,
    List,
    ListItemAvatar,
    ListItemText,
    TextField
} from "@material-ui/core";
import ListAlt from "@material-ui/icons/ListAlt";
import Edit from "@material-ui/icons/Edit";
import DeleteForever from "@material-ui/icons/DeleteForever";
import {ShoppingList, ShoppingListItem} from "./App";
import NavBar from "./AppBar";
import {useLocation} from "react-router-dom";
import axios from 'axios';

interface EditListProps {
    username: string;
    saveOnClick: (newList: ShoppingList) => void;
    match?: any;
    isEdit?: boolean;
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
    addButton: {
        margin: "20px",
        backgroundColor: "lightgrey",
        color: "black"
    },
    saveButton: {
        marginTop: "20px",
        backgroundColor: "lightblue",
        color: "black"
    }
}));

export default function EditList(props: EditListProps) {
    const classes = useStyles();
    let listItems: ShoppingListItem[] = [];
    const exampleLists: ShoppingList = {id: "elsolista", title: "todo",items:[{item: "oil", checked: true}, {item: "sugar", checked: false}]};
    const [shoppingList, setShoppingList] = React.useState(exampleLists);
    const [newItem, setNewItem] = React.useState("");


        // useEffect(() => {
        //     if (props.isEdit) {
        //     axios.get(`http://localhost:3001/api/list/${props.match.params.id}`).then((res) => {
        //             let gettedList = res.data;
        //             setShoppingList({
        //                 id: gettedList._id,
        //                 title: gettedList.title,
        //                 items: gettedList.items.map((item: any) => ({item: item.item, checked: item.checked}))
        //             });
        //         }
        //     );
        // }}, []);


    const handleTitleOnChange = (e: any) => {
        let list = Object.assign({}, shoppingList);
        list.title = e.target.value;
        setShoppingList(list);
    }

    const handleDeleteItemOnClick = (idx: number) => {
        console.log(idx);
        const list = Object.assign({}, shoppingList);
        list.items.splice(idx, 1);
        setShoppingList(list);
    }

    const handleNewItemOnChange = (event: any) => {
        setNewItem(event.target.value);
    }

    const handleAddOnClick = () => {
        const list = shoppingList;
        list.items.push({item: newItem, checked: false});
        setShoppingList(list);
        setNewItem('');
    }

    const handleCheckOnChange = (idx: number, checked: boolean) => {
        let list = Object.assign({}, shoppingList);
        list.items[idx].checked = checked;
        setShoppingList(list);
    }

    return (
        <React.Fragment>
            <NavBar username={props.username}/>

            <div style={{margin: "30px"}}>
                <div>
                    <Input value={shoppingList.title} onChange={handleTitleOnChange} fullWidth style={{height: "50px", margin: "10px", fontSize: "50px"}}></Input>
                </div>
                <div>
                    <List>
                        {shoppingList.items.map((item,idx) => {
                            return (
                            <ListItem>
                                <Checkbox onChange={(e, checked) => handleCheckOnChange(idx, checked)} checked={item.checked}>
                                </Checkbox>
                                <h2>{item.item}</h2>
                                <Button onClick={() => {handleDeleteItemOnClick(idx)}} >
                                    <DeleteForever/>
                                </Button>
                            </ListItem>
                        );
                        })}
                    </List>
                </div>
                <div>
                  <form>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          id="newItem"
                          label="New Item"
                          name="newItem"
                          autoComplete="newitem"
                          autoFocus
                          onChange={handleNewItemOnChange}
                            value={newItem}>

                      </TextField>
                      <Button size="large" color="primary" className={classes.addButton} onClick={handleAddOnClick}>
                          Add
                      </Button>
                  </form>
                </div>
                <Button size="large" color="primary" className={classes.saveButton} onClick={() => {props.saveOnClick(shoppingList)}}>
                    SAVE
                </Button>
            </div>
        </React.Fragment>
    );
}