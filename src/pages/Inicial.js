import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView,SafeAreaView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from '../config/firebase';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { FlatList } from "react-native-gesture-handler";
import CardVacina from '../components/CardVacina';
import { useSelector } from "react-redux";

const Inicial = ({navigation }) => {
    const [vacina, setVacina] = useState([]);
    const [pesquisar,setPesquisar] = useState('');
    const uid = useSelector((state)=>state.authentication.uid)

    const cadastrar = () =>{
        navigation.navigate('AltCadVacina',{tipo:'Cadastrar'})
    }

    useEffect(() => {

        const q = query(collection(db, 'vacina'), where("uid", "==",uid));

        onSnapshot(q, (res) => {
            const listavacina = []
            res.forEach((doc) => {
                listavacina.push({
                    id_doc: doc.id,
                    comprovante: doc.data().comprovante,
                    data_proxima: doc.data().data_proxima,
                    data_vacina: doc.data().data_vacina,
                    dose: doc.data().dose,
                    id_vacina: doc.data().id_vacina,
                    uid: doc.data().uid,
                    vacina: doc.data().vacina
                })
            })
            setVacina(listavacina);
        })
    }, [])

    return (

        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon style={styles.icon} name="bars" />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Minhas vacinas</Text>
            </View>
            <View style={{width:'90%',marginBottom:5}}>
                <TextInput
                    style={styles.pesquisar}
                    placeholder="PESQUISAR VACINA..."
                    placeholderTextColor="#8B8B8B" 
                    onChangeText={text=>setPesquisar(text)}
                    />
            </View>
            <View style={styles.container}>
                <FlatList data={vacina.filter(item=>(item.vacina.toLowerCase().indexOf(pesquisar.toLowerCase()) > -1))}
                    renderItem={({ item }) => <CardVacina navigation={navigation} item={item} />} keyExtractor={item => item.id_vacina}
                    numColumns={2}
                />

                <View style={styles.body}>
                    <TouchableOpacity style={styles.button} onPress={cadastrar}>
                        <Text style={{color:'#FFFFFF',fontFamily: 'AveriaLibre-Light',fontSize:17,padding:12}}>Nova Vacina</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#ADD5D0',
        alignItems: 'center',
        height:'100%',
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
    pesquisar: {
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        height: 45,
        fontSize: 17,
        color: '#419ED7',
        fontFamily: 'AveriaLibre-Light'
    },
    container: {
        flex: 1,
        width: '90%',
    },
    button: {
        backgroundColor: '#49B976',
        alignItems: 'center',
        width: '60%',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    body: {
        width: '100%',
        alignItems: 'center'
    }
})

module.exports = Inicial;