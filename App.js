import React, { Component } from 'react';
import { ScrollView, StyleSheet, TextInput, Text, View, Button, Alert, ActivityIndicator, Picker, TouchableOpacity, ImageBackground,Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { getEvent, createEvent, createUser, loginUser } from './Api';
import Map from './Map';


class LogInScreen extends Component {
  constructor(props){
    super(props);
    if (this.state.loginUser){
      const { navigate } = this.props.navigation;
      navigate('Landing');
    }
  }
  state = {
    username: '',
    password: '',
    isLoggingIn: false,
    message: '',
    loginUser: null
  }

  userLogin = () => {

   this.setState({ isLoggingIn: true, message: '' });

   var params = {
       username: this.state.username,
       password: this.state.password,
       grant_type: 'password'
   };

   loginUser(params.username, params.password, ((err, user)=>{
      const { navigate } = this.props.navigation;
     if (err || JSON.parse(user._bodyText).error) {
      this.setState({ isLoggingIn: false, message: 'Invalid Email' });
     } else {
        let jsonUser =  JSON.parse(user._bodyText)
        this.setState({  isLoggingIn: false, loginUser: jsonUser })
        navigate('Landing', { user: jsonUser });
      }
   }));
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
        <View style={{padding: 15}} />
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
        <View style={{padding: 20}} />
        <Button
          disabled={this.state.isLoggingIn||!this.state.username||!this.state.password}
          onPress={this.userLogin}
          title="Submit"
        />
        <View style={{padding: 10}} />
        <Button
          onPress={() => navigate('SignUp')}
          title="Sign Up"
        />
      </View>
    </ScrollView>
    </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
 titleWord:{
   fontSize: 20,
   textAlign: 'center'
  },
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

class LandingScreen extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return(
    <ImageBackground source={require ('./eurovision_turkey_fan_page_background_by_alisarikaya-d56oqze.jpg')} style={styles.backgroundImage}>
    <ScrollView style={{padding: 30}}>
        <Text style={styles.titleWord}>Hello, {params.user.name}</Text>
        <Button
          onPress={() => navigate('Chat')}
          title="Create Event/Activity"
          />
        <Button
          onPress={() => navigate('Event')}
          title="View Events/Activities"/>
        <Button
          onPress={() => navigate('InvitedEvent')}
          title="View Invited Events/Activities"
        />
  </ScrollView>
  </ImageBackground>
    )
  }
}

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
    createUser(params.email, params.contactNo, params.name, params.password,(err, token)=>{
    if (err){
      this.setState({ message: 'Error Trying to create User' });
    } else {
      console.log(token);
      navigate('Login');
    }
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
      <ImageBackground source={require ('./download.jpg')} style={signUpSreen.backgroundImage}>
      <ScrollView style={{padding: 30}}>
                <Text
                    style={{fontSize: 30, paddingLeft:105}}>
                    Sign Up
                </Text>
                <Image source={require ('./male-user-shadow_318-34042.jpg')} style={{height:100,width:100,borderRadius: 50,marginLeft:105}}/>
                <Text
                    style={{fontSize: 20}}>
                    Full Name
                </Text>
                <TextInput
                    ref={component => this._name = component}
                    placeholder='Full Name'
                    onChangeText={(name) => this.setState({name})}
                    autoFocus={true}
                    style= {{paddingLeft:5 , paddingBottom: 5 }}
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
                    style= {{paddingLeft:5 , paddingBottom: 5 }}
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
                    style= {{paddingLeft:5 , paddingBottom: 5 }}
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
                    style= {{paddingLeft:5 , paddingBottom: 5 }}
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
        </ScrollView>
        </ImageBackground>
    )
  }
}

const signUpSreen = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%'
  }
})

