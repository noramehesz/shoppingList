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

export interface AppState {
    user: Object;
    isLoggedIn: boolean;
    myLists: Array<ShoppingList>;
    uiState: UiState;
}

export enum UiState {
  signIn = "singIn",
  signUp = "signUp",
  mainPage = "mainPage",
  listsPage = "listPage",
  editingPage = "editingPage"
}

type ShoppingList = {
  title: String;
  text: String;
  dateOfCreate: Date;
}

export class ShoppingListApp extends React.Component<{}, AppState> {
  constructor(props: {className?: string}) {
    super(props);
    this.state = {
        user: Object,
        isLoggedIn: false,
        myLists: [],
        uiState: UiState.signIn,
    };
  }

  componentDidMount(): void {

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
                         {/*this.state.isLoggedIn &&*/ <MainPage/>}
                     </Route>
                     <Route path={"/myLists"}>
                        My own lists
                     </Route>
                     <Route path={"/sharedLists"}>
                         My shared lists
                    </Route>
                     <Route path={"/editList"}>
                        <EditList/>
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
