/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoItem } from '../redux/slice/todoItemSlice';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firestore from '@react-native-firebase/firestore';
import { colors } from '../assets/utils/colors';

function HomeScreen({route, navigation}){

    const { userId } = route.params;

    const dispatch = useDispatch()

    const todo = useSelector((state) => state.todoItems);

    const [stateLater,setState]=useState({
        todoList: [],
        toDoText:''
    })
    
    useEffect(()=>{
        console.log("todo updated >> "+todo.todoArray)
        setState({...stateLater,todoList : todo.todoArray})
    },[todo])

    async function handleSubmitText(){
        if(stateLater.toDoText){

            dispatch(addTodoItem({id:new Date().get,title:stateLater.toDoText,userId: userId}))
            setState({...stateLater,toDoText:''})


            // TODO:Progress
            // let firestoreInstance = firestore().collection('todos').doc(userId.toString());
            // await firestoreInstance.get().then(async (docSnapshot)  =>{

            //     if(docSnapshot.exists){
            //         console.log("doc snapshot >> "+docSnapshot.data.length)
            //         if(docSnapshot.data().items.length>0){
            //             // docSnapshot.forEach(snap=>{
            //             //     //if I console.log(snap.data()) my data is correct 
            //             //     snap.data().items = [...snap.data().items,[{title:stateLater.toDoText,checked:false}]];
            //             // })
            //             docSnapshot.ref.update({
            //                 items: firestoreInstance.FieldValue.arrayUnion({title:stateLater.toDoText,checked:false})
            //             })
            //         }else{
            //             docSnapshot.ref.set({items:[{title:stateLater.toDoText,checked:false}]})
            //         }
            //     }else{
            //         await firestoreInstance.set({items:[{title:stateLater.toDoText,checked:false}]})
            //     }
            //   })
            
        }
    }

    
    return (
        <View style={{padding:20}}>
            <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:20,alignSelf:'center'}}>Create your To-Do</Text>
            </View>
            <View>
                <TextInput value={stateLater.toDoText} style={{borderBottomWidth:1,minHeight:45}} 
                accessibilityHint='Add your item' onChangeText={(text)=>{
                    setState({...stateLater,toDoText:text})
                }} onSubmitEditing={()=>{
                    handleSubmitText()
                }} />
            </View>

            <FlatList keyExtractor={(item,index)=> index.toString()} style={{marginTop:50,}}
             data={stateLater.todoList} renderItem={({item})=>{
                return (
                    <View>
                        <BouncyCheckbox
                            size={25}
                            fillColor={colors.primary_color}
                            unfillColor="white"
                            text={item.title}
                            style={{marginBottom: 10}}
                            iconStyle={{ borderColor: "red" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            isChecked={item.isCompleted}
                            onPress={(isChecked) => {
                                console.log("ischeked >> "+isChecked)
                            }}
                            />
                    </View>
                    )
            }}></FlatList>
        </View>
    );
}

export default HomeScreen;