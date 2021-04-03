import React, { useState, useEffect, Fragment } from 'react'
import { RefreshControl, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Api from '../../../services/api'
import ProducersList from '../ProducersList'
import WarningModal from '../../../components/Modals/WarningModal'
import Loader from '../../../components/Loader'

import {
    Container, Header, PageBox, SearchBox, SearchButton, Input,
    FlatList, ListTitle, Divider, ListTitleBox, EmptyListCard, Title
} from './styles'

const SearchProducers = () => {

    const [text, setText] = useState('')
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [producer, setProducer] = useState([])

    const findProducer = async () => {
        if (text == '') {
            setTypeMessage('Preencha um nome!')
            openWarningModal()
        } else {
            setLoading(true)
            const response = await Api.findProducersByNameOrNickname(text)
            setProducer(response)
            setText('')
            setLoading(false)
        }
    }

    const onRefreshList = () => {
        setIsRefreshing(true)
        findProducer()
        setIsRefreshing(false)
    }

    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    return (
        <Container>
            <Header>
                <SearchBox>
                    <Input
                        placeholder='Buscar produtor'
                        value={text}
                        onChangeText={(text) => setText(text)}
                    />
                    <SearchButton onPress={findProducer}>
                        <Icon name='magnify' size={28} color='#FFF' />
                    </SearchButton>
                </SearchBox>
            </Header>

            <PageBox>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={producer}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProducersList data={item} />}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                    ListHeaderComponent={
                        <Fragment>
                            <ListTitleBox>
                                <ListTitle>resultado da busca</ListTitle>
                            </ListTitleBox>
                            <Divider style={{ elevation: 1}} />
                        </Fragment>
                    }
                    ListEmptyComponent={
                        <EmptyListCard>
                            <Title>Sem resultados</Title>
                            <Title style={{fontSize: 15}}>Dica: busque pelo nome ou apelido.</Title>
                        </EmptyListCard>
                    }
                    stickyHeaderIndices={[0]}
                />
            </PageBox>
            {loading && <Loader />}

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    bgColor={true}
                />
            </Modal>
        </Container>
    );
}

export default SearchProducers