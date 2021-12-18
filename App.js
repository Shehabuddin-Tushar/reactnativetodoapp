import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { Alert,FlatList,StyleSheet, Text, View,Image,TouchableOpacity,ScrollView,SafeAreaView,Button,TextInput } from 'react-native';
import { Link, NativeRouter,Routes,Route } from 'react-router-native';
import Doctor from './components/Doctor';
import Home from './components/Home';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
const COLORS={primary:"#1f1453",white:"#fff"} 
export default function App() {
        const [mytext,setMytext]=useState('');
        const[todos,setTodos]=useState([
          
        ]);
        useEffect(()=>{
          getDatafromuserdevice();
        },[]);
        useEffect(()=>{
          storeDatainuserdevice(todos);    
        },[todos])
        const additem=()=>{
          if(mytext==""){
             Alert.alert("Error","please input todo")
          }else{
            const newitem={
              id:Math.random(),
              task:mytext,
              completed:false,
            };
            setTodos([...todos,newitem]);
            setMytext("");
          }
          
        }
        const doneitem=(id)=>{
          const newTodos=todos.map(item=>{
            if(item.id===id){
              return{...item,completed:true}
            }
            return item
          })
          setTodos(newTodos)
        }

        const deleteitem=(id)=>{
          console.log(id);
          const newTodos=todos.filter(item=>item.id!=id);
          setTodos(newTodos);
        }

        const allitemdelete=()=>{
          Alert.alert("Confirm","clear todos?",[
            {
              text:"yes",
              onPress:()=>setTodos([])
            },
            {
              text:"no"
            }
          ])
        }
        const ListItem=({todo})=>{
          return(
              <View style={styles.listItem}>
                  <View style={{flex:1}}>
                     <Text
                     style={{
                       textDecorationLine:todo?.completed?"line-through":"none",
                       fontWeight:"bold",fontSize:15,color:COLORS.primary}} 
                     >{todo?.task}</Text>
                  </View>
                  {!todo?.completed &&(<TouchableOpacity style={styles.actionIcon} onPress={()=>doneitem(todo?.id)}>
                    <Icon name="done" size={20} color={COLORS.white}/>
                  </TouchableOpacity>)}
                  <TouchableOpacity style={[styles.actionIcon,{backgroundColor:"red"}]} onPress={()=>deleteitem(todo?.id)}>
                    <Icon name="delete" size={20} color={COLORS.white}/>
                  </TouchableOpacity>
              </View>
          )
        }

        const storeDatainuserdevice = async (todos) => {
          try {
            const stringifyTodos=JSON.stringify(todos)
            await AsyncStorage.setItem('todos', stringifyTodos)
          } catch (e) {
            console.log(e)
            // saving error
          }
        }

        
const getDatafromuserdevice = async () => {
  try {
    const todos = await AsyncStorage.getItem('todos')
    if(todos !== null) {
      // value previously stored
      setTodos(JSON.parse(todos))
    }
  } catch(e) {
    // error reading value
    console.log(e)
  }
}


  return (
    <SafeAreaView style={{flex:1,background:COLORS.white}}>
       <View style={styles.header}>
          <Text style={{fontWeight:"bold",fontSize:20,color:COLORS.primary}}>Bazar Sodai</Text>
           <Icon name="delete" size={25} color="red" onPress={allitemdelete}/>
       </View>
       <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding:20,paddingBottom:100}}
        data={todos}
        renderItem={({item})=><ListItem todo={item}/>}
     
       />
       <View style={styles.footer}>
           <View style={styles.inputContainer}>
              <TextInput placeholder="Add todo" value={mytext} onChangeText={(text)=>setMytext(text)}/>
           </View>
           <TouchableOpacity onPress={additem}>
               <View style={styles.iconContainer}>
                  <Icon size={30} name="add" color={COLORS.white}/>
               </View>
           </TouchableOpacity>
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionIcon:{
    height:25,
    width:25,
    backgroundColor:"green",
    justifyContent:"center",
    alignItems:"center",
    marginLeft:5,
    borderRadius:3
  },
  listItem:{
    padding:20,
    backgroundColor:COLORS.white,
    flexDirection:"row",
    elevation:12,
    borderRadius:7,
    marginVertical:10
  },
  header: {
    paddingTop:50,
    padding:20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer:{
    position:"absolute",
    bottom:0,
    color:COLORS.white,
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:20
  },
  inputContainer:{
    backgroundColor:COLORS.white,
    elevation:40,
    flex:1,
    height:50,
    marginVertical:20,
    borderRadius:30,
    paddingHorizontal:20,
    paddingTop:12
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor:"green",
    borderRadius:25,
    elevation:40,
    justifyContent:"center",
    alignItems:"center",
    
  
  }

});
