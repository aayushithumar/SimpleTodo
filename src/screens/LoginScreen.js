/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React,{useEffect, useState} from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
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

const LoginScreen = () => {
  const navigation = useNavigation();

  const [loginState, setState] = useState({
    authDetails : {},
    email: '',
    password:''
  })

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      console.log('userDAta >> '+JSON.stringify(user))
      setState({...loginState, authDetails: user})
        try{
            navigation.replace('Home',{userId: user.id})
        }catch(e){
          console.log("error in user data >> "+JSON.stringify(e))
        }
      

    } catch (error) {
      console.log("error >> "+JSON.stringify(error))
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };

  const SignIn = async () => {
    if(loginState.email == ''){
      alert('Email is required')
    }else if(loginState.password == ''){
      alert('Password is required')
    }else if(loginState.password.length<6){
      alert('Invalid password')
    }else{
      await auth().signInWithEmailAndPassword(loginState.email, loginState.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }
  
        if (error.code === 'auth/invalid-email') {
          alert('The email address is invalid!');
        }
        if (error.code === 'auth/weak-password') {
          alert('The password is invalid!');
        }
  
        console.error(error);
      });
    }
    
  };

  return (
    <View style={styles.bg_main}>
      <View style={styles.bg_card}>
    
        <Text style={styles.txt_heading}>Login</Text>

        <TextInput keyboardType="email-address" 
          style={styles.text_input}
          onChangeText={(text)=>{
            setState({...loginState,email:text})
          }}
          />
        <TextInput keyboardType="default" 
          secureTextEntry={true} 
          style={styles.text_input}
          onChangeText={(text)=>{
            setState({...loginState,password:text})
          }}
          />
        
        <TouchableOpacity onPress={SignIn} style={styles.btn_solid}>
            <Text style={styles.btn_text}>LOGIN</Text>
        </TouchableOpacity>

        <View style={{marginTop:15, flexDirection:'row', padding:10,justifyContent:'space-evenly'}}>

          <TouchableOpacity style={{ justifyContent:'center'}} onPress={()=>{
            navigation.navigate('Register')
          }}><Text style={styles.btn_register}>SIGN UP</Text></TouchableOpacity>

      
          <TouchableOpacity onPress={googleSignIn} style={{height:50,width:50,justifyContent:'center'}}>
            <Image source={Images.google_logo} style={{height:40,width:40}}></Image>
          </TouchableOpacity>
          
        </View>

       
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
  btn_register: {alignSelf:'center',textAlign:'center', fontSize:20, color:colors.bg_color_7, fontWeight:'bold'}
});

export default LoginScreen;
