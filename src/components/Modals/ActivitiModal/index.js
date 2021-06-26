import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFormik } from 'formik'
import * as yup from 'yup'
import 'moment/locale/pt-br'

import Api from '../../../services/api'
import { RequestContext } from '../../../contexts/request'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    ConfirmButton, InputContainer, InputBox, InputsBox, Input, Text, ErrorBox,
    ErrorText, DateButton, TextButton, HalfInputBox
} from './styles'

const ActivitiModal = ({ closeModal, bgColor }) => {

    const [showParamPicker, setShowParamPicker] = useState(false)
    const [showProductPicker, setShowProductPicker] = useState(false)

    const { loadActivities } = useContext(RequestContext)

    const onChange = async (currentDate) => {
        setDatePicker(Platform.OS === 'ios')
        setSelectedDate(currentDate)
    }

    const validationSchema = yup.object().shape({
        valor: yup.string().required('Ativididade Agrícola é obrigatório!'),
    })

    const initialFormState = {
        valor: '',
    }


    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {

            const response = await Api.createActiviti(
                values.valor
            )
            
            loadActivities()
            closeModal()
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
                    <Title>Cadastrar Atividade?</Title>
                </ModalHeader>

                <ModalInfo>

                    <InputContainer>
                        <InputBox>
                            {formik.values.valor != '' && <Text>Atividade Agrícola*</Text>}
                            <Input
                                placeholder='Atividade Agrícola*'
                                onChangeText={formik.handleChange('valor')}
                                value={formik.values.valor}
                                onBlur={formik.handleBlur('valor')}
                            />
                        </InputBox>
                        <ErrorBox>
                            {formik.touched.valor && formik.errors.valor &&
                                <ErrorText>{formik.errors.valor}</ErrorText>
                            }
                        </ErrorBox>
                    </InputContainer>

                </ModalInfo>

                <ConfirmButton onPress={formik.handleSubmit}>
                    <Title style={{ marginRight: 15 }}>Cadastrar</Title>
                    <Icon name='check-circle' color='#FFF' size={35} />
                </ConfirmButton>

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

export default ActivitiModal