class CreateScreen extends Component {
  // Nav options can be defined as a function of the screen's props:
  constructor(props){
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  doEvent = () => {
   const { navigate } = this.props.navigation;
   var params = {
       activityName: this.state.activityName,
       startDate: this.state.startDate,
       endDate: this.state.endDate,
       deadline: this.state.deadline,
       startTime: this.state.startTime,
       endTime: this.state.endTime,
       placeName: this.state.placeName,
   };
   createEvent(params.startDate, params.endDate, params.placeName, params.longitude, params.latitude,
     params.activityName, params.deadline,
     params.startTime, params.endTime, params.invitationOnly, params.organiser, params.remarks,(token)=>{
     console.log(token);
     navigate('Login');
   });
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
      <ImageBackground source={require ('./background_02.jpeg')} style={styles.backgroundImage}>
      <ScrollView style={{padding: 0}}>
      <Text
          style={styles.titleWord}>
          Activity/Event Name
      </Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(activityName) => this.setState({activityName})}
        value={this.state.activityName}
      />
      <Text
          style={styles.titleWord}>
          Place Name
      </Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(placeName) => this.setState({placeName})}
        value={this.state.placeName}
      />
        <Text
            style={styles.titleWord}>
            Start Date
        </Text>
      <DatePicker
        style={{width: 200}}
        date={this.state.startDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            margin: 'auto',
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
          style={styles.titleWord}>
        End Date
      </Text>
    <DatePicker
      style={{width: 200}}
      date={this.state.endDate}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
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
        style={styles.titleWord}>
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
      style={styles.titleWord}>
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
    style={styles.titleWord}>
  Deadline
</Text>
  <DatePicker
    style={{width: 200}}
    date={this.state.deadline}
    mode="date"
    placeholder="Select Date"
    format="YYYY-MM-DD"
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

      <Map/>
      <Button
    onPress={this.doEvent}
    title="Submit"
/>

      <Text style={{height: 1000}}></Text>


      </ScrollView>
      </ImageBackground>
    )
  }
}

const createScreen = StyleSheet.create({


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
          <Text style={styles.btnText}>View</Text>
        </View>
      </TouchableOpacity>
    );

    const tableData = [
      ['Host A Club', '21 December 2017', 'St. Regis Hotel', ele('line 1')],
      ['Christmas Dinner', '25 December 2017', 'Ritz Carlton Hotel', ele('line 2')],
      ['Halloween Party', '15 October 2017', 'Duet Residence', ele('line 3')],
      ['Chinese New Year Reunion', '15 February 2018', 'My House', ele('line 4')]
    ];

    return (
      <ScrollView style={{padding: 30}}>
      <View>
      <Text
          style={{fontSize: 30}}>
          Event/Activities List
      </Text>
        <Table>
          <Rows data={tableData} style={styles.row} textStyle={styles.text}/>
        </Table>
      </View>
      </ScrollView>

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
      ['Chinese New Year Reunion', '15 February 2018', 'Janson house', ele('line 1')],
      ['Farewell Lol', '5 December 2018', 'Lol house', ele('line 2')],
      ['Farewell Alex', '2 December 2020', 'Alex house', ele('line 3')],
      ['Farewell Alice', '1 December 2019', 'Alice house', ele('line 4')]
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
                    style={{fontSize: 20}}>
                    Event/Activity Name
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Christmas Dinner
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Start Date
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    25th December 2017
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    End Date
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    26th December 2017
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Location
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    Ritz Carlton Hotel
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Deadline
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    20th December 2017
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Start Time
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    7:00PM
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    End Time
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    12:00AM
                </Text>
                <Text
                    style={{fontSize: 20}}>
                    Status
                </Text>
                <Text
                    style={{fontSize: 15}}>
                    GOING
                </Text>
                <Button
                  title="YES"
                  color="#15e411"
                  accessibilityLabel="Learn more about this purple button"
                />
                <Button
                  title="NO"
                  color="#ff1414"
                  accessibilityLabel="Learn more about this purple button"
                />
        </ScrollView>
    )
  }
}

export const SimpleApp = StackNavigator({
  Login: { screen: LogInScreen },
  Landing: { screen: LandingScreen},
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
