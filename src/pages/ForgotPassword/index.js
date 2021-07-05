import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Input from '../../components/Paper/Input'
import Button from '../../components/Paper/Button'
import validate from '../../helpers/validations'

import {
    Container, InputContainer, InputTitle, InputBox, CloseButton,
    RecoverButton, RecoverText, Text, ErrorBox, ErrorText
} from './styles';

const ForgotPassword = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [doc, setDoc] = useState('')

    const validationSchema = yup.object().shape({
        email: yup.string().email('Digite um e-mail válido!').required('O e-mail é obrigatório!'),
        phone: yup.string().required('O telefone é obrigatório!'),
        cpf: yup.string()
            .required('O CPF é obrigatório!')
            .test('cpf', 'CPF inválido!', async value => await validate.cpf(value)),
    })

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await handleSignIn(values.email.trim(), values.password.trim())
        }
    })

    return (
        <Container behavior='padding'>

            <CloseButton onPress={() => navigation.goBack()}>
                <Icon name='chevron-down' color='#072' size={40} />
            </CloseButton>

            <InputContainer>
                <InputTitle>Recuperar senha</InputTitle>

                <InputBox>
                    <Input
                        label='E-mail*'
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        value={formik.values.email}
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        icon='email'
                        error={formik.touched.email && formik.errors.email}
                    />
                    <ErrorBox>
                        {formik.touched.email && formik.errors.email &&
                            <ErrorText>{formik.errors.email}</ErrorText>
                        }
                    </ErrorBox>
                </InputBox>

                <InputBox>
                    <Input
                        label='Telefone*'
                        keyboardType='phone-pad'
                        value={formik.values.phone}
                        onChangeText={async (text) => formik.setFieldValue('phone', await validate.phoneMask(text))}
                        onBlur={formik.handleBlur('phone')}
                        error={formik.touched.phone && formik.errors.phone}
                    />
                    <ErrorBox>
                        {formik.touched.phone && formik.errors.phone &&
                            <ErrorText>{formik.errors.phone}</ErrorText>
                        }
                    </ErrorBox>
                </InputBox>

                <InputBox>
                    <Input
                        label='CPF*'
                        keyboardType='phone-pad'
                        value={formik.values.cpf}
                        onChangeText={async (text) => formik.setFieldValue('cpf', await validate.cpfMask(text))}
                        onBlur={formik.handleBlur('cpf')}
                        error={formik.touched.cpf && formik.errors.cpf}
                    />
                    <ErrorBox>
                        {formik.touched.cpf && formik.errors.cpf &&
                            <ErrorText>{formik.errors.cpf}</ErrorText>
                        }
                    </ErrorBox>
                </InputBox>

                <Button
                    onPress={formik.handleSubmit}
                >
                    recuperar
                </Button>

            </InputContainer>
        </Container>
    );
}

export default ForgotPassword