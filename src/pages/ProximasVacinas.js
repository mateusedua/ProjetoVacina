import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatList } from "react-native-gesture-handler";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase'
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import CardProximasVacinas from "../components/CardProximasVacinas";

const ProximasVacinas = ({ navigation, route }) => {

    const [vacina, setVacina] = useState([])

    const cadastrar = () => {
        navigation.navigate('AltCadVacina', { tipo: 'Cadastrar' })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(collection(db, 'vacina'), where("uid", "==", user.uid));

                onSnapshot(q, (res) => {
                    const listavacina = []
                    res.forEach((doc) => {
                        listavacina.push({
                            id_vacina: doc.data().id_vacina,
                            data_proxima: doc.data().data_proxima,
                            vacina: doc.data().vacina
                        })
                    })
                    setVacina(listavacina);
                })
            }
        })
    }, [])
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon style={styles.icon} name="bars" />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Próximas vacinas</Text>
            </View>
            <View style={styles.container}>
                <FlatList data={vacina.filter(item => item.data_proxima != '')}
                    renderItem={({ item }) => <CardProximasVacinas navigation={navigation} item={item} />} keyExtractor={item => item.id_vacina}
                />
                <View style={styles.body}>
                    <TouchableOpacity style={styles.button} onPress={cadastrar}>
                        <Text style={styles.textButton}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
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
    icon: {
        fontSize: 40,
        marginLeft: 5,
        marginRight: 20,
        color: '#ADD5D0'
    },
    textHeader: {
        fontSize: 40,
        color: '#419ED7',
        fontFamily: 'AveriaLibre-Light'
    },
    container: {
        flex: 1,
        width: '90%',
        marginTop:10
    },
    button: {
        width: '60%',
        backgroundColor: '#49B976',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    textButton: {
        padding: 12,
        color: '#FFF',
        fontSize: 17,
        fontFamily: 'AveriaLibre-Light',
    },
    body: {
        width: '100%',
        alignItems: 'center'
    }
})

module.exports = ProximasVacinas;