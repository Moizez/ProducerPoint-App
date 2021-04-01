import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container } from './styles'

const FormButton = ({ onPress, focused }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Container
                focused={focused}
                colors={
                    focused
                        ? ['#52b788', '#2d6a4f']
                        : ['#0077b6', '#022c6f']
                }
            >
                <Icon
                    name='plus'
                    color={focused ? '#FFF' : '#92929C'}
                    size={30} />
            </Container>
        </TouchableWithoutFeedback>
    );
}

export default FormButton