import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInputMask } from 'react-native-masked-text'
import { useFormik } from 'formik'
import * as yup from 'yup'
import moment from 'moment'
import { format } from 'date-fns'
import 'moment/locale/pt-br'

import DatePicker from '../../DatePicker'
import Picker from '../../../components/Picker'

import Api from '../../../services/api'
import { parameter } from '../../../enums'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    ConfirmButton, InputContainer, InputBox, InputsBox, Input, Text, ErrorBox,
    ErrorText, DateButton, TextButton, HalfInputBox
} from './styles'

const SalesModal = ({ closeModal, confirmModal, bgColor, producer, load }) => {

    const [datePicker, setDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(moment().format())
    const [typeMessage, setTypeMessage] = useState('')

    const [param, setParam] = useState('')
    const [paramLabel, setParamLabel] = useState('')
    const [showParamPicker, setShowParamPicker] = useState(false)
    const [product, setProduct] = useState('')
    const [productLabel, setProductLabel] = useState('')
    const [showProductPicker, setShowProductPicker] = useState(false)

    const dateRef = useRef(null)
    const valorRef = useRef(null)

    const onChange = async (currentDate) => {
        setDatePicker(Platform.OS === 'ios')
        setSelectedDate(currentDate)
    }

    const validationSchema = yup.object().shape({
        valor: yup.string().required('Valor é obrigatório!'),
        quantity: yup.string().required('Quantidade é obrigatória!'),
        date: yup.string().required('Data é obrigatória!'),
        city: yup.string().required('Cidade é obrigatória!'),
    })

    const initialFormState = {
        valor: '',
        quantity: '',
        date: '',
        city: '',
        parameter: '',
        producer: '',
        product: '',
    }


    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {

            const dateValid = dateRef?.current.isValid()

            if(!dateValid){
                setTypeMessage('Data inválida!')
            
            } else {
                const date_correct = format(Date.parse(dateRef?.current.getRawValue()), 'yyyy-MM-dd')
                const valor_correct = valorRef?.current.getRawValue()

                const response = await Api.createSaleProducer(
                    date_correct,
                    values.quantity,
                    valor_correct,
                    param,
                    values.city,
                    producer.id,
                    product,
                )

                closeModal()
                load()
            }
        }
    })

    return (
        <Container bgColor={bgColor}>
            <CloseContainer
                onPress={() => closeModal()}
                activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={() => closeModal()}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Cadastrar venda?</Title>
                </ModalHeader>

                <ModalInfo>
                    <InputContainer>
                        <InputsBox>
                            <HalfInputBox>
                                <Picker
                                    title={'Produto?*'}
                                    modalTitle={'Qual o produto da venda?'}
                                    showPicker={showProductPicker}
                                    setShowPicker={setShowProductPicker}
                                    list={producer.products}
                                    setSelectedPicker={setProduct}
                                    labelName={productLabel}
                                    getLabelName={setProductLabel}
                                />
                            </HalfInputBox>
                            <InputBox style={{ width: '50%' }}>
                                {formik.values.valor != '' && <Text>Valor*</Text>}
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
                                    ref={valorRef}
                                    placeholder='Valor da venda*'
                                    keyboardType='phone-pad'
                                    onChangeText={formik.handleChange('valor')}
                                    value={formik.values.valor}
                                    onBlur={formik.handleBlur('valor')}
                                />
                            </InputBox>
                        </InputsBox>
                        <ErrorBox>
                            {formik.touched.valor && formik.errors.valor &&
                                <ErrorText>{formik.errors.valor}</ErrorText>
                            }
                        </ErrorBox>
                    </InputContainer>

                    <InputContainer style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <InputsBox>
                            <InputBox style={{ width: '50%' }}>
                                {formik.values.quantity != '' && <Text>Quantidade*</Text>}
                                <Input
                                    placeholder='Quantidade*'
                                    onChangeText={formik.handleChange('quantity')}
                                    keyboardType='phone-pad'
                                    value={formik.values.quantity}
                                    onBlur={formik.handleBlur('quantity')}
                                />
                            </InputBox>
                            <HalfInputBox>
                                <Picker
                                    title={'Parâmetro?*'}
                                    modalTitle={'Qual o parâmetro da venda?'}
                                    showPicker={showParamPicker}
                                    setShowPicker={setShowParamPicker}
                                    list={parameter}
                                    setSelectedPicker={setParam}
                                    labelName={paramLabel}
                                    getLabelName={setParamLabel}
                                />
                            </HalfInputBox>
                        </InputsBox>
                        <ErrorBox style={{ marginRight: '34%' }}>
                            {formik.touched.quantity && formik.errors.quantity &&
                                <ErrorText>{formik.errors.quantity}</ErrorText>
                            }
                        </ErrorBox>
                    </InputContainer>

                    <InputContainer>
                        <InputBox>
                            {formik.values.city != '' && <Text>Cidade*</Text>}
                            <Input
                                placeholder='Cidade do comprador*'
                                onChangeText={formik.handleChange('city')}
                                value={formik.values.city}
                                onBlur={formik.handleBlur('city')}
                            />
                        </InputBox>
                        <ErrorBox>
                            {formik.touched.city && formik.errors.city &&
                                <ErrorText>{formik.errors.city}</ErrorText>
                            }
                        </ErrorBox>
                    </InputContainer>

                    <InputContainer>
                        <InputsBox>
                            <HalfInputBox>
                                {formik.values.date != '' && <Text>Data da venda*</Text>}
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'DD/MM/YYYY'
                                    }}
                                    ref={dateRef}
                                    style={styles.input}
                                    keyboardType='phone-pad'
                                    placeholder='Data da venda*'
                                    onChangeText={formik.handleChange('date')}
                                    value={formik.values.date}
                                    onBlur={formik.handleBlur('date')}
                                />
                            </HalfInputBox>
                        </InputsBox>
                        <ErrorBox>
                            {formik.touched.date && formik.errors.date &&
                                <ErrorText>{formik.errors.date}</ErrorText>
                            }
                        </ErrorBox>
                        <ErrorBox>
                            <ErrorText>{typeMessage}</ErrorText>
                        </ErrorBox>
                    </InputContainer>

                </ModalInfo>

                <ConfirmButton onPress={formik.handleSubmit}>
                    <Title style={{ marginRight: 15 }}>Cadastrar</Title>
                    <Icon name='check-circle' color='#FFF' size={35} />
                </ConfirmButton>

                {datePicker &&
                    <DatePicker
                        chosenDate={selectedDate}
                        onSet={onChange}
                        maximumDate={new Date()}
                    />
                }

            </ModalBox>

        </Container>
    );
}

const styles = StyleSheet.create({
    divider: {
        marginVertical: 5, height: 2
    },
    dividerV: {
        width: 0.5, height: '100%'
    },
    periodDivider: {
        marginVertical: 5, backgroundColor: 'red'
    },
    input: {
        width: '100%',
        fontSize: 18,
        color: '#292b2c',
        paddingLeft: 15
    }
})

export default SalesModal