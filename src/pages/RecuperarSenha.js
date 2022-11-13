import React,{useState} from "react";
import { View, Text, Image, TextInput, StyleSheet, KeyboardAvoidingView, VirtualizedList, TouchableOpacity } from "react-native";
import {auth} from '../config/firebase'
import {sendPasswordResetEmail} from 'firebase/auth'

const RecuperarSenha = ({navigation}) => {

    const [email,setEmail] = useState('');

    const recuperar = () =>{
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            navigation.pop()
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.header}>
                <Image source={require("../images/vaccine.png")} style={{ marginLeft: 5, marginRight: 5, width: 40, height: 40 }}></Image>
                <Text style={styles.text}>MyHealth</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.textInput}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText ={text => setEmail(text)}
                    />
                </View>
                <View style={styles.bodyButton}>
                    <TouchableOpacity style={styles.button} onPress={recuperar}>
                        <Text style={styles.textButton}>Recuperar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#ADD5D0',
        flex: 1,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        width: '100%',
        backgroundColor: '#C1E7E3'
    },
    text: {
        fontSize: 40,
        color: '#419ED7',
        fontFamily: 'AveriaLibre-Light'
    },
    container: {
        flex: 1,
        width: '90%',
        justifyContent: "center",
        alignItems:'center'
    },
    body: {
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center',
        marginBottom: 10
    },
    bodyButton:{
        alignItems: 'center',
        marginTop:50,
        width:'100%',
      },
    input: {
        backgroundColor: '#FFF',
        width: '65%',
        height: 40,
        fontSize: 20,
        padding: 5,
        color: '#3F92C5',
        fontFamily: 'AveriaLibre-Light'
    },
    textInput: {
        width: '15%',
        fontSize: 17,
        textAlign: 'right',
        marginRight: 5,
        color: '#FFFFFF',
        fontFamily: 'AveriaLibre-Light',
    },
    button:{
        width:'50%',
        height: 40,
        backgroundColor:'#49B976',
        alignItems:'center',
      },
      textButton:{
        padding:12,
        color:'#FFF',
        fontSize: 15,
        fontFamily: 'AveriaLibre-Light',
      }
})
module.exports = RecuperarSenha;