import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'

import { Container , Title, PickerBox} from './styles'

const Picker = ({title}) => {

    const [list, setList] = useState([])
    const [selectedPicker, setSelectedPicker] = useState('')
    const [show, setShow] = useState(false)

    const setPickerValue = (value) => {
        setSelectedPicker(value)
    }

    const openPicker = () => setShow(true)
    const closePicker = () => setShow(false)

    const pickerValues = [
        {
            title: 'Chicken',
            value: 'chicken'
        },
        {
            title: 'Eggs',
            value: 'eggs'
        },
        {
            title: 'Vegetables',
            value: 'vegetables'
        }
    ]

    return (
        <Container style={styles.container}>
            <Title>The default value is {title}</Title>

            <PickerBox>
                <View style={{
                    margin: 20, padding: 20,
                    backgroundColor: '#efefef',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    alignItems: 'center',
                    position: 'absolute'
                }}>
                    <Text>Please pick a value</Text>
                    {pickerValues.map((value, index) => {
                        <TouchableHighlight key={index} onPress={() => setPickerValue(value)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <Text>{value.title}</Text>
                        </TouchableHighlight>
                    })}
                </View>
            </PickerBox>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Picker
