import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { AuthContext } from '../contexts/auth'

//Roles import
import Producer from '../roles/Producer'
import Manager from '../roles/Manager'

// Stacks import
import ProfileDetails from '../pages/ProfileDetails'


const Stack = createStackNavigator()

const AppRoutes = () => {

    const { user } = useContext(AuthContext)

    if (user.role === 0) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Manager' component={Manager} />
                <Stack.Screen name='ProfileDetails' component={ProfileDetails} />
            </Stack.Navigator>
        )

    } else {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Producer' component={Producer} />
                <Stack.Screen name='ProfileDetails' component={ProfileDetails} />
            </Stack.Navigator>
        )
    }
}

export default AppRoutes
