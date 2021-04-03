import React, { useState, useContext, Fragment } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Formik } from 'formik'
import * as yup from 'yup'

import { RequestContext } from '../../../contexts/request'
import Api from '../../../services/api'
import { activities, periods, products } from './enums'
import Loader from '../../../components/Loader'
import Picker from '../../../components/Picker'
import WarningModal from '../../../components/Modals/WarningModal'

import {
    Container, Header, Title, PageBox, FormBox, FormContainer, FormTitle, InputBox,
    HalfInputBox, Input, Text, InputsBox, ErrorBox, ErrorText, IconBox,
    ButtonBox, ResetForm, SaveButton, TextButton, Modal, Divider, BoldDivider
} from './styles'

const formSchema = yup.object({
    name: yup.string().required('O nome do tanque é obrigatório!'),
    phone: yup.string().required('O telefone é obrigatório!'),
    cpf: yup.string().required('O cpf é obrigatório!'),
})

const ProducerForm = () => {

    const { loadProducers } = useContext(RequestContext)
    const navigation = useNavigation()

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const [show, setShow] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [activity, setActivity] = useState('')
    const [showActivityPicker, setShowActivityPicker] = useState(false)
    const [product, setProduct] = useState('')
    const [showProductPicker, setShowProductPicker] = useState(false)
    const [period, setPeriod] = useState('')
    const [showPeriodPicker, setShowPeriodPicker] = useState(false)

    //Endereço
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [uf, setUf] = useState('')

    const getZipCode = async (cep) => {
        setLoading(true)
        try {
            const response = await Api.getCep(cep)
            const data = await response.json()
            if (data.error) {
                setLoading(false)
                setTypeMessage('CEP não encontrado!')
                openWarningModal()
            } else {
                setShow(true)
                setZipCode(data.cep)
                setStreet(data.logradouro)
                setDistrict(data.bairro)
                setCity(data.localidade)
                setUf(data.uf)
            }
        } catch (error) {
            setLoading(false)
            setTypeMessage('CEP inválido!')
            openWarningModal()
        }
        setLoading(false)
    }

    const resetAllInputs = () => {
        setActivity('')
        setProduct('')
        setPeriod('')
        setZipCode('')
        setCity('')
        setUf('')
        setDistrict('')
        setStreet('')
        setShow(false)
    }

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

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
                                houseNumber: '',
                                reference: '',
                            },
                            farmingActivity: {
                                averageCash: ''
                            }
                        }}
                        validationSchema={null}
                        onSubmit={async (values, actions) => {
                            await Api.createProducer(
                                values.name, values.nickname, values.phone,
                                values.cpf, values.email, values.address.houseNumber,
                                values.address.reference, values.farmingActivity.averageCash,
                                zipCode, city, district, uf, street, activity, product, period
                            )
                            setLottie(success)
                            setTypeMessage('Tanque criado com sucesso!')
                            openWarningModal()
                            setTimeout(() => {
                                closeWarningModal()
                                loadProducers()
                                navigation.navigate('ManagerHome')
                            }, 2000);
                            actions.resetForm()
                            resetAllInputs()
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
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                        value={props.values.email}
                                        onBlur={props.handleBlur('email')}
                                    />
                                </InputBox>

                                <FormTitle>Atividade</FormTitle>
                                <Divider />

                                <InputsBox>
                                    <HalfInputBox>
                                        <Picker
                                            title={'Atividade?'}
                                            showPicker={showActivityPicker}
                                            setShowPicker={setShowActivityPicker}
                                            list={activities}
                                            setSelectedPicker={setActivity}
                                        />
                                    </HalfInputBox>

                                    <HalfInputBox>
                                        <Picker
                                            title={'Produto?'}
                                            showPicker={showProductPicker}
                                            setShowPicker={setShowProductPicker}
                                            list={products}
                                            setSelectedPicker={setProduct}
                                        />
                                    </HalfInputBox>
                                </InputsBox>

                                <InputsBox>
                                    <HalfInputBox>
                                        {props.values.farmingActivity.averageCash != '' && <Text>Renda média:</Text>}
                                        <Input
                                            placeholder='Renda média'
                                            keyboardType='phone-pad'
                                            onChangeText={props.handleChange('farmingActivity.averageCash')}
                                            value={props.values.farmingActivity.averageCash}
                                        />
                                    </HalfInputBox>

                                    <HalfInputBox>
                                        <Picker
                                            title={'Período?'}
                                            showPicker={showPeriodPicker}
                                            setShowPicker={setShowPeriodPicker}
                                            list={periods}
                                            setSelectedPicker={setPeriod}
                                        />
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
                                        />
                                    </InputBox>
                                    <IconBox onPress={() => getZipCode(props.values.address.zipCode)} activeOpacity={0.7}>
                                        <Icon name='magnify' size={28} color='#000' />
                                    </IconBox>
                                </InputsBox>

                                {show &&
                                    <Fragment>
                                        <InputsBox>
                                            <InputBox style={{ width: '78%' }}>
                                                {city != '' && <Text>Cidade:</Text>}
                                                <Input
                                                    placeholder='Cidade'
                                                    onChangeText={setCity}
                                                    value={city}
                                                />
                                            </InputBox>
                                            <InputBox style={{ width: '18%' }}>
                                                {uf != '' && <Text>UF:</Text>}
                                                <Input
                                                    placeholder='UF'
                                                    onChangeText={setUf}
                                                    value={uf}
                                                />

                                            </InputBox>
                                        </InputsBox>

                                        <InputBox>
                                            {district != '' && <Text>Bairro:</Text>}
                                            <Input
                                                placeholder='Bairro'
                                                onChangeText={setDistrict}
                                                value={district}
                                            />
                                        </InputBox>

                                        <InputsBox>
                                            <InputBox style={{
                                                width: '78%'
                                            }}>
                                                {street != '' && <Text>Rua:</Text>}
                                                <Input
                                                    placeholder='Rua'
                                                    onChangeText={setStreet}
                                                    value={street}
                                                />
                                            </InputBox>
                                            <InputBox style={{
                                                width: '18%'
                                            }}>
                                                {props.values.address.houseNumber != '' && <Text>Nº:</Text>}
                                                <Input
                                                    placeholder='Nº'
                                                    onChangeText={props.handleChange('address.houseNumber')}
                                                    keyboardType='phone-pad'
                                                    value={props.values.address.houseNumber}
                                                />
                                            </InputBox>
                                        </InputsBox>

                                        <InputBox>
                                            {props.values.address.reference != '' && <Text>Referência:</Text>}
                                            <Input
                                                placeholder='Referência'
                                                onChangeText={props.handleChange('address.reference')}
                                                value={props.values.address.reference}
                                            />
                                        </InputBox>
                                    </Fragment>
                                }

                                <ButtonBox>
                                    <SaveButton onPress={props.handleSubmit}>
                                        <TextButton>Salvar</TextButton>
                                    </SaveButton>
                                    <ResetForm onPress={props.resetForm}>
                                        <Text style={{ fontSize: 13 }}>Clique aqui para resetar o formulário.</Text>
                                    </ResetForm>
                                </ButtonBox>

                            </FormBox>
                        )}

                    </Formik>
                </FormContainer>
            </PageBox>
            {loading && <Loader />}

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >

                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    lottie={lottie}
                    bgColor={true}
                />
            </Modal>
        </Container>
    );
}

export default ProducerForm