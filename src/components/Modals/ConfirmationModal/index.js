import React from 'react';
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, ModalInfo,
    InfoBox, ItemBox, InfoTitle, InfoText, ConfirmButton, Avatar, DividerH
} from './styles'

const ConfirmationModal = ({
    name, activityName, closeModal, confirmModal, closeSwipeable, bgColor
}) => {

    return (
        <Container bgColor={bgColor}>
            <CloseContainer
                onPress={() => (
                    closeModal(),
                    closeSwipeable()
                )}
                activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={() => (
                        closeModal(),
                        closeSwipeable()
                    )}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Remover este produtor?</Title>
                </ModalHeader>

                <ModalInfo>
                    <InfoBox>
                        <ItemBox>
                            <InfoTitle>Nome</InfoTitle>
                            <InfoText>{name}</InfoText>
                        </ItemBox>
                        <DividerH />
                        <ItemBox>
                            <InfoTitle>Atividade</InfoTitle>
                            <InfoText>{activityName}</InfoText>
                        </ItemBox>
                    </InfoBox>
                    <Avatar source={require('../../../assets/images/avatar.jpg')} />
                </ModalInfo>

                <ConfirmButton onPress={confirmModal}>
                    <Title style={{ marginRight: 15 }}>Remover</Title>
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

export default ConfirmationModal