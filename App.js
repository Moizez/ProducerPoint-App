import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components'

import AuthProvider from './src/contexts/auth'

console.disableYellowBox = true

const colors = {
	producer: '#2a9d8f',
	manager: '#00b4d8',
	main: '#292b2c'
}

const App = () => {
	return (
		<ThemeProvider theme={colors}>
			<NavigationContainer>
				<AuthProvider>
					<StatusBar backgroundColor='#292b2c' barStyle='light-content' />
				</AuthProvider>
			</NavigationContainer>
		</ThemeProvider>
	);
}

export default App