/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import Images from '../assets/images';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { colors } from '../assets/utils/colors';

function SplashScreen(){
    const navigation = useNavigation();

    useEffect(()=>{
            
        setTimeout(()=>{
            GoogleSignin.getCurrentUser().then((userDetails)=>{
                console.log(JSON.stringify(userDetails))
                if(!userDetails==undefined && !userDetails==null){
                    //navigation.replace("Home",{userId:userDetails.user.id})
                }else{
                    navigation.replace("Login")
                }
              }).catch((error)=>{
                console.log("error >> "+JSON.stringify(error))
                navigation.replace("Login")

              })
        },5000)
    },[]);
    
    return (
        <View style={{flex:1, backgroundColor:colors.beige, justifyContent:'center'}}>
            <Text style={{fontSize:40, color:colors.sage, alignSelf:'center', fontWeight:'bold'}}>To-Do</Text>
        </View>
    );
}

export default SplashScreen;
