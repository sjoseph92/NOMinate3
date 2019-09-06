import React, { Component } from "react";
import LogInScreen from "./Authorization/LogInScreen.js/index.js";
import SignUpScreen from './Authorization/SignUpScreen.js/index.js'

import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

const AuthNav = createSwitchNavigator(
  {
    LogInScreen,
    SignUpScreen
  },
  {
    initialRouteName: "LogInScreen"
  }
);



const AppContainer = createAppContainer(AuthNav);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}