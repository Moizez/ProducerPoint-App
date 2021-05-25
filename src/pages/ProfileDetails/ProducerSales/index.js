import React, { useState } from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'

import SalesCard from '../../../components/Cards/SalesCard'

import {
    Container, PageBox, FlatList, Title, EmptyListCard
} from './styles'

const ProducerSales = ({ data, loadPage }) => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [salesModal, SetSalesModal] = useState(false)

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadPage()
        setIsRefreshing(false)
    }

    const openSalesModal = () => setSalesModal(true)
    const closeSalesModal = () => setSalesModal(false)

    return (
        <Container>
            <PageBox>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <SalesCard
                            data={item}
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