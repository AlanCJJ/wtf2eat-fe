import React, { Component } from 'react';
import { ScrollView, StyleSheet, TextInput, Text, View, Button, Alert, ActivityIndicator, Picker, TouchableOpacity, ImageBackground,Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {createUser} from './Api';
import Map from './Map';


class LogInScreen extends Component {
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
    const { navigate } = this.props.navigation;
    return (
    <ImageBackground source={require ('./eurovision_turkey_fan_page_background_by_alisarikaya-d56oqze.jpg')} style={styles.backgroundImage}>
      <ScrollView style={{padding: 30}}>
                <Text
                    style={styles.titleWord}>
                    Login
                </Text>
                <View style={styles.signInForm}>
                <TextInput
                    ref={component => this._username = component}
                    placeholder='Username'
                    onChangeText={(username) => this.setState({username})}
                    autoFocus={true}
                    style={styles.userName}
                    onFocus={this.clearUsername}
                />
                <TextInput
                    ref={component => this._password = component}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    style={styles.password}
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
          <Button
          onPress={() => navigate('SignUp')}
          title="Sign Up"
        />
        </View>
          <Button
          onPress={() => navigate('Chat')}
          title="Create Event/Activity"
        />
        <Button
        onPress={() => navigate('Event')}
        title="View Events/Activities"
      />
      <Button
      onPress={() => navigate('InvitedEvent')}
      title="View Invited Events/Activities"
    />
    </ScrollView>
    </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
 titleWord:{
   fontSize: 35,
   marginLeft: 110},
backgroundImage: {
   width: '100%',
   height: '120%'
},
signInForm: {
  marginTop: 20,
  marginBottom: 20,
  padding: 20,
  display: 'flex',

},
userName:{
  paddingBottom: 10,
  paddingLeft: 5
},
password:{
  paddingBottom: 10,
  paddingLeft: 5
}
});

class SignUpScreen extends Component {
  constructor(props){
    super(props);
  }
  state = {
    email: '',
    password: '',
    isSigningUp: false,
    message: ''
  }

  userSignUp = () => {
   this.setState({ isSigningUp: true, message: '' });
   const { navigate } = this.props.navigation;
   var params = {
       email: this.state.email,
       name: this.state.name,
       contactNo: this.state.mobileNumber,
       password: this.state.password,
   };
   createUser(params.email, params.contactNo, params.name, params.password,(token)=>{
     console.log(token);
     navigate('Login');
   });
  }

  clearEmail = () => {
    this._email.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  clearName = () => {
    this._name.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  clearPassword = () => {
    this._password.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  clearMobileNumber = () => {
    this._password.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={{padding: 30}}>
                <Text
                    style={{fontSize: 30}}>
                    Sign Up
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Full Name
                </Text>
                <TextInput
                    ref={component => this._name = component}
                    placeholder='Full Name'
                    onChangeText={(name) => this.setState({name})}
                    autoFocus={true}
                    onFocus={this.clearName}
                />
                <Text
                    style={{fontSize: 20}}>
                    E-mail
                </Text>
                <TextInput
                    ref={component => this._email = component}
                    placeholder='Email'
                    onChangeText={(email) => this.setState({email})}
                    autoFocus={true}
                    onFocus={this.clearEmail}
                />
                <Text
                    style={{fontSize: 20}}>
                    Mobile Number
                </Text>
                <TextInput
                    ref={component => this._mobileNumber = component}
                    placeholder='Mobile Number'
                    keyboardType='numeric'
                    onChangeText={(mobileNumber) => this.setState({mobileNumber})}
                    onFocus={this.clearMobileNumber}
                    onSubmitEditing={this.userSignUp}
                />
                <Text
                    style={{fontSize: 20}}>
                    Password
                </Text>
                <TextInput
                    ref={component => this._password = component}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    onSubmitEditing={this.userSignUp}
                />
                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                        {this.state.message}
                    </Text>
                )}
                {this.state.isSigningUp && <ActivityIndicator />}
                <View style={{margin:7}} />
                <Button
                    disabled={this.state.isSigningUp||!this.state.email||!this.state.password||!this.state.name}
              onPress={this.userSignUp}
              title="Submit"
          />
          <Button
          onPress={() => navigate('Login')}
          title="Log In"
        />
        </ScrollView>
    )
  }
}

class CreateScreen extends Component {
  // Nav options can be defined as a function of the screen's props:
  constructor(props){
    super(props);
    this.state = { text: 'Useless Placeholder' };
    this.state = {startDate:"2016-05-15"}
    this.state = {endDate:"2016-05-15"}
    this.state = {startTime:"11:04"}
    this.state = {endTime:"11:04"}
  }
  render(){
    let data = [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];
    return (
      <ScrollView style={{padding: 30}}>
      <Text
          style={{fontSize: 30}}>
          Activity/Event Name
      </Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
        <Text
            style={{fontSize: 30}}>
            Start Date
        </Text>
      <DatePicker
        style={{width: 200}}
        date={this.state.startDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(startDate) => {this.setState({startDate: startDate})}}
      />
      <Text
          style={{fontSize: 30}}>
        End Date
      </Text>
    <DatePicker
      style={{width: 200}}
      date={this.state.endDate}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
      minDate="2016-05-01"
      maxDate="2016-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          marginLeft: 36
        }
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(endDate) => {this.setState({endDate: endDate})}}
    />
    <Text
        style={{fontSize: 30}}>
      Start Time
    </Text>
      <DatePicker
        style={{width: 200}}
        date={this.state.startTime}
        mode="time"
        placeholder="select time"
        format="HH-mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(startTime) => {this.setState({startTime: startTime})}}
  />
  <Text
      style={{fontSize: 30}}>
    End Time
  </Text>
    <DatePicker
      style={{width: 200}}
      date={this.state.endTime}
      mode="time"
      placeholder="select time"
      format="HH-mm"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          marginLeft: 36
        }
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(endTime) => {this.setState({endTime: endTime})}}
/>
<Text
    style={{fontSize: 30}}>
  Deadline
