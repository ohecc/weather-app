import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import moment from 'moment-timezone'

const ForecastPredict = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {
                data && data.length > 0 ? 

                data.map((data, index) => (

                    index !== 0 &&  <ForecastPredictItem key={index} futureForecast={data}/>
                ))

                :

                <View/>
            }
        </View>
    )
}

const ForecastPredictItem = ({futureForecast}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+futureForecast.weather[0].icon+"@2x.png"}
    return (
        <View style={styles.forecastPredictItemContainer}>
            <Text style={styles.day}>{moment(futureForecast.dt * 1000).format('ddd')}</Text>
            <Image style={styles.icons} source={img}/>
            <Text style={styles.temperature}>Night : {futureForecast.temp.night}&#176;C</Text>
            <Text style={styles.temperature}>Day : {futureForecast.temp.day}&#176;C</Text>
            <Text style={styles.temperature}>{futureForecast.weather[0].description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    icons: {
        width: 100,
        height:100
    }, 
    forecastPredictItemContainer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius:10,
        borderColor:"#eee",
        borderWidth:1,
        padding: 60,
        marginLeft: 20,
        marginRight: 40
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
        fontSize: 14,
        color:"white",
        fontWeight:"100",
        textAlign:"center"
    },
})

export default ForecastPredict