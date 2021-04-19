import React, { useState, useContext, useRef, Fragment } from 'react'
import { Animated, Text, StyleSheet, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import Api from '../../../services/api'
import { RequestContext } from '../../../contexts/request'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'

import {
    Container, BoldText, LeftBox, RightBox
} from './styles'

const ProducersList = ({ data }) => {

    const { name, farmingActivity: { activityName } } = data

    const navigation = useNavigation()
    const { loadProducers } = useContext(RequestContext)

    const [confirmation, setConfirmation] = useState(false)
    const swipeableRef = useRef(null);

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
            <LeftBox style={{ elevation: 5 }}>
                <Animated.Text style={[styles.actionsText, { marginLeft: 10, transform: [{ scale }] }]}>Remover</Animated.Text>
            </LeftBox>
        )
    }

    const RightActions = () => {
        return (
            <RightBox style={{ elevation: 5 }} onPress={() => navigation.navigate('ProducerUpdate', { data: data, closeSwipeable: closeSwipeable })}>
                <Animated.Text style={styles.actionsText}>Editar</Animated.Text>
            </RightBox>
        )
    }

    const closeSwipeable = () => {
        swipeableRef.current.close();
    }

    const openConfirmatioModal = () => setConfirmation(true)
    const closeConfirmatioModal = () => setConfirmation(false)

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
                    onPress={() => navigation.navigate('ProfileDetails', { data: data })}
                >
                    <BoldText>Nome: <Text style={styles.text}>{data.name}</Text></BoldText>
                    <BoldText>Apelido: <Text style={styles.text}>{data.nickname}</Text></BoldText>
                    <BoldText>Atividade: <Text style={styles.text}>{data.farmingActivity.activityName}(a)</Text></BoldText>
                </Container>
            </Swipeable>

            <Modal
                animationType='fade'
                transparent={true}
                visible={confirmation}
            >
                <ConfirmationModal
                    closeModal={closeConfirmatioModal}
                    confirmModal={handleDelete}
                    name={name}
                    activityName={activityName}
                    bgColor={true}
                    closeSwipeable={closeSwipeable}
                />
            </Modal>

        </Fragment>
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