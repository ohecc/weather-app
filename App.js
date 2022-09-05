import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location'; 
import DateTime from './functions/DateTime';
import ScrollingWeather from './functions/ScrollingWeather';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
const bg = require('./assets/bg.png')

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        getWeatherInfo("37.775", "-122.419")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      getWeatherInfo(location.coords.latitude, location.coords.longitude);
    })();
    
  }, [])

  const getWeatherInfo = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      setData(data)
      })
    }
    
  }

    useEffect(() => {
    (async() => {
      let token;
      // check, is this a device or a simulator
      if (Constants.isDevice) {
        // see if we haven't already been granted access
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        // ask for the token
        token = (await Notifications.getExpoPushTokenAsync()).data;

      }else {
        alert('How is the weather?');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (token != undefined) {
        console.log(`Our token is ${token}`);
      }else {
        console.log(`We are unable to get the token`);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.picture}>
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <ScrollingWeather weatherInfo={data.daily}/>
      </ImageBackground>        
    </View>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
