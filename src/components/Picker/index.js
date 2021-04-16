import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    Container, OpenButton, TitleButton, Modal, ModalBox, CloseBox, ModalTitle,
    PickerBox, ItemText, ModalHeader, CloseButton, ItemButton
} from './styles'

const Picker = ({
    title, modalTitle, list, showPicker, setShowPicker, setSelectedPicker, defaultValue
}) => {

    const [text, setText] = useState('')

    const togglePicker = (value, label) => {
        setShowPicker(false)
        setSelectedPicker(value)
        setText(label)
    }

    return (
        <Container>
            <OpenButton onPress={() => setShowPicker(true)}>
                <TitleButton>{text ? text : title}</TitleButton>
                <Icon name='chevron-down' color='#888' size={30} />
            </OpenButton>

            <Modal visible={showPicker} animationType={"slide"} transparent={true}>
                <CloseBox onPress={() => setShowPicker(false)} activeOpacity={1} />
                <ModalBox>
                    <PickerBox>
                        <ModalHeader>
                            <CloseButton onPress={() => setShowPicker(false)}>
                                <Icon name='chevron-down' color='#FFF' size={40} />
                            </CloseButton>
                            <ModalTitle>{modalTitle}</ModalTitle>
                        </ModalHeader>
                        {list.map((value, index) => {
                            return (
                                <ItemButton
                                    key={index}
                                    onPress={() => togglePicker(value.value, value.label)}
                                >
                                    <ItemText>{value.label}</ItemText>
                                </ItemButton>
                            )
                        })}
                    </PickerBox>
                </ModalBox>
            </Modal>
        </Container>
    );
}

export default Picker

