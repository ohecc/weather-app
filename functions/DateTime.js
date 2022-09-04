import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment-timezone';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


const DetailsForWeather = ({title, value, metric}) => {
  return (
    <View style={styles.weatherDetailFlex}>
        <Text style={styles.weatherDetails}>{title}</Text>
        <Text style={styles.weatherDetails}>{value}{metric}</Text>
    </View>
  )
}

const DateTime = ({current, lat, lon, timezone}) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect (() => {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
      const minutes = time.getMinutes();
      const ampm = hour >=12 ? 'pm' : 'am'
  
      setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
  
      setDate(days[day] + ', ' + date+ ' ' + months[month]) 
  
  }, 1000);
  }, [])
  return (

    <View style={styles.container}>
      <View>
        <View style={styles.infoContainer}>
          <View>
              <Text style={styles.currenTime}>{time}</Text>
          </View>
          <View>
              <Text style={styles.currentDate}>{date}</Text>
          </View>
          <View>
              <Text style={styles.timezone}>{timezone}</Text>
              <Text style={styles.latlong}>{lat}N, {lon}E</Text>
          </View>
        </View>
        <View style={styles.weatherDetailContainer}>
          <DetailsForWeather title="Humidity" value={current? current.humidity : ""} metric=" %"/>
          <DetailsForWeather title="Pressure" value={current? current.pressure : ""} metric=" hpa"/>
          <DetailsForWeather title="Sunrise" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""} metric=" am"/>
          <DetailsForWeather title="Sunset" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm') : ""} metric=" pm"/>
        </View> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1.5,
        flexDirection:"row",
        justifyContent:'center',
        padding: 100,
        alignItems: 'center',
    },

    infoContainer: {
        padding: 10,
        marginTop: 5
    },

    currenTime: {
        fontSize: 45,
        color:'white',
        fontWeight: '100',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    currentDate: {
        fontSize: 25,
        color: '#eee',
        fontWeight: '300',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    timezone: {
        fontSize: 20,
        color:'white',
        fontWeight: '100',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    latlong:{
        fontSize: 20,
        color:'white',
        fontWeight: '100',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    weatherDetailContainer: {
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 10,
        marginTop: 10
    }, 
    weatherDetailFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherDetails: {
        color:'#eee',
        fontSize: 14,
        fontWeight: '100'
    }
})

export default DateTime