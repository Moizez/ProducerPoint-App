import React, { useState, useContext, useRef, Fragment, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { format } from 'date-fns'

import { RequestContext } from '../../../contexts/request'
import Api from '../../../services/api'
import { periods } from '../../../enums'
import Loader from '../../../components/Loader'
import Picker from '../../../components/Picker'
import WarningModal from '../../../components/Modals/WarningModal'

import {
    Container, Header, Title, PageBox, FormBox, FormContainer, FormTitle, InputBox,
    HalfInputBox, Input, Text, InputsBox, ErrorBox, ErrorText, IconBox, ButtonBox,
    SaveButton, TextButton, Modal, Divider, MultiButton, MultiItemsBox, MultiText,
    NumberBox, MultiItem, MultiInfo, InputContainer
} from './styles'

const ProducerForm = () => {

    const { loadProducers, products, activities } = useContext(RequestContext)
    const navigation = useNavigation()

    let error = require('../../../assets/lottie/error-icon.json')
    let success = require('../../../assets/lottie/success-icon.json')

    const [show, setShow] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [lottie, setLottie] = useState(error)

    const [activity, setActivity] = useState('')
    const [activityLabel, setActivityLabel] = useState('')
    const [showActivityPicker, setShowActivityPicker] = useState(false)
    const [period, setPeriod] = useState('')
    const [periodLabel, setPeriodLabel] = useState('')
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
                formik.setFieldValue('address.uf', data.uf)
                formik.setFieldValue('address.city', data.localidade)
                formik.setFieldValue('address.district', data.bairro)
                formik.setFieldValue('address.street', data.logradouro)
                formik.setFieldValue('address.reference', data.complemento)
            }
        } catch (erro) {
            setLoading(false)
            setTypeMessage('CEP inválido!')
            openWarningModal()
        }
        setLoading(false)
    }

    const resetAllInputs = () => {
        setActivityLabel('')
        setPeriodLabel('')
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

    const validationSchema = yup.object().shape({
        name: yup.string().required('Nome é obrigatório!'),
        birthDate: yup.string().required('Data é obrigatória!'),
        cpf: yup.string().required('CPF é obrigatório!'),
        email: yup.string().email('E-mail inválido!'),
        address: yup.object().shape({
            zipCode: yup.string().required('CEP é obrigatório!'),
            uf: yup.string().required('UF é obrigatório!'),
            city: yup.string().required('Cidade é obrigatória!'),
            district: yup.string().required('Bairro é obrigatório!'),
            street: yup.string().required('Rua é obrigatória!'),
        }),
        farmingActivity: yup.object().shape({
            averageCash: yup.string().required('Renda é obrigatória!')
        }),
    })

    const initialFormState = {
        name: '',
        nickname: '',
        birthDate: '',
        cpf: '',
        phone: '',
        email: '',
        address: {
            zipCode: '',
            uf: '',
            city: '',
            district: '',
            street: '',
            houseNumber: '',
            reference: ''
        },
        farmingActivity: {
            activityName: {
                value: ''
            },
            period: '',
            averageCash: ''
        },
        products: [],
    }

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {

            const cpfValid = cpfRef?.current.isValid()
            const dateValid = dateRef?.current.isValid()
            const averageCash = moneyRef?.current.getRawValue()
            const birthDate = format(Date.parse(dateRef?.current.getRawValue()), 'yyyy-MM-dd')

            if (!dateValid) {
                setLottie(error)
                setTypeMessage('Data inválida!')
                openWarningModal()
            } else if (values.phone.length < 14) {
                setLottie(error)
                setTypeMessage('Telefone incompleto!')
                openWarningModal()
            } else if (!cpfValid) {
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
            } else if (!period) {
                setLottie(error)
                setTypeMessage('Informe o período!')
                openWarningModal()
            } else {

                const response = await Api.createProducer(
                    values.name, values.nickname, birthDate,
                    values.phone, values.cpf, values.email,
                    values.address.houseNumber, values.address.reference,
                    averageCash, values.address.zipCode,
                    values.address.city, values.address.district,
                    values.address.uf, values.address.street,
                    activity, resultList, period
                )

                if (response && response.status >= 200 && response.status <= 205) {
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
                } else {
                    setLottie(error)
                    setTypeMessage('Erro inesperado.\n' + response.status)
                    openWarningModal()
                }
            }

        }
    })

    return (
        <Fragment>
            <Container>
                <Header>
                    <Title>Cadastro de Produtor</Title>
                </Header>

                <PageBox>
                    <FormContainer>
                        <FormBox>
                            <FormTitle style={{ marginTop: 10 }}>Dados Pessoais</FormTitle>
                            <Divider />

                            <InputContainer>
                                <InputBox>
                                    {formik.values.name != '' && <Text>Nome*</Text>}
                                    <Input
                                        placeholder='Nome do produtor*'
                                        onChangeText={formik.handleChange('name')}
                                        value={formik.values.name}
                                        onBlur={formik.handleBlur('name')}
                                    />
                                </InputBox>
                                <ErrorBox>
                                    {formik.touched.name && formik.errors.name &&
                                        <ErrorText>{formik.errors.name}</ErrorText>
                                    }
                                </ErrorBox>
                            </InputContainer>

                            <InputContainer>
                                <InputsBox>
                                    <HalfInputBox>
                                        {formik.values.nickname != '' && <Text>Apelido:</Text>}
                                        <Input
                                            placeholder='Apelido'
                                            onChangeText={formik.handleChange('nickname')}
                                            value={formik.values.nickname}
                                            onBlur={formik.handleBlur('nickname')}
                                        />
                                    </HalfInputBox>

                                    <HalfInputBox>
                                        {formik.values.birthDate != '' && <Text>Nascimento*</Text>}
                                        <TextInputMask
                                            type={'datetime'}
                                            options={{
                                                format: 'DD/MM/YYYY'
                                            }}
                                            ref={dateRef}
                                            style={styles.input}
                                            keyboardType='phone-pad'
                                            placeholder='Nascimento*'
                                            onChangeText={formik.handleChange('birthDate')}
                                            value={formik.values.birthDate}
                                            onBlur={formik.handleBlur('birthDate')}
                                        />
                                    </HalfInputBox>
                                </InputsBox>

                                <ErrorBox style={{ marginLeft: '52%' }}>
                                    {formik.touched.birthDate && formik.errors.birthDate &&
                                        <ErrorText>{formik.errors.birthDate}</ErrorText>
                                    }
                                </ErrorBox>
                            </InputContainer>

                            <InputContainer>
                                <InputsBox>
                                    <HalfInputBox>
                                        {formik.values.cpf != '' && <Text>CPF*</Text>}
                                        <TextInputMask
                                            style={styles.input}
                                            type={'cpf'}
                                            ref={cpfRef}
                                            placeholder='CPF*'
                                            onChangeText={formik.handleChange('cpf')}
                                            keyboardType='phone-pad'
                                            value={formik.values.cpf}
                                            onBlur={formik.handleBlur('cpf')}
                                        />
                                    </HalfInputBox>

                                    <HalfInputBox>
                                        {formik.values.phone != '' && <Text>Celular</Text>}
                                        <TextInputMask
                                            style={styles.input}
                                            type={'cel-phone'}
                                            options={{
                                                maskType: 'BRL',
                                                withDDD: true,
                                                dddMask: '(99) '
                                            }}
                                            placeholder='Telefone'
                                            onChangeText={formik.handleChange('phone')}
                                            keyboardType='phone-pad'
                                            value={formik.values.phone}
                                        />
                                    </HalfInputBox>

                                </InputsBox>
                                <ErrorBox>
                                    {formik.touched.cpf && formik.errors.cpf &&
                                        <ErrorText>{formik.errors.cpf}</ErrorText>
                                    }
                                </ErrorBox>
                            </InputContainer>

                            <InputContainer>
                                <InputBox>
                                    {formik.values.email != '' && <Text>E-mail</Text>}
                                    <Input
                                        placeholder='E-mail'
                                        onChangeText={formik.handleChange('email')}
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur('email')}
                                    />
                                </InputBox>
                                <ErrorBox>
                                    {formik.touched.email && formik.errors.email &&
                                        <ErrorText>{formik.errors.email}</ErrorText>
                                    }
                                </ErrorBox>
                            </InputContainer>

                            <FormTitle>Atividade do Produtor</FormTitle>
                            <Divider />

                            <InputContainer>
                                <InputsBox>
                                    <HalfInputBox>
                                        <Picker
                                            title={'Atividade?*'}
                                            modalTitle={'Qual a atividade do produtor?'}
                                            showPicker={showActivityPicker}
                                            setShowPicker={setShowActivityPicker}
                                            list={activities}
                                            setSelectedPicker={setActivity}
                                            labelName={activityLabel}
                                            getLabelName={setActivityLabel}
                                        />
                                    </HalfInputBox>

                                    <HalfInputBox>
                                        <MultiButton
                                            onPress={() => setShowMultiPicker(!showMultiPicker)}
                                            onLongPress={() => setSelectectedItems([])}
                                        >
                                            <MultiText>Produtos?*</MultiText>
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
                            </InputContainer>

                            <InputContainer>
                                <InputsBox>
                                    <HalfInputBox>
                                        <Picker
                                            title={'Período?*'}
                                            modalTitle={'Qual o período base da renda?'}
                                            showPicker={showPeriodPicker}
                                            setShowPicker={setShowPeriodPicker}
                                            list={periods}
                                            setSelectedPicker={setPeriod}
                                            labelName={periodLabel}
                                            getLabelName={setPeriodLabel}
                                        />
                                    </HalfInputBox>

                                    <HalfInputBox>
                                        {formik.values.farmingActivity.averageCash != '' && <Text>Renda*</Text>}
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
                                            placeholder='Renda*'
                                            keyboardType='phone-pad'
                                            onChangeText={formik.handleChange('farmingActivity.averageCash')}
                                            value={formik.values.farmingActivity.averageCash}
                                            onBlur={formik.handleBlur('farmingActivity.averageCash')}
                                        />
                                    </HalfInputBox>
                                </InputsBox>
                                <ErrorBox style={{ marginLeft: '52%' }}>
                                    {formik.touched.farmingActivity?.averageCash && formik.errors.farmingActivity?.averageCash &&
                                        <ErrorText>{formik.errors.farmingActivity?.averageCash}</ErrorText>
                                    }
                                </ErrorBox>
                            </InputContainer>

                            <FormTitle>Endereço</FormTitle>
                            <Divider />

                            <InputContainer>
                                <InputsBox>
                                    <InputBox style={{
                                        borderTopEndRadius: 0,
                                        borderBottomEndRadius: 0,
                                        width: '85%'
                                    }}>
                                        {formik.values.address?.zipCode != '' && <Text>CEP*</Text>}
                                        <TextInputMask
                                            type={'zip-code'}
                                            style={styles.input}
                                            placeholder='Informe o CEP*'
                                            onChangeText={formik.handleChange('address.zipCode')}
                                            keyboardType='phone-pad'
                                            value={formik.values.address?.zipCode}
                                        />
                                    </InputBox>
                                    <IconBox onPress={() => getZipCode(formik.values.address.zipCode)} activeOpacity={0.7}>
                                        <Icon name='magnify' size={28} color='#FFF' />
                                    </IconBox>
                                </InputsBox>
                                <ErrorBox>
                                    {formik.touched.address?.zipCode && formik.errors.address?.zipCode &&
                                        <ErrorText>{formik.errors.address?.zipCode}</ErrorText>
                                    }
                                </ErrorBox>
                            </InputContainer>

                            {show &&
                                <Fragment>
                                    <InputContainer style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <InputsBox>
                                            <InputBox style={{ width: '64%' }}>
                                                {formik.values.address?.city != '' && <Text>Cidade*</Text>}
                                                <Input
                                                    placeholder='Cidade'
                                                    onChangeText={formik.handleChange('address.city')}
                                                    value={formik.values.address?.city}
                                                    onBlur={formik.handleBlur('address.city')}
                                                />
                                            </InputBox>
                                            <InputBox style={{ width: '34%' }}>
                                                {formik.values.address?.uf != '' && <Text>UF*</Text>}
                                                <Input
                                                    placeholder='UF'
                                                    onChangeText={formik.handleChange('address.uf')}
                                                    value={formik.values.address?.uf}
                                                    onBlur={formik.handleBlur('address.uf')}
                                                />

                                            </InputBox>
                                        </InputsBox>
                                        <ErrorBox style={{ marginRight: '34%' }}>
                                            {formik.touched.address?.city && formik.errors.address?.city &&
                                                <ErrorText>{formik.errors.address?.city}</ErrorText>
                                            }
                                        </ErrorBox>
                                        <ErrorBox>
                                            {formik.touched.address?.uf && formik.errors.address?.uf &&
                                                <ErrorText>{formik.errors.address?.uf}</ErrorText>
                                            }
                                        </ErrorBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <InputBox>
                                            {formik.values.address?.district != '' && <Text>Bairro*</Text>}
                                            <Input
                                                placeholder='Bairro*'
                                                onChangeText={formik.handleChange('address.district')}
                                                value={formik.values.address?.district}
                                                onBlur={formik.handleBlur('address.district')}
                                            />
                                        </InputBox>
                                        <ErrorBox>
                                            {formik.touched.address?.district && formik.errors.address?.district &&
                                                <ErrorText>{formik.errors.address?.district}</ErrorText>
                                            }
                                        </ErrorBox>
                                    </InputContainer>

                                    <InputContainer style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <InputsBox>
                                            <InputBox style={{ width: '64%' }}>
                                                {formik.values.address?.street != '' && <Text>Rua*</Text>}
                                                <Input
                                                    placeholder='Rua*'
                                                    onChangeText={formik.handleChange('address.street')}
                                                    value={formik.values.address?.street}
                                                    onBlur={formik.handleBlur('address.street')}
                                                />
                                            </InputBox>
                                            <InputBox style={{ width: '34%' }}>
                                                {formik.values.address.houseNumber != '' && <Text>Nº</Text>}
                                                <Input
                                                    placeholder='Nº'
                                                    onChangeText={formik.handleChange('address.houseNumber')}
                                                    keyboardType='phone-pad'
                                                    value={formik.values.address.houseNumber}
                                                    onBlur={formik.handleBlur('address.houseNumber')}
                                                />
                                            </InputBox>
                                        </InputsBox>
                                        <ErrorBox>
                                            {formik.touched.address?.street && formik.errors.address?.street &&
                                                <ErrorText>{formik.errors.address?.street}</ErrorText>
                                            }
                                        </ErrorBox>
                                    </InputContainer>
                                    <InputContainer>
                                        <InputBox>
                                            {formik.values.address.reference != '' && <Text>Referência:</Text>}
                                            <Input
                                                placeholder='Referência'
                                                onChangeText={formik.handleChange('address.reference')}
                                                value={formik.values.address.reference}
                                                onBlur={formik.handleBlur('address.reference')}
                                            />
                                        </InputBox>
                                    </InputContainer>
                                </Fragment>
                            }

                            <ButtonBox>
                                <SaveButton onPress={formik.handleSubmit}>
                                    <TextButton>Salvar</TextButton>
                                </SaveButton>
                            </ButtonBox>

                        </FormBox>

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