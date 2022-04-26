import React, { useState, useEffect } from 'react'
import { RefreshControl, StyleSheet, Modal } from 'react-native'
import { FAB } from 'react-native-paper'

import SalesCard from '../../../components/Cards/SalesCard'

import Api from '../../../services/api'

import {
    Container, PageBox, FlatList, Title, EmptyListCard
} from './styles'

import SalesModal from '../../../components/Modals/SalesModal/'

const ProducerSales = ({ loadPage, producer, salesProducer }) => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [salesModal, setSalesModal] = useState(false)
    const [salesByProducer, setSalesByProducer] = useState([])

    useEffect(() => {
        loadSales()
    }, [])

    const loadSales = async () => {
        const response = await Api.getSalesByProducer(producer.id)
        setSalesByProducer(response.data)
    }

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadSales()
        setIsRefreshing(false)
    }

    const openSalesModal = () => setSalesModal(true)
    const closeSalesModal = () => setSalesModal(false)

    return (
        <Container>
            <PageBox>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={salesByProducer}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <SalesCard
                            data={item}
                            load={loadSales}
                        />
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefreshList}
                        />
                    }
                    ListEmptyComponent={
                        <EmptyListCard>
                            <Title>Nenhuma venda registrada</Title>
                        </EmptyListCard>
                    }
                />
            </PageBox>
            <FAB
                label='Venda'
                style={styles.fab}
                icon="plus"
                onPress={openSalesModal}
            />
            <Modal
                animationType='slide'
                transparent={true}
                visible={salesModal}
            >
                <SalesModal
                    closeModal={closeSalesModal}
                    confirmModal={null}
                    bgColor={true}
                    producer={producer}
                    load={loadSales}
                />
            </Modal>
        </Container>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#2a9d8f',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 10,
    },
})

export default ProducerSales