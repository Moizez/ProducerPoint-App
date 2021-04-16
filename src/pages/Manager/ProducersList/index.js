import React, { useContext } from 'react'
import { Animated, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import Api from '../../../services/api'
import { RequestContext } from '../../../contexts/request'

import {
    Container, CardBox, BoldText, LeftBox, RightBox
} from './styles'

const ProducersList = ({ data }) => {

    const navigation = useNavigation()
    const { loadProducers } = useContext(RequestContext)

    const handleDelete = async () => {
        await Api.deleteProducer(data.id)
        loadProducers()
    }

    const LeftActions = (progress, dragX) => {

        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        return (
            <LeftBox>
                <Animated.Text style={[styles.actionsText, { marginLeft: 10, transform: [{ scale }] }]}>Remover</Animated.Text>
            </LeftBox>
        )
    }

    const RightActions = () => {

        return (
            <RightBox onPress={() => navigation.navigate('ProducerUpdate', { data: data })}>
                <Animated.Text style={styles.actionsText}>Editar</Animated.Text>
            </RightBox>
        )
    }

    return (
        <Swipeable
            renderLeftActions={LeftActions}
            onSwipeableLeftOpen={handleDelete}
            renderRightActions={RightActions}
        >
            <Container>
                <CardBox
                    style={{ elevation: 5 }}
                    onPress={() => navigation.navigate('ProfileDetails', { data: data })}
                >
                    <BoldText>Nome: <Text style={styles.text}>{data.name}</Text></BoldText>
                    <BoldText>Apelido: <Text style={styles.text}>{data.nickname}</Text></BoldText>
                    <BoldText>Atividade: <Text style={styles.text}>{data.farmingActivity.activityName}(a)</Text></BoldText>
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

export default ProducersList