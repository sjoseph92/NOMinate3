import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Button,
  AsyncStorage,
  Switch
} from "react-native";
import { styles } from "../styles/styles.js";
import auth from '@react-native-firebase/auth';

export default class App extends Component {
  state = {
    email: "",
    password: ""
  };
   
loginUser = () => { //firebase function for authorizing established users
  const { email, password } = this.state;
  auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    alert('success');
  })
  .catch(error => {
    alert(error);
  });
}


  // loginFbUser = () => {
  //   LoginManager.logInWithPermissions(["public_profile", "email"])
  //     .then(result => {
  //       if (result.isCancelled) {
  //         return Promise.reject(new Error("The user cancelled the request"));
  //       }
  //       return AccessToken.getCurrentAccessToken();
  //     })
  //     .then(data => {
  //       const credential = firebase.auth.FacebookAuthProvider.credential(
  //         data.accessToken
  //       );
  //       return firebase.auth().signInWithCredential(credential);
  //     })
  //     .then(() => {
  //       fetch("https://us-central1-nominate-hr.cloudfunctions.net/api/users", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           id: firebase.auth().currentUser.uid,
  //           firstName: this.state.firstName,
  //           lastName: this.state.lastName
  //         })
  //       });
  //     })
  //     .then(() => {
  //       this.props.navigation.navigate("BottomTab");
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });
  // };

  render() {
    return (
      <View style={styles.MainContainer}>
        <KeyboardAvoidingView>
          <Text style={styles.WelcomeText}> NOMinate</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            placeholder="email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            autoCapitalize="none"
            secureTextEntry
            style={styles.textInput}
            placeholder="password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={0.3}
            onPress={() => this.loginUser()}
          >
            <Text style={styles.TextStyle}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={0.3}
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
          >
            <Text style={styles.TextStyle}>Create An Account</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

