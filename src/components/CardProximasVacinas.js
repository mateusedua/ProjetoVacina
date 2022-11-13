import React from "react";
import { TouchableOpacity, View,StyleSheet,Text, ImageEditor } from "react-native";

const CardProximasVacinas = (props) =>{
    const { item } = props

    return(
        <View style={styles.card}>
            <Text style={{color:'#3F92C5',marginLeft:5,marginTop:5,fontSize:17,fontFamily: 'AveriaLibre-Light'}}>{item.vacina}</Text>
            <Text style={{color:'#8B8B8B',marginLeft:5,marginBottom:5,fontSize:17,fontFamily: 'AveriaLibre-Light'}}>{item.data_proxima}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width:'100%',
        
        backgroundColor: '#FFFFFF',
        borderRadius:5,
        marginBottom:10
    }
})


module.exports = CardProximasVacinas;