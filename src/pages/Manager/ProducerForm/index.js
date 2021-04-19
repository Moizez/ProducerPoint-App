import React, { useState, useContext, useRef, Fragment } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Formik } from 'formik'
import * as yup from 'yup'

import { RequestContext } from '../../../contexts/request'
import Api from '../../../services/api'
import { activities, periods } from '../../../enums'
import Loader from '../../../components/Loader'
import Picker from '../../../components/Picker'
import WarningModal from '../../../components/Modals/WarningModal'

import {
    Container, Header, Title, PageBox, FormBox, FormContainer, FormTitle, InputBox,
    HalfInputBox, Input, Text, InputsBox, ErrorBox, ErrorText, IconBox,
    ButtonBox, ResetForm, SaveButton, TextButton, Modal, Divider,

    MultiButton, MultiItemsBox, MultiText, NumberBox, MultiItem, MultiInfo
} from './styles'

const formSchema = yup.object({
    name: yup.string().required('O nome é obrigatório!'),
    phone: yup.string().required('O telefone é obrigatório!'),
    cpf: yup.string().required('O cpf é obrigatório!'),
    birthDate: yup.string().required('A data de nascimento é obrigatória!'),
})

const ProducerForm = () => {

    const { loadProducers, products } = useContext(RequestContext)
    const navigation = useNavigation()

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const [show, setShow] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)

    const [activity, setActivity] = useState('')
    const [showActivityPicker, setShowActivityPicker] = useState(false)
    const [period, setPeriod] = useState('')
    const [showPeriodPicker, setShowPeriodPicker] = useState(false)

    const [selectectedItems, setSelectectedItems] = useState([])
    const [showMultiPicker, setShowMultiPicker] = useState(false)

    //Endereço
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [uf, setUf] = useState('')

    const cpfRef = useRef(null)
    const moneyRef = useRef(null)
    const dateRef = useRef(null)

    const getZipCode = async (cep) => {
        setLoading(true)
        try {
            const response = await Api.getCep(cep)
            const data = await response.json()

            if (data.erro) {
                setLoading(false)
                setTypeMessage('CEP não encontrado!')
                openWarningModal()
            } else {
                setShow(true)
                setStreet(data.logradouro)
                setDistrict(data.bairro)
                setCity(data.localidade)
                setUf(data.uf)
            }
        } catch (erro) {
            setLoading(false)
            setTypeMessage('CEP inválido!')
            openWarningModal()
        }
        setLoading(false)
    }

    const resetAllInputs = () => {
        setActivity('')
        setPeriod('')
        setCity('')
        setUf('')
        setDistrict('')
        setStreet('')
        setSelectectedItems([])
        setShow(false)
    }

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    const productsList = () => {
        const newArray = []
        for (let i of selectectedItems) {
            const keys = Object.keys(i)
            for (let key of keys) {
                if (key === 'value') {
                    const obj = { value: i[key] }
                    newArray.push(obj)
                }
            }
        }
        return newArray
    }

    const resultList = productsList()

    return (
        <Fragment>
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
                                birthDate: '',
                                phone: '',
                                cpf: '',
                                email: '',
                                address: {
                                    zipCode: '',
                                    houseNumber: '',
                                    reference: '',
                                },
                                farmingActivity: {
                                    averageCash: ''
                                }
                            }}
                            validationSchema={formSchema}
                            onSubmit={async (values, actions) => {
                                const cpfValid = cpfRef?.current.isValid()
                                const dateValid = dateRef?.current.isValid()
                                const averageCash = moneyRef?.current.getRawValue()
                                const birthDate = dateRef?.current.getRawValue()

                                if (!dateValid) {
                                    setLottie(error)
                                    setTypeMessage('Data inválida!')
                                    openWarningModal()
                                } else if (values.phone.length < 14) {
                                    setLottie(error)
                                    setTypeMessage('Número incompleto!')
                                    openWarningModal()
                                } else if (!cpfValid || !values.cpf) {
                                    setLottie(error)
                                    setTypeMessage('CPF inválido!')
                                    openWarningModal()
                                } else if (!activity) {
                                    setLottie(error)
                                    setTypeMessage('Informe a atividade!')
                                    openWarningModal()
                                } else if (!resultList || resultList.length == 0) {
                                    setLottie(error)
                                    setTypeMessage('Informe pelo menos um produto!')
                                    openWarningModal()
                                } else if (!values.farmingActivity.averageCash) {
                                    setLottie(error)
                                    setTypeMessage('Informe a renda!')
                                    openWarningModal()
                                } else if (!period) {
                                    setLottie(error)
                                    setTypeMessage('Informe o período!')
                                    openWarningModal()
                                } else if (!values.address.zipCode || values.address.zipCode.length != 9) {
                                    setLottie(error)
                                    setTypeMessage('Informe um cep válido!')
                                    openWarningModal()
                                } else {

                                    await Api.createProducer(
                                        values.name, values.nickname, birthDate,
                                        values.phone, values.cpf, values.email,
                                        values.address.houseNumber, values.address.reference,
                                        averageCash, values.address.zipCode, city, district,
                                        uf, street, activity, resultList, period
                                    )

                                    setLottie(success)
                                    setTypeMessage('Produtor criado com sucesso!')
                                    openWarningModal()
                                    actions.resetForm()
                                    resetAllInputs()
                                    setTimeout(() => {
                                        closeWarningModal()
                                        loadProducers()
                                        navigation.navigate('ManagerHome')
                                    }, 2000);
                                }
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
                                    <ErrorBox>
                                        {props.touched.name && props.errors.name &&
                                            <ErrorText>{props.errors.name}</ErrorText>
                                        }
                                    </ErrorBox>

                                    <InputsBox>
                                        <HalfInputBox>
                                            {props.values.nickname != '' && <Text>Apelido:</Text>}
                                            <Input
                                                placeholder='Apelido'
                                                onChangeText={props.handleChange('nickname')}
                                                value={props.values.nickname}
                                                onBlur={props.handleBlur('nickname')}
                                            />
                                        </HalfInputBox>

                                        <HalfInputBox>
                                            {props.values.birthDate != '' && <Text>Nascimento:</Text>}
                                            <TextInputMask
                                                type={'datetime'}
                                                options={{
                                                    format: 'DD/MM/YYYY'
                                                }}
                                                ref={dateRef}
                                                style={styles.input}
                                                keyboardType='phone-pad'
                                                placeholder='Nascimento'
                                                onChangeText={props.handleChange('birthDate')}
                                                value={props.values.birthDate}
                                                onBlur={props.handleBlur('birthDate')}
                                            />
                                        </HalfInputBox>

                                    </InputsBox>
                                    <ErrorBox>
                                        {props.touched.birthDate && props.errors.birthDate &&
                                            <ErrorText>{props.errors.birthDate}</ErrorText>
                                        }
                                    </ErrorBox>

                                    <InputsBox>
                                        <HalfInputBox>
                                            {props.values.phone != '' && <Text>Celular:</Text>}
                                            <TextInputMask
                                                style={styles.input}
                                                type={'cel-phone'}
                                                options={{
                                                    maskType: 'BRL',
                                                    withDDD: true,
                                                    dddMask: '(99) '
                                                }}
                                                placeholder='Telefone'
                                                onChangeText={props.handleChange('phone')}
                                                keyboardType='phone-pad'
                                                value={props.values.phone}
                                            />
                                        </HalfInputBox>

                                        <HalfInputBox>
                                            {props.values.cpf != '' && <Text>CPF:</Text>}
                                            <TextInputMask
                                                style={styles.input}
                                                type={'cpf'}
                                                ref={cpfRef}
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
                                            <ErrorText>{props.errors.phone}</ErrorText>
                                        }
                                        {props.touched.cpf && props.errors.cpf &&
                                            <ErrorText>{props.errors.cpf}</ErrorText>
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
                                                modalTitle={'Qual a atividade do produtor?'}
                                                showPicker={showActivityPicker}
                                                setShowPicker={setShowActivityPicker}
                                                list={activities}
                                                setSelectedPicker={setActivity}
                                            />
                                        </HalfInputBox>

                                        <HalfInputBox>
                                            <MultiButton
                                                onPress={() => setShowMultiPicker(!showMultiPicker)}
                                                onLongPress={() => setSelectectedItems([])}
                                            >
                                                <MultiText>Produtos?</MultiText>
                                                {selectectedItems.length > 0 ?
                                                    <NumberBox>
                                                        <MultiText>
                                                            {selectectedItems.length}
                                                        </MultiText>
                                                    </NumberBox> :
                                                    <Icon name='chevron-down' color='#888' size={30} />
                                                }
                                            </MultiButton>
                                        </HalfInputBox>
                                    </InputsBox>

                                    <InputsBox>
                                        <HalfInputBox>
                                            {props.values.farmingActivity.averageCash != '' && <Text>Renda média:</Text>}
                                            <TextInputMask
                                                style={styles.input}
                                                type={'money'}
                                                options={{
                                                    precision: 2,
                                                    separator: ',',
                                                    delimiter: '.',
                                                    unit: 'R$',
                                                    suffixUnit: ''
                                                }}
                                                ref={moneyRef}
                                                placeholder='Renda média'
                                                keyboardType='phone-pad'
                                                onChangeText={props.handleChange('farmingActivity.averageCash')}
                                                value={props.values.farmingActivity.averageCash}
                                            />
                                        </HalfInputBox>

                                        <HalfInputBox>
                                            <Picker
                                                title={'Período?'}
                                                modalTitle={'Qual o período base da renda?'}
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
                                            <TextInputMask
                                                type={'zip-code'}
                                                style={styles.input}
                                                placeholder='Somente números'
                                                onChangeText={props.handleChange('address.zipCode')}
                                                keyboardType='phone-pad'
                                                value={props.values.address.zipCode}
                                            />
                                        </InputBox>
                                        <IconBox onPress={() => getZipCode(props.values.address.zipCode)} activeOpacity={0.7}>
                                            <Icon name='magnify' size={28} color='#FFF' />
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

            {showMultiPicker &&
                <Fragment>

                    <MultipleSelectPicker
                        items={products}
                        onSelectionsChange={(item) => setSelectectedItems(item)}
                        selectedItems={selectectedItems}
                    />

                    <MultiInfo>
                        <MultiItemsBox>
                            {(selectectedItems || []).map(i => {
                                return (
                                    <MultiItem key={i.value}>
                                        <MultiText style={{ fontSize: 12 }}>{i.label}</MultiText>
                                    </MultiItem>
                                )
                            })}
                        </MultiItemsBox>
                        <SaveButton
                            onPress={() => setShowMultiPicker(!showMultiPicker)}
                            style={{
                                marginTop: 5,
                                width: '100%',
                                backgroundColor: selectectedItems == 0 ? '#da1e37' : '#2a9d8f'
                            }}
                        >
                            <MultiText
                                style={{ color: '#FFF', fontWeight: 'bold' }}
                            >{selectectedItems == 0 ? 'Fechar' : 'Ok'}</MultiText>
                        </SaveButton>
                    </MultiInfo>
                </Fragment>
            }
        </Fragment>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 18,
        color: '#292b2c',
        paddingLeft: 15
    }
})

export default ProducerForm