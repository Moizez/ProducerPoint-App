import React, { useState } from 'react'
import { Animated, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { format } from 'date-fns'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const locale_br = require('date-fns/locale/pt-BR')
import Api from '../../../services/api'

import {
    Container, CardBox, BoldText, ItemBox, IconBox, LeftBox, Divider
} from './styles'

const TaskCard = ({ data, loadTasks }) => {

    const [check, setCheck] = useState(data.status)
    const date = format(Date.parse(data.date), 'PPPP', { locale: locale_br })

    const handleStatusTask = async () => {
        setCheck(!check)
        await Api.setStateTasks(data.id, check)
    }

    const handleDelete = async () => {
        await Api.deleteTask(data.id)
        loadTasks()
    }

    const LeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        return (
            <LeftBox style={{ elevation: 5 }}>
                <Animated.Text style={[styles.actionsText, { marginLeft: 10, transform: [{ scale }] }]}>Remover</Animated.Text>
            </LeftBox>
        )
    }

    return (
        <Swipeable
            renderLeftActions={LeftActions}
            onSwipeableLeftOpen={handleDelete}
            friction={1.3}
        >
            <Container>
                <CardBox style={{ elevation: 5 }}>
                    <IconBox onPress={handleStatusTask}>
                        <Icon
                            name={check ? 'check-circle' : 'checkbox-blank-circle-outline'}
                            color={check ? '#2a9d8f' : '#000'}
                            size={30} />
                    </IconBox>
                    <Divider />
                    <ItemBox>
                        <BoldText style={{ textDecorationLine: check ? 'line-through' : 'none' }}>Tarefa: <Text style={styles.text}>{data.description}</Text></BoldText>
                        <BoldText style={{ textDecorationLine: check ? 'line-through' : 'none' }}>Data: <Text style={styles.text}>{date}</Text></BoldText>
                    </ItemBox>
                </CardBox>
            </Container>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 'normal'
    },
    actionsText: {
        fontSize: 15,
        color: '#FFF',
        fontWeight: 'bold',
    }
})

export default TaskCard