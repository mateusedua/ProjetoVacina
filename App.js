import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from "./src/pages/Home";
import CriarConta from "./src/pages/CriarConta";
import RecuperarSenha from "./src/pages/RecuperarSenha";
import Inicial from './src/pages/Inicial';
import ProximasVacinas from './src/pages/ProximasVacinas';
import AltCadVacina from './src/pages/AltCadVacina';
import { StyleSheet, View, Text,Image, TouchableOpacity } from 'react-native';
import {signOut,onAuthStateChanged} from 'firebase/auth';
import {auth,db} from './src/config/firebase'
import { doc, getDoc,collection} from "firebase/firestore"
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {


  const [nome,setNome] = useState('');

  const logout = () =>{
    signOut(auth).then(()=>{
      props.navigation.popToTop();
    })
    .catch(error=>{
      console.log(error)
    })
  }

  const getUser = () =>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
          const uid = user.uid;
          getDoc(doc(db,"users",uid)).then(res=>{
             setNome(res.data().nome)
          })
      }
  })  
  }

  useEffect(()=>{
    getUser()
  },[])

  return (
    <View style={styles.drawer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.texHeader}>{nome}</Text>
        </View>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.sair} onPress={logout}>
          <Image style={{width:30,height:30,marginRight:5,marginLeft:20}} source={require("./src/images/iconSair.png")}></Image>
          <Text style={styles.textSair}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Inicial"
      drawerContent={(props) => <CustomDrawerContent{...props} />}
      screenOptions={{
        drawerActiveBackgroundColor:'none',
        drawerLabelStyle:{
          marginLeft:-25,
          fontFamily:'AveriaLibre-Light',
          fontSize:15,
          color:'#419ED7'
        }
      }}
    >
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: () =>(
            <Image style={{width:30,height:30}} source={require("./src/images/vaccine.png")}></Image>
          )
        }}
        name="Minhas vacinas" component={Inicial} />
        <Drawer.Screen 
          options={{
            headerShown:false,
            drawerIcon: () =>(
              <Image style={{width:30,height:30}} source={require("./src/images/iconCalendar.png")}></Image>
            )
          }}
          name="Próximas vacinas"
          component={ProximasVacinas}
        />
         <Drawer.Screen
          name='AltCadVacina'
          component={AltCadVacina}
          options={{
            headerShown: false,
            drawerItemStyle:{height:0}
          }}
        />
    </Drawer.Navigator>
  );
}

const App = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="CriarConta" component={CriarConta}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="DrawerRoutes"
          component={DrawerRoutes}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#ADD5D0',
    flex: 1,
    alignItems: 'center'
  },
  header: {
    height:65,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:2,
    borderColor:'#419ED7'
  },
  container:{
    flex:1,
    width:'80%'
  },
  texHeader:{
    color:'#419ED7',
    fontFamily:'AveriaLibre-Light',
    fontSize:20
  },
  sair:{
    flexDirection:'row',
    alignItems:'center'
  },
  textSair:{
    fontSize:15,
    color:'#419ED7',
    fontFamily:'AveriaLibre-Light',
  }
})

export default App;