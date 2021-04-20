import React, { useState, useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '../../contexts/auth'

import {
	Container, Logo, Title, InputTitle, InputBox, InputItemBox, IconBox,
	Button, TextButton, Link, TextLink, Text, Input
} from './styles'

const SignIn = () => {

	const { signIn, loadingAuth } = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigation = useNavigation()
	const [eye, setEye] = useState(true)


	const handleSignIn = async () => {
		await signIn(email.trim(), password.trim())
	}

	return (
		<Container>
			<Logo source={require('../../assets/images/logo.png')} />
			<Title>producer point</Title>

			<InputTitle>Realize sua autenticação</InputTitle>
			<InputBox>
				<InputItemBox>
					{email != 0 && <Text style={{ marginBottom: email && -10 }}>E-mail:</Text>}
					<Input
						focusable={true}
						placeholder='E-mail'
						autoCorrect={false}
						autoCapitalize='none'
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
				</InputItemBox>
				<IconBox disabled={true}>
					<Icon name='email' size={28} color='#000' />
				</IconBox>
			</InputBox>

			<InputBox>
				<InputItemBox>
					{password != 0 && <Text style={{ marginBottom: password && -10 }}>Senha:</Text>}
					<Input
						placeholder='Senha'
						autoCorrect={false}
						autoCapitalize='none'
						value={password}
						secureTextEntry={eye ? true : false}
						onChangeText={(text) => setPassword(text)}
					/>
				</InputItemBox>
				{password ?
					<IconBox onPress={() => setEye(!eye)} activeOpacity={1}>
						<Icon name={eye ? 'eye' : 'eye-off'} size={28} color='#000' />
					</IconBox>
					:
					<IconBox disabled={true}>
						<Icon name='lock' size={28} color='#000' />
					</IconBox>
				}
			</InputBox>

			<Button onPress={handleSignIn}>
				{
					loadingAuth ? (
						<ActivityIndicator size={20} color="#FFF" />
					) : (
						<TextButton>Entrar</TextButton>
					)
				}
			</Button>

			<Link onPress={() => navigation.navigate('ForgotPassword')}>
				<TextLink>Esqueceu sua senha? </TextLink>
			</Link>

		</Container >
	);
}

export default SignIn