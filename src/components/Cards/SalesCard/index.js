import React, { useState } from 'react'
import { Animated, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import 'moment/locale/pt-br'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import Api from '../../../services/api'

import {
    Container, CardBox, BoldText, ItemBox, IconBox, LeftBox, Divider
} from './styles'

const SalesCard = ({ data, load }) => {

    let date = moment(data?.date).locale('pt-br').format('L')
    const valor = data?.valor
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

    const handleDelete = async () => {
        await Api.deleteSales(data.id)
        load()
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
                    <Divider />
                    <ItemBox>
                        <BoldText>Produto: <Text style={styles.text}>{data.product.label}</Text></BoldText>
                        <BoldText>Parâmetro: <Text style={styles.text}>{data.parameter}</Text></BoldText>
                        <BoldText>Quantidade: <Text style={styles.text}>{data.quantity}</Text></BoldText>
                        <BoldText>Valor: <Text style={styles.text}>{valor}</Text></BoldText>
                        <BoldText>Cidade: <Text style={styles.text}>{data.city}</Text></BoldText>
                        <BoldText>Data: <Text style={styles.text}>{date}</Text></BoldText>
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

export default SalesCard