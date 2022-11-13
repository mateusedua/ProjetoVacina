import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInputMask } from 'react-native-masked-text';
import RadioButton from "../components/RadioButton";
import { launchCamera } from 'react-native-image-picker';
import { addDoc, collection, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db, storage } from '../config/firebase'
import { uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage"
import uuid from 'react-native-uuid'
import { useSelector } from "react-redux"
import MapView, { Marker } from "react-native-maps";

const AltCadVacina = ({ navigation, route }) => {

    const uid = useSelector((state) => state.authentication.uid)
    const id_doc = useSelector((state) => state.alterVacina.id_doc)
    const [dataVacina, setDataVacina] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [showMap, setShowMap] = useState(false)

    useEffect(() => {
        if (route.params.tipo == "Cadastrar") {
            setDataVacina('')
            setVacina('')
            setDoseIn('1a. dose')
            setUrlFoto(null)
            setPathFoto(null)
            setDataProxima('')
            setLongitude(0)
            setLatitude(0)
        }

        if (id_doc) {
            if (route.params.tipo == "Alterar") {
                getDoc(doc(db, "vacina", id_doc))
                    .then((res) => {
                        setDataVacina(res.data().data_vacina),
                            setVacina(res.data().vacina),
                            setDataProxima(res.data().data_proxima),
                            setDoseIn(res.data().dose),
                            setUrlFoto(res.data().comprovante),
                            setPathFoto(res.data().pathFoto),
                            setLatitude(res.data().latitude),
                            setLongitude(res.data().longitude)
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
    }, [route])

    const [alert, setAlert] = useState(false);
    const [vacina, setVacina] = useState('');
    const [doseIn, setDoseIn] = useState('1a. dose');
    const [dataProxima, setDataProxima] = useState('');
    const [pathFoto, setPathFoto] = useState(null);
    const [urlFoto, setUrlFoto] = useState(null);

    const dose = [
        {
            id: '1a. dose',
            value: '1a. dose'
        },
        {
            id: '2a. dose',
            value: '2a. dose'
        },
        {
            id: '3a. dose',
            value: '3a. dose'
        },
        {
            id: 'Dose única',
            value: 'Dose única'
        }
    ]

    const camera = () => {
        launchCamera()
            .then((res) => {
                setUrlFoto(res.assets[0].uri)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const alterar = async () => {
        const file = await fetch(urlFoto)
        const blob = await file.blob()

        uploadBytes(ref(storage, pathFoto), blob)
            .then((res) => {
                getDownloadURL(ref(storage, res.ref.fullPath))
                    .then((url) => {
                        updateDoc(doc(db, "vacina", id_doc), {
                            comprovante: url,
                            vacina: vacina,
                            data_proxima: dataProxima,
                            dose: doseIn,
                            data_vacina: dataVacina,
                            pathFoto: pathFoto,
                            latitude: latitude,
                            longitude: longitude
                        })
                    })
            })

    }

    const cadastrar = async () => {
        const file = await fetch(urlFoto)
        const blob = await file.blob()

        const filename = "comprovante/" + urlFoto.split("-")[urlFoto.split("-").length - 1];

        uploadBytes(ref(storage, filename), blob)
            .then((res) => {
                getDownloadURL(ref(storage, res.ref.fullPath))
                    .then((url) => {
                        addDoc(collection(db, "vacina"), {
                            comprovante: url,
                            vacina: vacina,
                            data_proxima: dataProxima,
                            dose: doseIn,
                            id_vacina: uuid.v4(),
                            data_vacina: dataVacina,
                            uid: uid,
                            pathFoto: filename,
                            latitude: latitude,
                            longitude: longitude
                        })
                    })
            })
    }

    const excluir = () => {
        deleteObject(ref(storage, pathFoto))
            .then(() => {
                deleteDoc(doc(db, "vacina", id_doc))
                    .then(() => {
                        setAlert(false)
                        navigation.goBack()
                    })
            })
    }

    const getLocation = (e) => {
        setLatitude(e.nativeEvent.coordinate.latitude)
        setLongitude(e.nativeEvent.coordinate.longitude)
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon style={styles.icon} name="bars" />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Minhas vacinas</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.textInput}>Data de vascinação</Text>
                    <TextInputMask
                        style={styles.input}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={dataVacina}
                        onChangeText={text => setDataVacina(text)}
                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.textInput}>Vacina</Text>
                    <TextInput
                        style={styles.input}
                        value={vacina}
                        onChangeText={setVacina}
                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.textInput}>Dose</Text>
                    <RadioButton
                        options={dose}
                        select={doseIn}

                        onSelect={(option) => {
                            setDoseIn(option.id);
                        }}

                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.textInput}>Comprovante</Text>
                    <TouchableOpacity style={styles.selectImage} onPress={camera}>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'AveriaLibre-Light', margin: 4, fontSize: 17, }}>Selecionar imagem...</Text>
                    </TouchableOpacity>
                    {
                        urlFoto ?
                            <View style={{ width: '82%', alignItems: 'flex-end' }}>

                                <Image source={{ uri: urlFoto }} style={styles.image} />
                            </View>
                            :
                            null
                    }
                </View>
                <View style={styles.body}>
                    <Text style={styles.textInput}>Próxima vacinação</Text>
                    <TextInputMask
                        style={styles.input}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={dataProxima}
                        onChangeText={text => setDataProxima(text)}
                    />
                </View>
                <View style={styles.bodyButton}>
                    <TouchableOpacity style={styles.button} onPress={() => { setShowMap(true) }}>
                        <Text style={styles.textButton}>Abrir Mapa</Text>
                    </TouchableOpacity>
                </View>
                {
                    route.params.tipo == "Cadastrar" ?
                        <View style={styles.bodyButton}>
                            <TouchableOpacity style={styles.button} onPress={cadastrar}>
                                <Text style={styles.textButton}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.bodyButton}>
                            <TouchableOpacity style={styles.button} onPress={alterar}>
                                <Text style={styles.textButton}>Salvar alterações</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.excluir} onPress={() => { setAlert(true) }}>
                                <Image source={require('../images/trash.png')} style={{ margin: 4 }} />
                                <Text style={{ color: '#FFFFFF', marginRight: 3, fontFamily: 'AveriaLibre-Light', fontSize: 17 }}>Excluir</Text>
                            </TouchableOpacity>
                        </View>

                }
            </View>
            {
                alert ?
                    <View style={styles.alert}>
                        <View style={styles.alertCard}>
                            <Text style={{ color: '#FD7979', fontFamily: 'AveriaLibre-Light', fontSize: 17, marginTop: 30 }}>Tem certeza que deseja</Text>
                            <Text style={{ color: '#FD7979', fontFamily: 'AveriaLibre-Light', fontSize: 17, }}>remover essa vacina?</Text>

                            <View style={styles.alertButtons}>
                                <TouchableOpacity
                                    onPress={excluir}
                                    style={{ backgroundColor: '#FF8383', width: 90, height: 30, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'AveriaLibre-Light', fontSize: 17, color: 'white' }}>SIM</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { setAlert(false) }}
                                    style={{ backgroundColor: '#3F92C5', width: 90, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'AveriaLibre-Light', fontSize: 17, color: 'white' }}>CANCELAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    null
            }

            {
                showMap ?
                    <View style={styles.map}>
                        <MapView
                            style={{width:'100%',height:'90%'}}
                            onPress={(e) => getLocation(e)}
                            loadingEnabled={true}
                            region={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: latitude, longitude: longitude }}
                                pinColor={"green"}
                            />
                        </MapView>
                        <View style={{alignItems:'center',marginTop:20}}>
                        <TouchableOpacity style={styles.button} onPress={()=>{setShowMap(false)}}>
                            <Text style={styles.textButton}>Fechar Mapa</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    map:{
        position: 'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'#ADD5D0'
    },
    background: {
        backgroundColor: '#ADD5D0',
        flex: 1,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        width: '100%',
        backgroundColor: '#C1E7E3'
    },
    icon: {
        fontSize: 28,
        marginLeft: 5,
        marginRight: 20,
        color: '#ADD5D0'
    },
    textHeader: {
        fontSize: 30,
        color: '#419ED7',
        fontFamily: 'AveriaLibre-Light'
    },
    container: {
        marginTop: 40,
        width: '90%',
    },
    body: {
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: 'center',
        marginBottom: 10,
    },
    textInput: {
        width: '39%',
        fontSize: 17,
        textAlign: 'right',
        marginRight: 5,
        color: '#FFFFFF',
        fontFamily: 'AveriaLibre-Light',
    },
    input: {
        backgroundColor: '#FFF',
        width: '58.5%',
        height: 40,
        fontSize: 20,
        padding: 5,
        color: '#3F92C5',
        fontFamily: 'AveriaLibre-Light'
    },
    selectImage: {
        backgroundColor: '#419ED7'
    },
    image: {
        width: 150,
        height: 70,
        marginTop: 5
    },
    bodyButton: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        width: '60%',
        backgroundColor: '#49B976',
        alignItems: 'center'
    },
    textButton: {
        padding: 12,
        color: '#FFF',
        fontSize: 17,
        fontFamily: 'AveriaLibre-Light',
    },
    excluir: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: '#FD7979',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%'
    },
    alert: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertCard: {
        backgroundColor: 'white',
        width: 300,
        height: 170,
        alignItems: 'center'
    },
    alertButtons: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

module.exports = AltCadVacina;