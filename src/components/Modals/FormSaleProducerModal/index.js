import React from 'react';
import { StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInputMask } from 'react-native-masked-text'

import Picker from '../../../components/Picker'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    InfoBox, ItemBox, InfoTitle, InfoText, ConfirmButton, Avatar, DividerH, HalfInputBox, 
} from './styles'

const FormSaleProducerModal = ({
    route, closeModal, confirmModal, bgColor
}) => {

    return (
        <Container bgColor={bgColor}>
            <CloseContainer
                onPress={() => (
                    closeModal()
                )}
                activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={() => (
                        closeModal()
                    )}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Cadastro venda</Title>
                </ModalHeader>

                <ModalInfo>
                    
                    <HalfInputBox>
                        <Text>Data*</Text>
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            ref={dateRef}
                            style={styles.input}
                            keyboardType='phone-pad'
                            placeholder='Data*'
                            onChangeText={formik.handleChange('birthDate')}
                            value={formik.values.birthDate}
                            onBlur={formik.handleBlur('birthDate')}
                        />
                    </HalfInputBox>

                    <HalfInputBox>
                        <Text>Quantidade*</Text>
                        <TextInputMask
                            style={styles.input}
                            type={'number'}
                            ref={moneyRef}
                            placeholder='Quantidade*'
                            keyboardType='phone-pad'
                            onChangeText={formik.handleChange('farmingActivity.averageCash')}
                            value={formik.values.farmingActivity.averageCash}
                            onBlur={formik.handleBlur('farmingActivity.averageCash')}
                        />
                    </HalfInputBox>

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
                        <Text>Valor*</Text>
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
                            placeholder='Valor*'
                            keyboardType='phone-pad'
                            onChangeText={formik.handleChange('farmingActivity.averageCash')}
                            value={formik.values.farmingActivity.averageCash}
                            onBlur={formik.handleBlur('farmingActivity.averageCash')}
                        />
                    </HalfInputBox>

                    <InputContainer>
                        <InputBox>
                            <Text>Cidade*</Text>
                            <Input
                                placeholder='Cidade*'
                                onChangeText={formik.handleChange('name')}
                                value={formik.values.name}
                                onBlur={formik.handleBlur('name')}
                            />
                        </InputBox>
                    </InputContainer>
                </ModalInfo>

                <ConfirmButton onPress={confirmModal}>
                    <Title style={{ marginRight: 15 }}>Cadastrar</Title>
                    <Icon name='delete-circle' color='#FFF' size={35} />
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
    }
})

export default FormSaleProducerModal