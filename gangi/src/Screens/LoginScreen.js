import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const LoginScreen = () => {
  const navigation= useNavigation()
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <Text style={{fontSize:20,alignSelf:"center"}}>LOGIN</Text>
    <TextInput style={styles.input}/>
    <TextInput style={styles.input}/>
    <Button title='LOGIN' style={{marginTop:5}} onPress={()=>navigation.navigate=""}/>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    input:{
      width:"98%",
      borderWidth:1,
      alignSelf:"center",
      marginTop:5

    }
})