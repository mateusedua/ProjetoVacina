import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableOpacity } from "react-native";
import RadioButton from "../components/RadioButton";
import { TextInputMask } from 'react-native-masked-text';
import {auth,db} from '../config/firebase'
import {createUserWithEmailAndPassword,signOut} from 'firebase/auth'
import { doc, setDoc} from "firebase/firestore"

const CriarConta = ({navigation}) => {

  const sexo = [
    {
      id: 'Masculino',
      value: 'Masculino'
    },
    {
      id: 'Feminino',
      value: 'Feminino'
    }
  ]

  const [select, setSelec] = useState(1);
  const [nome,setNome] = useState('');
  const [datanasc,setDatanasc] = useState('');
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [confirmarSenha,setConfirmarSenha] = useState('');
  const [valid,setValid] =useState(false);

  const cadastrar = () =>{
    if(senha === confirmarSenha){
      createUserWithEmailAndPassword(auth,email,senha)
      .then((user)=>{
        setDoc(doc(db,"users",user.user.uid),{
          nome:nome,
          sexo:select,
          nascimento:datanasc
        }).then(res=>{
          signOut(auth).then(()=>{
            navigation.popToTop();
          })
          .catch(error=>{
            console.log(error)
          })
        })
        .catch(error=>{
          console.log(error)
        })
      })
      .catch(error=>{
        console.log(error)
      })
    }else{
      setValid(true)
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Image source={require("../images/vaccine.png")} style={{ marginLeft: 5, marginRight: 5, width: 40, height: 40 }}></Image>
        <Text style={styles.text}>MyHealth</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.textInput}>Nome completo</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNome(text)}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.textInput}>Sexo</Text>
          <RadioButton
            options={sexo}
            select={select}
            onSelect={(option) => {
              setSelec(option.id);
            }}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.textInput}>Data nascimento</Text>
          <TextInputMask
           style={styles.input}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={datanasc}
            onChangeText={text => setDatanasc(text)}
          />
        </View>
        <View style={styles.body}>
            <Text style={styles.textInput}>E-mail</Text>
            <TextInput  
              style={styles.input}
              onChangeText={text=>setEmail(text)}
              />
        </View>
        <View style={styles.body}>
            <Text style={styles.textInput}>Senha</Text>
            <TextInput 
              secureTextEntry={true}
              style={styles.input}
              onChangeText={text=>setSenha(text)}
            />
        </View>
        <View style={styles.body}>
          <Text style={styles.textInput}>Repetir senha</Text>
          <TextInput 
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text=>setConfirmarSenha(text)}/>
          {
            valid ?
              <Text style={{color:'#FD7979',marginLeft:150,fontFamily: 'AveriaLibre-Light',fontSize: 17}}>Senha não confere!</Text>
            :
            null
          }
        </View>
        <View style={styles.bodyButton}>
        <TouchableOpacity style={styles.button} onPress={cadastrar}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    height:'100%',
    width: '90%',
    justifyContent: "center",
    marginTop:20
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
  text: {
    fontSize: 40,
    color: '#419ED7',
    fontFamily: 'AveriaLibre-Light'
  },
  body: {
    flexDirection: 'row',
    flexWrap: "wrap",
    alignItems: 'center',
    marginBottom: 10
  },
  bodyButton:{
    alignItems:'center',
    marginTop:50
  },
  input: {
    backgroundColor: '#FFF',
    width: '58.5%',
    height: 40,
    fontSize: 20,
    padding:5,
    color: '#3F92C5',
    fontFamily: 'AveriaLibre-Light'
  },
  textInput: {
    width: '38%',
    fontSize: 17,
    textAlign: 'right',
    marginRight: 5,
    color: '#FFFFFF',
    fontFamily: 'AveriaLibre-Light',
  },
  button:{
    width:'60%',
    backgroundColor:'#49B976',
    alignItems:'center'
  },
  textButton:{
    padding:12,
    color:'#FFF',
    fontSize: 17,
    fontFamily: 'AveriaLibre-Light',
  }
})

module.exports = CriarConta;