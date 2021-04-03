import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Input from '../../components/Input'

import {
    Container, InputContainer, Titulo, InputBox, CloseButton,
    Button, RecoverText, Text
} from './styles';

const ForgotPassword = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [doc, setDoc] = useState('');

    return (
        <Container behavior='padding'>
            <CloseButton onPress={() => navigation.goBack()}>
                <Icon name='chevron-down' color='#000' size={40} />
            </CloseButton>
            <InputContainer>
                <Titulo>Recuperar senha</Titulo>
                <InputBox>
                    <Input
                        placeholder="E-mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </InputBox>

                <InputBox>
                    <Input
                        placeholder="Celular"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />
                </InputBox>

                <InputBox>
                    <Input
                        placeholder="CPF/CNPJ"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        value={doc}
                        onChangeText={(text) => setDoc(text)}
                    />
                </InputBox>

                <Button>
                    <RecoverText>Recuperar</RecoverText>
                </Button>

            </InputContainer>
        </Container>
    );
}

export default ForgotPassword