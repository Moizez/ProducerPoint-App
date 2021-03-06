import React, { useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'

import { AuthContext } from '../../contexts/auth'
import ActionModal from '../../components/Modals/ActionModal'

import { Container, Header, PageBox } from './styles'

const Settings = () => {
    const { logOut } = useContext(AuthContext)
    const [actionModal, setActionModal] = useState(false)

    const handleLogout = () => openActioModal()

    const handleConfirm = () => {
        openActioModal()
        logOut()
    }

    const openActioModal = () => setActionModal(true)
    const closeActionModal = () => setActionModal(false)

    return (
        <Container>

            <Modal
                animationType='fade'
                transparent={true}
                visible={actionModal}
            >
                <ActionModal
                    closeModal={closeActionModal}
                    confirmModal={handleConfirm}
                    title='Deseja realmente sair?'
                />
            </Modal>

            <Header>
                <Text style={styles.title}>Configurações</Text>
            </Header>

            <PageBox>
                <TouchableOpacity style={styles.item}>
                    <Icon name='bell' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Notificações</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item}>
                    <Icon name='help-circle' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Perguntas frequentes</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item}>
                    <Icon name='cellphone' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Contatos</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item}>
                    <Icon name='shield-lock' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Política de privacidade</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item}>
                    <Icon name='star' color={'#292b2c'} size={35} />
                    <Text style={styles.text}>Avaliar aplicativo</Text>
                </TouchableOpacity>

                <View style={{ width: '100%', height: 0.5, backgroundColor: '#adb5bd' }}></View>

                <TouchableOpacity style={styles.item} onPress={() => handleLogout()}>
                    <Icon name='exit-to-app' color={'#da1e37'} size={35} />
                    <Text style={styles.text}>Sair</Text>
                </TouchableOpacity>
            </PageBox>

            <View style={styles.versionContainer}>
                <Text>Producer Point</Text>
                <Text style={{ color: '#adb5bd', marginBottom: 12 }}>Producer Point v2021.07.05</Text>
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.2,
        backgroundColor: '#292b2c',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        color: '#FFF',

    },
    itemContainer: {
        flex: 1,
        margin: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        fontSize: 17,
        marginLeft: 15,
    },
    versionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e3e3e3'
    },
})

export default Settings