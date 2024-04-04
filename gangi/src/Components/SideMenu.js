import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import fb from "../Assets/Social/fb.jpeg";
import x from "../Assets/Social/x.jpeg"
import inra from "../Assets/Social/inta.jpeg"
import indin from "../Assets/Social/in.jpeg"
import adminphoto from '../Assets/admin.png'
import { SafeAreaView } from 'react-native-safe-area-context';

const SideMenu = (props) => {
  return (
    <SafeAreaView style={styles.container}>
    <View >
    <View style={styles.profile}>
    <Image source={adminphoto} style={styles.adminImage}/>
    <Text style={{fontSize:20,fontWeight:"500",alignSelf:"center"}}>Deepak Yadav</Text>


    <View style={styles.socialicons}>
    <Image source={fb} style={styles.scons} />
    <Image source={x}  style={styles.scons} />
    <Image source={inra}  style={styles.scons}/>
    <Image source={indin} style={styles.scons} />

    </View>

    </View>
    </View>
    <DrawerContentScrollView {...props}>
    <DrawerItemList {...props}>
    
    </DrawerItemList>
    </DrawerContentScrollView>
    </SafeAreaView>
  )
}

export default SideMenu

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    profile:{
    borderWidth:1,
    backgroundColor:"lightblue",
    borderRadius:10
    },
    adminImage:{
        alignItems:"center",
        borderRadius:60,
        borderWidth:1,
        borderColor:"black",
        marginTop:10,
        padding:10,
        alignSelf:"center"
    },
    socialicons:{
        flexDirection:"row",
        justifyContent:"center",
        gap:10,
        marginTop:10,
        marginBottom:5
    },
    scons:{
        width:20,
        height:20
    }
})