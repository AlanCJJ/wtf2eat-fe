import React, { Component }  from 'react';
import { ScrollView, StyleSheet, TextInput, Text, View, Button, Alert, ActivityIndicator } from 'react-native';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoggingIn: false,
    message: ''
  }

  userLogin = () => {

   this.setState({ isLoggingIn: true, message: '' });

   var params = {
       username: this.state.username,
       password: this.state.password,
       grant_type: 'password'
   };

    var formBody = [];
    for (var property in params) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    Alert.alert(formBody);
  }

  clearUsername = () => {
    this._username.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  clearPassword = () => {
    this._password.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  render() {
    return (
      <ScrollView style={{padding: 30}}>
                <Text
                    style={{fontSize: 30}}>
                    Login
                </Text>
                <TextInput
                    ref={component => this._username = component}
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username})}
                    autoFocus={true}
                    onFocus={this.clearUsername}
                />
                <TextInput
                    ref={component => this._password = component}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    onSubmitEditing={this.userLogin}
                />
                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                        {this.state.message}
                    </Text>
                )}
                {this.state.isLoggingIn && <ActivityIndicator />}
                <View style={{margin:7}} />
                <Button
                    disabled={this.state.isLoggingIn||!this.state.username||!this.state.password}
              onPress={this.userLogin}
              title="Submit"
          />
        </ScrollView>
    )
  }
}
