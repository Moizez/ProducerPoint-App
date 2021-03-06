import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, LogBox } from 'react-native'
import { ThemeProvider } from 'styled-components'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components';

import AuthProvider from './src/contexts/auth'
import RequestProvider from './src/contexts/request'
import Routes from './src/routes/'

LogBox.ignoreAllLogs()

const colors = {
	producer: '#2a9d8f',
	manager: '#00b4d8',
	main: '#292b2c'
}

const App = () => {
	return (
		<ThemeProvider theme={colors}>
			<ApplicationProvider {...eva} theme={eva.light}>
				<NavigationContainer>
					<AuthProvider>
						<RequestProvider>
							<StatusBar backgroundColor='#292b2c' barStyle='light-content' />
							<Routes />
						</RequestProvider>
					</AuthProvider>
				</NavigationContainer>
			</ApplicationProvider>
		</ThemeProvider>
	);
}

export default App