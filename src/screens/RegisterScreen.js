/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React,{useState} from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Images from '../assets/images';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import auth from '@react-native-firebase/auth';
import { colors } from '../assets/utils/colors';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [loginState, setState] = useState({
    authDetails : {},
    email: '',
    password:'',
    new_password:''
  })

  const register = async() =>{
    if(loginState.email == ''){
      alert('Email is required')
    }else if(loginState.password == ''){
      alert('Password is required')
    }else if(loginState.password.length<6){
      alert('Invalid password')
    }else{
      await auth().createUserWithEmailAndPassword(loginState.email, loginState.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('The email address is invalid!');
        }
        if (error.code === 'auth/weak-password') {
          console.log('The password is invalid!');
        }

        console.error(error);
      });
    }
  }

  return (
    <View style={styles.bg_main}>
      <View style={styles.bg_card}>
    
        <Text style={styles.txt_heading}>Sign Up</Text>

        <TextInput keyboardType="email-address" onChangeText={(text)=>{
          setState({...loginState, email: text})
        }}
        style={styles.text_input} />
        <TextInput keyboardType="default" onChangeText={(text)=>{
          setState({...loginState, password: text})
        }}
         secureTextEntry={true} style={styles.text_input} />
        <TextInput keyboardType="default" onChangeText={(text)=>{
          setState({...loginState, new_password: text})
        }}
        secureTextEntry={true} style={styles.text_input} />

        <TouchableOpacity onPress={register} style={styles.btn_solid}>
            <Text style={{color:'white',textAlign:'center',alignSelf:'center'}}>SIGN UP</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  bg_main: {height:'100%', width:'100%', backgroundColor:colors.bg_color_2, justifyContent:'center'},
  bg_card:{backgroundColor:'white',elevation:5,borderRadius:15,padding:35,margin:15},
  txt_heading: {color:colors.primary_color,fontSize:26,alignSelf:'center',fontWeight:'bold',marginBottom:25},
  text_input: {height:45, borderWidth:1, borderColor: colors.bg_color_5, marginBottom:15},
  btn_solid: {height:45,backgroundColor:colors.bg_color_8,justifyContent:'center'
  , marginTop:15},
  btn_text: {color:'white',textAlign:'center',alignSelf:'center'},
});

export default RegisterScreen;
