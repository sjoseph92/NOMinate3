import React, {Component} from 'react';
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
  DatePickerIOS,
} from 'react-native';
import {styles} from '../styles/styles.js';
import auth from '@react-native-firebase/auth';

export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  createUser = () => {
    let {email, password} = this.state;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        fetch('https://us-central1-nominate-hr.cloudfunctions.net/api/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: firebase.auth().currentUser.uid,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          }),
        })
          .then(() => {
            auth().currentUser.updateProfile({
              displayName: `${this.state.firstName} ${this.state.lastName}`,
            });
          })
          .then(() => {
            console.log(firebase.auth().currentUser.displayName);
          });
      })

      .then(() => {
        this.props.navigation.navigate('BottomTab');
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.WelcomeText}>Please fill out:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="first name"
          autoCapitalize="none"
          onChangeText={firstName => this.setState({firstName})}
          value={this.state.firstName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="last name"
          autoCapitalize="none"
          onChangeText={lastName => this.setState({lastName})}
          value={this.state.lastName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="email"
          autoCapitalize="none"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <TextInput
          style={styles.textInput}
          placeholder="confirm password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        <TouchableOpacity
          style={styles.SubmitButtonStyle}
          activeOpacity={0.3}
          onPress={() => this.createUser()}>
          <Text style={styles.TextStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
