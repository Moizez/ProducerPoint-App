import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker'
import RNPickerSelect from 'react-native-picker-select';
import { Formik } from 'formik'
import * as yup from 'yup'

import { RequestContext } from '../../../contexts/request'
import { activities, periods, products } from './enums'

import {
    Container, Header, Title, PageBox, FormBox, FormContainer, FormTitle, InputBox,
    HalfInputBox, Input, Text, InputsBox, ErrorBox, ErrorText, IconBox,
    ButtonBox, ResetForm, SaveButton, TextButton, Divider
} from './styles'

const formSchema = yup.object({
    name: yup.string().required('O nome do tanque é obrigatório!'),
    phone: yup.string().required('O telefone é obrigatório!'),
    cpf: yup.string().required('O cpf é obrigatório!'),
})

const ProducerForm = () => {

    const { producers, loadProducers } = useContext(RequestContext)

    const [show, setShow] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [activity, setActivity] = useState('Agricultor')
    const [period, setPeriod] = useState('Semanal')
    const [product, setProduct] = useState('Feijão')

    return (
        <Container>
            <Header>
                <Title>Cadastro de Produtor</Title>
            </Header>

            <PageBox>
                <FormContainer>
                    <Formik
                        initialValues={{
                            name: '',
                            nickname: '',
                            phone: '',
                            cpf: '',
                            email: '',
                            address: {
                                zipCode: '',
                                city: '',
                                uf: '',
                                district: '',
                                street: '',
                                houseNumber: '',
                                reference: '',
                            },
                            farmingActivity: {
                                activityName: '',
                                productName: '',
                                period: '',
                                averageCash: 0
                            }
                        }}
                        validationSchema={null}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {(props) => (
                            <FormBox>
                                <FormTitle style={{ marginTop: 10 }}>Dados Pessoais</FormTitle>
                                <Divider />

                                <InputBox>
                                    {props.values.name != '' && <Text>Nome:</Text>}
                                    <Input
                                        placeholder='Nome do produtor'
                                        onChangeText={props.handleChange('name')}
                                        value={props.values.name}
                                        onBlur={props.handleBlur('name')}
                                    />
                                </InputBox>
                                {props.touched.name && props.errors.name &&
                                    <ErrorText>{props.errors.name}</ErrorText>
                                }

                                <InputBox>
                                    {props.values.nickname != '' && <Text>Apelido:</Text>}
                                    <Input
                                        placeholder='Apelido do produtor'
                                        onChangeText={props.handleChange('nickname')}
                                        value={props.values.nickname}
                                        onBlur={props.handleBlur('nickname')}
                                    />
                                </InputBox>

                                <InputsBox>
                                    <HalfInputBox>
                                        {props.values.phone != '' && <Text>Telefone:</Text>}
                                        <Input
                                            placeholder='Telefone'
                                            onChangeText={props.handleChange('phone')}
                                            keyboardType='phone-pad'
                                            value={props.values.phone}
                                            onBlur={props.handleBlur('phone')}
                                        />
                                    </HalfInputBox>

                                    <HalfInputBox>
                                        {props.values.cpf != '' && <Text>CPF:</Text>}
                                        <Input
                                            placeholder='CPF'
                                            onChangeText={props.handleChange('cpf')}
                                            keyboardType='phone-pad'
                                            value={props.values.cpf}
                                            onBlur={props.handleBlur('cpf')}
                                        />
                                    </HalfInputBox>
                                </InputsBox>
                                <ErrorBox>
                                    {props.touched.phone && props.errors.phone &&
                                        <ErrorText style={{ width: '48%' }}>{props.errors.phone}</ErrorText>
                                    }
                                    {props.touched.cpf && props.errors.cpf &&
                                        <ErrorText style={{ width: '48%', marginLeft: 8 }}>{props.errors.cpf}</ErrorText>
                                    }
                                </ErrorBox>

                                <InputBox>
                                    {props.values.email != '' && <Text>E-mail:</Text>}
                                    <Input
                                        placeholder='E-mail'
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                        onBlur={props.handleBlur('email')}
                                    />
                                </InputBox>

                                <FormTitle>Atividade</FormTitle>
                                <Divider />

                                <InputsBox>
                                    <HalfInputBox>
                                        <RNPickerSelect
                                            onValueChange={(value) => console.log(value)}
                                            items={[
                                                { label: 'Football', value: 'football' },
                                                { label: 'Baseball', value: 'baseball' },
                                                { label: 'Hockey', value: 'hockey' },
                                            ]}
                                        />
                                    </HalfInputBox>

                                    <HalfInputBox>

                                    </HalfInputBox>
                                </InputsBox>

                                <FormTitle>Endereço</FormTitle>
                                <Divider />

                                <InputsBox>
                                    <InputBox style={{
                                        borderTopEndRadius: 0,
                                        borderBottomEndRadius: 0,
                                        width: '85%'
                                    }}>
                                        {props.values.address.zipCode != '' && <Text>CEP:</Text>}
                                        <Input
                                            placeholder='Somente números'
                                            onChangeText={props.handleChange('address.zipCode')}
                                            keyboardType='phone-pad'
                                            value={props.values.address.zipCode}
                                            onBlur={props.handleBlur('zipCode')}
                                        />
                                    </InputBox>
                                    <IconBox activeOpacity={0.7}>
                                        <Icon name='magnify' size={28} color='#000' />
                                    </IconBox>
                                </InputsBox>

                                <InputsBox>
                                    <InputBox style={{
                                        width: '78%'
                                    }}>
                                        {props.values.address.city != '' && <Text>Cidade:</Text>}
                                        <Input
                                            placeholder='Cidade'
                                            onChangeText={props.handleChange('address.city')}
                                            value={props.values.address.city}
                                            onBlur={props.handleBlur('city')}
                                        />
                                    </InputBox>
                                    <InputBox style={{
                                        width: '18%'
                                    }}>
                                        {props.values.address.uf != '' && <Text>UF:</Text>}
                                        <Input
                                            placeholder='UF'
                                            onChangeText={props.handleChange('address.uf')}
                                            value={props.values.address.uf}
                                            onBlur={props.handleBlur('uf')}
                                        />

                                    </InputBox>
                                </InputsBox>

                                <InputBox>
                                    {props.values.address.district != '' && <Text>Bairro:</Text>}
                                    <Input
                                        placeholder='Bairro'
                                        onChangeText={props.handleChange('address.district')}
                                        value={props.values.address.district}
                                        onBlur={props.handleBlur('district')}
                                    />
                                </InputBox>

                                <InputsBox>
                                    <InputBox style={{
                                        width: '78%'
                                    }}>
                                        {props.values.address.street != '' && <Text>Rua:</Text>}
                                        <Input
                                            placeholder='Rua'
                                            onChangeText={props.handleChange('address.street')}
                                            value={props.values.address.street}
                                            onBlur={props.handleBlur('street')}
                                        />
                                    </InputBox>
                                    <InputBox style={{
                                        width: '18%'
                                    }}>
                                        {props.values.address.houseNumber != '' && <Text>Nº:</Text>}
                                        <Input
                                            placeholder='Nº'
                                            onChangeText={props.handleChange('address.houseNumber')}
                                            value={props.values.address.houseNumber}
                                            onBlur={props.handleBlur('houseNumber')}
                                        />

                                    </InputBox>
                                </InputsBox>

                                <InputBox>
                                    {props.values.address.reference != '' && <Text>Referência:</Text>}
                                    <Input
                                        placeholder='Referência'
                                        onChangeText={props.handleChange('address.reference')}
                                        value={props.values.reference}
                                        onBlur={props.handleBlur('reference')}
                                    />
                                </InputBox>

                                <ButtonBox>
                                    <SaveButton onPress={props.handleSubmit}>
                                        <TextButton>Salvar</TextButton>
                                    </SaveButton>
                                    <ResetForm>
                                        <Text style={{ fontSize: 13 }}>Clique aqui para resetar o formulário.</Text>
                                    </ResetForm>
                                </ButtonBox>

                            </FormBox>
                        )}

                    </Formik>
                </FormContainer>
            </PageBox>

        </Container>
    );
}

export default ProducerForm