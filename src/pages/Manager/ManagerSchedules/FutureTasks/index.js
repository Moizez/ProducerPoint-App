import React, { useState } from 'react'
import { RefreshControl } from 'react-native'

import TaskCard from '../../../../components/Cards/TaskCard'
import Loader from '../../../../components/Loader'

import {
    Container, PageBox, FlatList, Title, EmptyListCard
} from './styles'

const FutureTasks = ({ data, loadPage, loading }) => {

    const [isRefreshing, setIsRefreshing] = useState(false)

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadPage()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <PageBox>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TaskCard
                            data={item}
                            loadTasks={loadPage}
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
                            <Title>Sem tarefas futuras</Title>
                        </EmptyListCard>
                    }
                />
            </PageBox>
            {loading && <Loader />}
        </Container>
    );
}

export default FutureTasks