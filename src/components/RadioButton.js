import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';



const RadioButton = ({options, onSelect,select}) =>{
    return(
        <View style={styles.seila}>
        {options.map(option => (
          <TouchableOpacity key={option.id} onPress={()=>onSelect(option)} style={styles.container}>
              <View style={styles.radio}>
                  {select === option.id && <View style={styles.inner}/>}
              </View>
              <Text style={styles.text}>{option.value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );

}

const styles = StyleSheet.create({
    radio:{
        width:18,
        height:18,
        borderRadius:9,
        borderColor:'white',
        borderWidth:2,
        justifyContent:"center",
        alignItems:"center"
    },
    inner:{
        width:11,
        height:11,
        borderRadius:5,
        backgroundColor:'#419ED7',
    },
    container:{
        flexDirection:'row'
     },
     text:{
        marginLeft:5,
        marginRight:5,
        color:'#FFFFFF',
        fontFamily: 'AveriaLibre-Light',
        padding:2,
        fontSize: 17,
     },
     seila:{
        flexDirection:'row',
        width:220,
        flexWrap:'wrap'
     }
})
module.exports = RadioButton;