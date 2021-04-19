import React, { useEffect, useContext, useState } from 'react'
import { RefreshControl } from 'react-native'

import { AuthContext } from '../../../contexts/auth'
import { RequestContext } from '../../../contexts/request'
import ProducersList from '../ProducersList'
import Loader from '../../../components/Loader'

import {
    Container, Header, PageBox, ProfileBox, Avatar, ProfileNameBox, ProfileName,
    ProfileRole, FlatList, ListTitle, Divider, ListTitleBox, EmptyListCard, Title
} from './styles'

const ManagerHome = () => {

    const { user } = useContext(AuthContext)
    const { producers, loadProducers, loading } = useContext(RequestContext)
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        const interval = loadProducers()
        return () => clearInterval(interval)
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadProducers()
        setIsRefreshing(false)
    }

    return (
        <Container>
            <Header />

            <PageBox>
                <ProfileBox>
                    <Avatar source={require('../../../assets/images/avatar.jpg')} />
                    <ProfileNameBox>
                        <ProfileRole>{user.role === 0 ? 'Administrador' : 'Produtor'}</ProfileRole>
                        <ProfileName>{user.name}</ProfileName>
                    </ProfileNameBox>
                </ProfileBox>
                <ListTitleBox>
                    <ListTitle>produtores cadastrados</ListTitle>
                </ListTitleBox>
                <Divider style={{ elevation: 1 }} />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={producers}
                    keyExtractor={(item) => item.id}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                    renderItem={({ item }) => (
                        <ProducersList data={item} />
                    )}
                    ListEmptyComponent={
                        <EmptyListCard>
                            <Title>Nenhum produtor cadastrado</Title>
                        </EmptyListCard>
                    }
                />

            </PageBox>
            {loading && !isRefreshing && <Loader />}
        </Container>
    );
}

export default ManagerHome