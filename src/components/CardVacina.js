import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {useDispatch} from 'react-redux';
import { reducerSetAlterVacina } from "../../redux/alterVacinaSlice";

const CardVacina = (props) => {

    const { item } = props;

    const dispatch = useDispatch()

    const altcad = (id) =>{
        dispatch(reducerSetAlterVacina({id_doc:id}))
        props.navigation.navigate('AltCadVacina',{tipo:'Alterar'})
    }

    return (
        <TouchableOpacity style={styles.card} onPress={()=>{altcad(item.id_doc)}}>

            <Text style={{ fontFamily: 'AveriaLibre-Light', marginTop: 2, color: '#3F92C5' }}>{item.vacina}</Text>
            <View style={styles.dose}>
                <Text style={{ margin: 3, fontFamily: 'AveriaLibre-Light', color: '#FFFFFF' }}>{item.dose}</Text>
            </View>
            <Text style={{ fontFamily: 'AveriaLibre-Light', color: '#8B8B8B' }}>{item.data_vacina}</Text>

            <Image source={{ uri: item.comprovante }} style={styles.image} />
            {
                item.data_proxima ?
                    <View style={styles.proxima}>
                    <Text style={{marginBottom:2,marginRight:5,fontFamily: 'AveriaLibre-Light',fontSize:11,color:'#FD7979'}}>Próxima dose em: {item.data_proxima}</Text>
                    </View>
                :
                null
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    proxima:{
        width:'100%',
        alignItems:'flex-end'
    },
    card: {
        backgroundColor: 'white',
        width: '48%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft:5
    },
    dose: {
        backgroundColor: '#3F92C5',
        marginTop: 3,
        marginBottom: 3,
    },
    image: {
        width: 150,
        height: 70,
        marginBottom: 7,
        marginTop: 3
    },
})


module.exports = CardVacina;