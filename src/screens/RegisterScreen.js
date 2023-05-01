/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React,{useState} from 'react';
import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Images from '../assets/images';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { colors } from '../assets/utils/colors';
import { TextInput } from 'react-native-paper';

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

        <TextInput
          keyboardType="email-address"
          style={styles.text_input}
          label="Email"
          value={loginState.email}
          onChangeText={text => setState({...loginState,email:text})}
          outlineColor={colors.lighter_green}
          activeOutlineColor={colors.light_green}
          underlineColor={colors.lighter_green}
          activeUnderlineColor={colors.light_green}
        />

        <TextInput
          keyboardType="default"
          style={styles.text_input}
          label="Password"
          value={loginState.password}
          onChangeText={text => setState({...loginState,password:text})}
          outlineColor={colors.lighter_green}
          activeOutlineColor={colors.light_green}
          underlineColor={colors.lighter_green}
          activeUnderlineColor={colors.light_green}
          secureTextEntry={true}
        />
        <TextInput
          keyboardType="default"
          style={styles.text_input}
          label="Password"
          value={loginState.new_password}
          onChangeText={text => setState({...loginState,new_password:text})}
          outlineColor={colors.lighter_green}
          activeOutlineColor={colors.light_green}
          underlineColor={colors.lighter_green}
          activeUnderlineColor={colors.light_green}
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={register} style={styles.btn_solid}>
            <Text style={{color:'white',textAlign:'center',alignSelf:'center'}}>SIGN UP</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  bg_main: {height:'100%', width:'100%', backgroundColor:colors.beige, justifyContent:'center'},
  bg_card:{backgroundColor:'white',elevation:5,borderRadius:15,padding:35,margin:15},
  txt_heading: {color:colors.light_green,fontSize:26,alignSelf:'center',fontWeight:'bold',marginBottom:25},
  text_input: {height:45, borderWidth:1, borderColor: colors.bg_color_5, marginBottom:15},
  btn_solid: {height:45,backgroundColor:colors.light_green,justifyContent:'center'
  , marginTop:15},
  btn_text: {color:'white',textAlign:'center',alignSelf:'center'},
});

export default RegisterScreen;
