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

const ProducersList = ({ data }) => {

    const { name, farmingActivity: { activityName: { label } } } = data

    const navigation = useNavigation()
    const { loadProducers } = useContext(RequestContext)
    const [warningModal, setWarningModal] = useState(false)

    const [confirmation, setConfirmation] = useState(false)
    const swipeableRef = useRef(null);

    const handleDelete = async () => {
        const response = await api.deleteProducer(data.id)

        if (response.status === 200) {
            loadProducers()
        } else {
            openWarningModal()
        }
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
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

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
                    onPress={() => navigation.navigate('ProfileDetails', { id: data.id })}
                >
                    <BoldText>Nome: <Text style={styles.text}>{data.name}</Text></BoldText>
                    <BoldText>Apelido: <Text style={styles.text}>{data.nickname}</Text></BoldText>
                    <BoldText>Atividade: <Text style={styles.text}>{data.farmingActivity?.activityName?.label}(a)</Text></BoldText>
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
                    activityName={label}
                    bgColor={true}
                    closeSwipeable={closeSwipeable}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >

                <WarningModal
                    closeModal={closeWarningModal}
                    message='Erro ao excluir!'
                    bgColor={true}
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