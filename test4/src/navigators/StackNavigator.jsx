import React,{} from 'react';
import { StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../navigators/TabNavigator';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
      
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen 
        name='Tab' 
        component={TabNavigator} 
        options={{animation:'slide_from_bottom'}}>
        </Stack.Screen>
         
        {/* <Stack.Screen 
        name='Details' 
        component={DetailsScreen} 
        options={{animation:'slide_from_bottom'}}>
        </Stack.Screen>
        
        <Stack.Screen 
        name='Payment' 
        component={PaymentScreen} 
        options={{animation:'slide_from_bottom'}}>
        </Stack.Screen> */}      
      </Stack.Navigator>

  )
}

export default StackNavigator

const styles = StyleSheet.create({})