import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, Text, Image, TextInput, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from "react-native-paper";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import {useDispatch} from 'react-redux';
import{reducerSetauthentication} from '../../redux/authenticationSlice';

const Home = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState('')
    const [isLoading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const showCriar = () => {
        navigation.navigate('CriarConta')
    }

    const showRecuperar = () => {
        navigation.navigate('RecuperarSenha')
    }

    const loginFirebase = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch(reducerSetauthentication({uid:res.user.uid}))
                navigation.navigate('Minhas vacinas')
            }).catch((error) => {
                setErrorLogin(true);
                console.log(error.message);
            })
    }

    useEffect(() => {

        setEmail('')
        setPassword('')

        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(reducerSetauthentication({uid:user.uid}))
                navigation.navigate('DrawerRoutes', {
                    screen: 'Minhas vacinas'})
            }
        })
    }, [])

    return (
        <ImageBackground source={require('../images/background.jpg')} style={styles.image}>
            <LinearGradient colors={["transparent", "rgba(84, 131, 126, 0.2) 0.28%", "rgba(255, 255, 255, 0.62) 9.89%", "rgba(221, 230, 229, 0.68) 35.41%", "rgba(59, 94, 90, 0.51) 100.65%"]} style={styles.LinearGradient}>
                <View style={styles.container}>
                    <Image source={require('../images/vaccine.png')} style={{ width: 70, height: 70, resizeMode: 'cover' }} />
                    <Text style={{ fontFamily: 'AveriaLibre-Bold', color: '#419ED7', fontSize: 40 }}>MyHealth</Text>
                </View>
                <View style={{ marginTop: 50, padding: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, color: '#419ED7', fontFamily: 'AveriaLibre-Light' }}>Controle as suas vacinas e </Text>
                    <Text style={{ fontSize: 25, color: '#419ED7', fontFamily: 'AveriaLibre-Light' }}>fique seguro</Text>
                </View>
                <View style={{ margin: 25, }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                        <Text style={{ marginRight: 5, color: '#FFF', fontFamily: 'AveriaLibre-Light', width: 45 }}>E-mail</Text>
                        <TextInput style={{ backgroundColor: 'white', width: '80%', height: 40, fontSize: 20, padding: 5, color: '#3F92C5', fontFamily: 'AveriaLibre-Light' }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 5, width: 45, color: '#FFF', fontFamily: 'AveriaLibre-Light' }}>Senha</Text>
                        <TextInput secureTextEntry={true} style={{ backgroundColor: 'white', width: '80%', height: 40, fontSize: 20, padding: 5, color: '#3F92C5', fontFamily: 'AveriaLibre-Light' }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    {
                        errorLogin === true
                            ?
                            <View style={styles.alert}>
                                <Text style={styles.textAlert}>E-mail e/ou senha inválidos.</Text>
                            </View>
                            :
                            <View />
                    }
                </View>
                <View style={{ alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>

                    <TouchableOpacity onPress={loginFirebase} style={{ marginBottom: 5, backgroundColor: '#49B976', marginBottom: 20, width: '50%', height: 25, alignItems: 'center', justifyContent: 'center' }}>
                        {
                            isLoading ?
                                <ActivityIndicator size={'small'} color={'white'} />
                                :
                                <Text style={{ color: '#FFFFFF', fontFamily: 'AveriaLibre-Light' }}>Entrar</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showCriar} style={{ marginBottom: 5, backgroundColor: '#419ED7', height: 25, width: '50%', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'AveriaLibre-Light' }}>Criar minha conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showRecuperar} style={{ marginBottom: 5, backgroundColor: '#B5C7D1', height: 25, width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'AveriaLibre-Light' }}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ImageBackground>

    );

}

const styles = StyleSheet.create({


    textAlert: {
        marginTop: 2,
        marginLeft: 50,
        color: 'red',
        fontFamily: 'AveriaLibre-Light'
    },
    image: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    LinearGradient: {
        flex: 1,
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})


module.exports = Home;