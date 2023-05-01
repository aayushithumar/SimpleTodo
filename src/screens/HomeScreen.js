/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToDoList } from '../redux/slice/todoItemSlice';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firestore from '@react-native-firebase/firestore';
import { colors } from '../assets/utils/colors';

function HomeScreen({route, navigation}){

    const { userId } = route.params;

    const dispatch = useDispatch()

    const todo = useSelector((state) => state.todoItems);

    const [state,setState]=useState({
        todoList: [],
        toDoText:''
    })

    useEffect(()=>{
        fetchList()
    },[])
    
    useEffect(()=>{
        console.log("todo updated >> "+todo.todoArray)
    },[todo])

    function fetchList(){
        firestore().collection('todos').doc(userId).onSnapshot(documentSnapshot => {
            if(documentSnapshot.exists && documentSnapshot!=undefined && documentSnapshot!=null){
                if(documentSnapshot.data()!=undefined && documentSnapshot.data()!=null){
                    console.log("documentSnapshot.data() >> "+JSON.stringify(documentSnapshot.data()))
                    let unchecked = documentSnapshot.data().todosArray
                    let checked =  documentSnapshot.data().todosDone
                    let addData = []
                    
                    if(unchecked.length > 0 && checked.length > 0){
                        addData = unchecked.concat(checked)
                    } else if(unchecked.length > 0 && checked.length == 0){
                        addData = unchecked
                    } else if(checked.length > 0 && unchecked.length == 0){
                        addData = checked
                    }
                    
                    setState({...state,todoList: addData})
                    addToDoList(addData)
                }
            }else{
                firestore().collection('todos').doc(userId).set({todosArray:[],todosDone:[]}).then(()=>{
                    fetchList()
                })
            }
        });
       
    }

    function addToFirebase(){
        firestore().collection('todos').doc(userId).update(
            { 
                todosArray: firestore.FieldValue.arrayUnion({'description':state.toDoText,'ischecked': false, 'id': new Date().getUTCDate()})
            }
        )
    }

    async function handleSubmitText(){
        if(state.toDoText){
            addToFirebase()
        }
    }

    async function editToDoItem(item,isChecked){
        console.log("editing >> "+JSON.stringify(item)+"   "+isChecked)
        if(isChecked){
            firestore().collection('todos').doc(userId).update(
                { 
                    todosArray: firestore.FieldValue.arrayRemove(item)
                }
            )
            let old = item
            old.ischecked = isChecked
            firestore().collection('todos').doc(userId).update(
                { 
                    todosDone: firestore.FieldValue.arrayUnion(old)
                }
            ).then(()=>{
                //fetchList()
            })
        }else if(!isChecked){
            firestore().collection('todos').doc(userId).update(
                { 
                    todosDone: firestore.FieldValue.arrayRemove(item)
                }
            )
            let old = item
            old.ischecked = isChecked
            firestore().collection('todos').doc(userId).update(
                { 
                    todosArray: firestore.FieldValue.arrayUnion(old)
                }
            ).then(()=>{
                //fetchList()
            })
        }
        
    }

    
    return (
        <SafeAreaView style={{flex:1}}>
        <View style={{ height:'100%',padding:10}}>
            <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:20,alignSelf:'center'}}>Create your To-Do</Text>
            </View>
            <View>
                <TextInput value={state.toDoText} style={{borderBottomWidth:1,minHeight:45}} 
                accessibilityHint='Add your item' onChangeText={(text)=>{
                    setState({...state,toDoText:text})
                }} onSubmitEditing={()=>{
                    handleSubmitText()
                }} />
            </View>
            <FlatList keyExtractor={(item,index)=> item.description}
            style={{marginTop:30}}
            extraData={state.todoList}
             data={state.todoList} renderItem={({item})=>{
                return (
                    <View style={{marginBottom: 10, marginTop:10, elevation:4, borderRadius:5, 
                        backgroundColor:'white',padding:10,borderColor:'gray',borderWidth:0.5}}>
                        <BouncyCheckbox
                            size={25}
                            fillColor={colors.primary_color}
                            unfillColor="white"
                            text={item.description}
                            style={{marginBottom: 10, marginTop:10}}
                            iconStyle={{ borderColor: "red" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            isChecked={item.ischecked}
                            onPress={(isChecked) => {
                                console.log("ischeked >> "+isChecked)
                                editToDoItem(item,isChecked)
                            }}
                            />
                    </View>
                    )
            }}></FlatList>
        </View>
        </SafeAreaView>
    );
}

export default HomeScreen;
