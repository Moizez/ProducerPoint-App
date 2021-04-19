import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, CloseContainer, ModalBox, CloseButton, ModalHeader, Title, MessageBox,
    MessageInput, ModalButton, AcceptButton, TextButton, MessageInputBox, DateButton
} from './styles'

const TaskModal = ({
    closeModal, today, setDatePicker, text, setText, confirmModal
}) => {

    return (
        <Container>
            <CloseContainer onPress={closeModal} activeOpacity={1} />
            <ModalBox>
                <ModalHeader>
                    <CloseButton onPress={closeModal}>
                        <Icon name='chevron-down' color='#FFF' size={40} />
                    </CloseButton>
                    <Title>Informações da tarefa</Title>
                </ModalHeader>

                <MessageBox>
                    <MessageInputBox>
                        <MessageInput
                            placeholder='Informe a descrição da tarefa'
                            autoCorrect={true}
                            autoCapitalize='sentences'
                            multiline={true}
                            value={text}
                            onChangeText={setText}
                        />
                    </MessageInputBox>

                    <DateButton onPress={() => setDatePicker(true)}>
                        <TextButton style={{fontSize: 15}}>{today}</TextButton>
                        <Icon name='calendar' color='#FFF' size={30} />
                    </DateButton>

                    <ModalButton>
                        <AcceptButton onPress={confirmModal}>
                            <TextButton>Criar</TextButton>
                        </AcceptButton>
                    </ModalButton>

                </MessageBox>
            </ModalBox>

        </Container>
    );
}

export default TaskModal