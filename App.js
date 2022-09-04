import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Location from 'expo-location'; 
import DateTime from './functions/DateTime';
import ScrollingWeather from './functions/ScrollingWeather';

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
const bg = require('./assets/bg.png')

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("37.775", "-122.419")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
    
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      setData(data)
      })
    }
    
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.image}>
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <ScrollingWeather weatherData={data.daily}/>
      </ImageBackground>        
    </View>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
