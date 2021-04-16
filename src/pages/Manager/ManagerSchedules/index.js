import React, { useState, Fragment } from 'react'
import { RefreshControl } from 'react-native'
import TasksList from '../TasksList'

import {
    Container, Header, PageBox, FlatList, Title, ListTitle, Divider,
    ListTitleBox, EmptyListCard
} from './styles'

const ManagerSchedules = () => {

    const [isRefreshing, setIsRefreshing] = useState(false)

    const onRefreshList = () => {
        setIsRefreshing(true)
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header>
                <Title style={{ color: '#FFF' }}>Atividades</Title>
            </Header>
            <PageBox>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={null}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TasksList data={item} />}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                    ListHeaderComponent={
                        <Fragment>
                            <ListTitleBox>
                                <ListTitle>lista de tarefas</ListTitle>
                            </ListTitleBox>
                            <Divider style={{ elevation: 1 }} />
                        </Fragment>
                    }
                    ListEmptyComponent={
                        <EmptyListCard>
                            <Title>Sem resultados</Title>
                        </EmptyListCard>
                    }
                    stickyHeaderIndices={[0]}
                />
            </PageBox>
        </Container>
    );
}

export default ManagerSchedules