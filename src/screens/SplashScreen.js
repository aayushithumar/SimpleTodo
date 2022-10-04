/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import Images from '../assets/images';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function SplashScreen(){
    const navigation = useNavigation();

    useEffect(()=>{
            
        setTimeout(()=>{
            GoogleSignin.getCurrentUser().then((userDetails)=>{
                console.log(JSON.stringify(userDetails))
                navigation.replace("Home",{userId:userDetails.user.id})

              }).catch((error)=>{
                console.log("error >> "+JSON.stringify(error))
                navigation.replace("Login")

              })
        },5000)
    },[]);
    
    return (
        <View style={{flex:1}}>
            <Image style={{height:'100%',width:'100%'}} source={Images.splash}></Image>
        </View>
    );
}

export default SplashScreen;