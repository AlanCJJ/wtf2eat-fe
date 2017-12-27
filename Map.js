import React from 'react';
import { StyleSheet,AppRegistry, Text, View, Dimensions,TextInput} from 'react-native';
import MapView from 'react-native-maps';
import { createEvent } from './Api'

const {width,height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATTITUDE_DELTA = 0.09222
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

export default class Map extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      origin: '',
      destination: ''
    }
    this.mapOnPress = this.mapOnPress.bind(this);
    this.getLongLatByPlaceQuery = this.getLongLatByPlaceQuery.bind(this);
  }

  watchId: ? number = null

  mapOnPress = (e) => {

  let latitude = parseFloat(e.nativeEvent.coordinate.latitude)
  let longitude = parseFloat(e.nativeEvent.coordinate.longitude)

  var initialRegion = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: LATTITUDE_DELTA,
    longitudeDelta: LONGTITUDE_DELTA
  }

  this.setState({markerPosition: initialRegion})
  }

  getLongLatByPlaceQuery(placeName){
    if (placeName.length < 3){
      return;
    }
    let query = placeName.replace(' ','+');
    var googleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+query+"&key=AIzaSyDbWFNFsCZQpc4aiZ0_AcvvDc9ryV2mq7U";
    fetch(googleURL)
    .then((response) => { response.json()
      .then((responseJson) => {
        if(responseJson.results[0]){
          var markerPosition = {
            latitude:responseJson.results[0].geometry.location.lat,
            longitude:responseJson.results[0].geometry.location.lng,
            latitudeDelta: LATTITUDE_DELTA,
            longitudeDelta: LONGTITUDE_DELTA
          };
          this.setState({markerPosition,initialPosition: markerPosition});
        }
        }).catch((error) => {
        console.error(error);
      });
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.placeName !== this.props.placeName){
      this.getLongLatByPlaceQuery(nextProps.placeName);
    }
  }

  componentDidMount(){
    // If (this is set location){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})

    }, (error) => {
      alert(JSON.stringify(error));
    },{
      enableHighAccuracy: true ,
      timeout:20000,
      maximumAge: 1000
    })
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View style={styles.container}>
      <MapView style ={styles.map}
        region = {this.state.initialPosition}
        ref={c => this.mapView = c}
        onPress = {this.mapOnPress}>
        <MapView.Marker coordinate = {this.state.markerPosition}>
        <View style ={styles.radius}>
          <View style={styles.marker}/>
        </View>
        </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius:{
    height:50,
    width:50,
    borderRadius: 50 /2 ,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderWidth:1,
    borderColor: 'rgba(0,122,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker:{
    height:20,
    width:20,
    borderWidth:3,
    borderColor:'white',
    borderRadius:20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 700,
    left: 0,
    bottom: 600,
    right: 0,
  }
});