</Text>
  <DatePicker
    style={{width: 200}}
    date={this.state.deadline}
    mode="date"
    placeholder="Select Date"
    format="YYYY-MM-DD"
    minDate="2016-05-01"
    maxDate="2016-06-01"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    customStyles={{
      dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
      },
      dateInput: {
        marginLeft: 36
      }
      // ... You can check the source to find the other keys.
    }}
    onDateChange={(deadline) => {this.setState({deadline: deadline})}}
    />
      <Dropdown
        label='Favorite Fruit'
        data={data}
      />
      <Map style={createScreen.googleMap}/>

      </ScrollView>
    )
  }
}

const createScreen = StyleSheet.create({
  googleMap:{
    marginTop:'1000%',
  }

});

class EventScreen extends Component {
  _alert = (value) => {
    Alert.alert(value);
  }


  render() {
    const { navigate } = this.props.navigation;
    const ele = (value) => (
      <TouchableOpacity onPress={() => navigate('Details')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    const tableData = [
      ['1', '2', '3', ele('line 1')],
      ['a', 'b', 'c', ele('line 2')],
      ['1', '2', '3', ele('line 3')],
      ['a', 'b', 'c', ele('line 4')]
    ];

    return (
      <View>
        <Table>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}

class InvitedEventScreen extends Component {
  _alert = (value) => {
    Alert.alert(value);
  }


  render() {
    const { navigate } = this.props.navigation;
    const ele = (value) => (
      <TouchableOpacity onPress={() => navigate('Details')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );

    const tableData = [
      ['1', '2', '3', ele('line 1')],
      ['a', 'b', 'c', ele('line 2')],
      ['1', '2', '3', ele('line 3')],
      ['a', 'b', 'c', ele('line 4')]
    ];

    return (
      <View>
        <Table>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}

class DetailScreen extends Component {
  render() {
    return (
      <ScrollView style={{padding: 30}}>
                <Text
                    style={{fontSize: 30}}>
                    Details
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Event/Activity Name
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Start Date
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    End Date
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Location
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Deadline
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Start Time
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    End Time
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Status
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Example
                </Text>
                <Button
                  title="Learn More"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
        </ScrollView>
    )
  }
}

export const SimpleApp = StackNavigator({
  Login: { screen: LogInScreen },
  SignUp: { screen: SignUpScreen },
  Chat: { screen: CreateScreen },
  Event: { screen: EventScreen },
  Details: { screen: DetailScreen },
  InvitedEvent: { screen: InvitedEventScreen }
});

export default class App extends Component {
  render() {
    return <SimpleApp />;
  }
}

const styless = StyleSheet.create({
  text: { marginLeft: 5 },
  row: { height: 30 },
  btn: { width: 58, height: 18, backgroundColor: '#ccc', marginLeft: 15 },
  btnText: { textAlign: 'center', color: '#fff' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
