import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Animated, StyleSheet, Keyboard, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AuthContext } from '../../contexts/auth'
import Input from '../../components/Input'

import {
	Container, Logo, InputBox, Button, TextButton, Link, TextLink, TextLinkBold
} from './styles'

const SignIn = () => {

	const { signIn, loadingAuth } = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigation = useNavigation()


	const handleSignIn = async () => {
		await signIn(email.trim(), password.trim())
	}

	return (
		<Container>
			<Logo source={require('../../assets/images/mkLogo.png')} />

			<InputBox>
				<Input
					placeholder='Digite seu e-mail'
					value={email}
					onChangeText={text => setEmail(text)}
				/>
				<Input
					placeholder='Digite sua senha'
					autoCorrect={false}
					autoCapitalize='none'
					value={password}
					onChangeText={text => setPassword(text)}
					password={true}

				/>

				<Button onPress={handleSignIn}>
					{loadingAuth ?
						<ActivityIndicator size={20} color="#FFF" /> :
						<TextButton>Entrar</TextButton>
					}
				</Button>

			</InputBox>

			<Link onPress={() => { }}>
				<TextLink>Ainda não possui uma conta?</TextLink>
				<TextLinkBold>Cadastre-se!</TextLinkBold>
			</Link>

		</Container >
	);
}

export default SignIn