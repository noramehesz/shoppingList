import React from 'react';
import './App.css';
import SignIn from './SignIn';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignUp from "./SignUp";
import MainPage from "./MainPage";
import ListView from "./ListsView";
import EditList from "./EditList";
import axios from "axios";

export interface AppState {
    user: Object;
    isLoggedIn: boolean;
    myLists: Array<ShoppingList>;
    uiState: UiState;
    allLists: ShoppingList[];
}

export enum UiState {
  signIn = "singIn",
  signUp = "signUp",
  mainPage = "mainPage",
  listsPage = "listPage",
  editingPage = "editingPage"
}

type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    ownLists: ShoppingList[];
    sharedLists: ShoppingList[];

}

export type ShoppingListItem = {
    item: string,
    checked: boolean;
}

export type ShoppingList = {
      id: string;
      title: string;
      items: ShoppingListItem[];
      dateOfCreate?: Date;
}

export class ShoppingListApp extends React.Component<{}, AppState> {
  constructor(props: {className?: string}) {
    super(props);
    this.state = {
        user: Object,
        isLoggedIn: false,
        myLists: [],
        uiState: UiState.signIn,
        allLists: [],
    };
  }

  componentDidMount(): void {
    void  axios.get("http://localhost:3001/api/list").then(res => {
          console.log(res);
          let allLists = res.data;
          const converted: ShoppingList[] = allLists.map((list: any) => (
              {
                  id: list._id,
                  title: list.title,
                  items: list.items
              }
          ));
          this.setState({
              allLists: converted,
              myLists: converted,
          });
          console.log(converted);
      });
      const exampleLists: ShoppingList[] = [{id: "elsolista", title: "todo",items:[{item: "oil", checked: true}, {item: "sugar", checked: false}]},
          {id: "masodik", title: "to buy importan!!",items: [{item: "cat food", checked: true}, {item: "towels", checked: false}]}];
      this.setState({
          myLists: exampleLists,
      })
  }

  handleDeleteListOnCLick = (id: string) => {
      let mylist = this.state.myLists.filter(list => list.id === id);
      // let shared =
      if( mylist.length > 0 ){
          let idx = this.state.myLists.indexOf(mylist[0]);
          let newlist = this.state.myLists;
          newlist.splice(idx, 1);
          this.setState({
              myLists: newlist,
          });
      }
  }

  handleSaveListOnClick =  (list: ShoppingList) => {
      console.log(list);
      // let newlist = [...this.state.allLists];
      // let newItem: ShoppingList;
      // if (isEdited) {
      //     newItem = list;
      //     axios.put(`http://localhost:3001/api/list/${list.id}`, {newDatas: list}).then(res => {
      //         console.log(res);
      //     })
      // } else {
      //     axios.post("http://localhost:3001/api/list", {title: list.title, items: list.items}).then(res => {
      //         console.log(res);
      //         newItem = {id: res.data._id, title: res.data.title, items: res.data.items};
      //     })
      // }
      // this.setState({
      //     allLists: newlist,
      // })
  }

  render () {
      return (<div>
          <Router>
              <div>
                 <Switch>
                     <Route path={"/signIn"}>
                         <SignIn/>
                     </Route>
                     <Route path={"/signUp"}>
                         <SignUp/>
                     </Route>
                     <Route path={"/mainPage"}>
                         {/*this.state.isLoggedIn &&*/ <MainPage username={"norika"}/>}
                     </Route>
                     <Route path={"/myLists"}>
                         <ListView username={"norika"} shoppingLists={this.state.myLists} deleteItem={this.handleDeleteListOnCLick}/>
                     </Route>
                     <Route path={"/sharedLists"}>
                         <ListView username={"norika"} shoppingLists={this.state.myLists} deleteItem={this.handleDeleteListOnCLick}/>
                    </Route>
                     <Route path={`/editList/:id`} component={(props: any) =>
                         <EditList {...props} username={"norika"} saveOnClick={this.handleSaveListOnClick}/>}>
                     </Route>
                     <Route path={`/createList`} component={(props: any) =>
                         <EditList {...props} username={"norika"} saveOnClick={this.handleSaveListOnClick}/>}>
                     </Route>
                     <Route path={"/"}>
                         <SignIn/>
                     </Route>
                 </Switch>
              </div>
          </Router>
      </div>)
  }

}

export default ShoppingListApp;
