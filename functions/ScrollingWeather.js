import React from 'react'
import { View, ScrollView, Image, Text, StyleSheet, Dimensions } from 'react-native'
import moment from 'moment-timezone'
import ForecastPredict from './ForecastPredict'


const ScrollingWeather = ({weatherInfo}) => {
  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
        <PresentTemp data={weatherInfo && weatherInfo.length > 0 ? weatherInfo[0] : {}}/>
        <ForecastPredict data={weatherInfo} />
    </ScrollView>
  )
}

const PresentTemp = ({data}) => {
    if(data && data.weather){
        const img = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
        return(
            <View style={styles.presentTemperature}>
                <Image source={img} style={styles.icons} />
                <View style={styles.infoContainer}>
                    <Text style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                    <Text style={styles.temperature}>Night : {data.temp.night}&#176;C</Text>
                    <Text style={styles.temperature}>Day : {data.temp.day}&#176;C</Text>
                </View>
            </View>
        )
    } else{
        return(
            <View>

            </View>
        )
        
    }

   
}

const styles = StyleSheet.create({
    icons: {
        width: 150,
        height: 150
    },
    scrollView: {
        flex:0.4,
        padding:30,

    },
    presentTemperature: {
        flexDirection: 'row',
        backgroundColor: '#18181bcc',
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        borderColor:'#eee',
        borderWidth:1,
        padding: 1
        
    },
    day: {
        fontSize: 20,
        color:"white",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },
    temperature: {
        fontSize: 16,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    },
    infoContainer: {
        paddingRight:10
    }
})

export default ScrollingWeather