import React, { useState, useEffect, Fragment } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import api from '../../../services/api'
import ProducersList from '../ProducersList'
import Loader from '../../../components/Loader'

import {
    Container, Header, PageBox, SearchBox, SearchButton, Input,
    FlatList, ListTitle, Divider, ListTitleBox, EmptyListCard, Title
} from './styles'

const SearchProducers = () => {

    const [text, setText] = useState('')
    const [producers, setProducers] = useState([])
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasOrder, setHasOrder] = useState(false)

    const loadProducers = async () => {
        const response = await api.getAllProducers()
        setProducers(response.data)
        setList(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadProducers()
    }, [])

    useEffect(() => {
        setHasOrder(false)
        if (text) {
            setList(
                producers?.filter(i =>
                (i.name?.toLowerCase()
                    .indexOf(text.toLowerCase()) > -1 || i.nickname?.toLowerCase()
                        .indexOf(text.toLowerCase()) > -1)
                )
            )
        } else {
            setList(producers)
        }
    }, [text])

    const handleOrderList = () => {
        setHasOrder(true)
        let newList = [...producers]
        newList.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0)
        setList(newList)
    }

    return (
        <Container>
            <Header>
                <SearchBox>
                    <Input
                        placeholder='Buscar produtor'
                        value={text}
                        onChangeText={(text) => setText(text)}
                    />
                    <SearchButton color={hasOrder} onPress={handleOrderList}>
                        <Icon name='order-alphabetical-ascending' size={28} color='#FFF' />
                    </SearchButton>
                </SearchBox>
            </Header>

            <PageBox>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={list}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProducersList data={item} />}
                    ListHeaderComponent={
                        <Fragment>
                            <ListTitleBox>
                                <ListTitle>resultado da busca</ListTitle>
                            </ListTitleBox>
                            <Divider style={{ elevation: 1 }} />
                        </Fragment>
                    }
                    ListEmptyComponent={
                        <EmptyListCard>
                            <Title>Sem resultados</Title>
                            <Title style={{ fontSize: 15 }}>Dica: busque pelo nome ou apelido.</Title>
                        </EmptyListCard>
                    }
                    stickyHeaderIndices={[0]}
                />
            </PageBox>
            {loading && <Loader />}
        </Container>
    );
}

export default SearchProducers