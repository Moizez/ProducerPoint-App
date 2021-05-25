import React, { useState, useContext, useRef, Fragment } from 'react'
import { Animated, Text, StyleSheet, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import api from '../../../services/api'
import { RequestContext } from '../../../contexts/request'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import WarningModal from '../../../components/Modals/WarningModal'

import {
    Container, BoldText, LeftBox, RightBox
} from './styles'

const SalesProducer = ({ data }) =>{

    return (
        <Fragment>
            <Swipeable
                ref={swipeableRef}
                renderLeftActions={LeftActions}
                onSwipeableLeftOpen={openConfirmatioModal}
                renderRightActions={RightActions}
                friction={1.3}
            >
                <Container
                    style={{ elevation: 5 }}
                    activeOpacity={7}
                >
                    <BoldText>Data: <Text style={styles.text}>{data.date}</Text></BoldText>
                    <BoldText>Quantidade: <Text style={styles.text}>{data.quatity}</Text></BoldText>
                    <BoldText>Parametro: <Text style={styles.text}>{data.parameter}</Text></BoldText>
                    <BoldText>Valor: <Text style={styles.text}>{data.valor}</Text></BoldText>
                    <BoldText>Cidade: <Text style={styles.text}>{data.city}</Text></BoldText>
                </Container>
            </Swipeable>
        </Fragment>
    );

}

export default SalesProducer;