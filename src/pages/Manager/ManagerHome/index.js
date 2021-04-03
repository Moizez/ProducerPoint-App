import React, { useEffect, useContext, useState, Fragment } from 'react'
import { RefreshControl } from 'react-native'

import { AuthContext } from '../../../contexts/auth'
import { RequestContext } from '../../../contexts/request'
import ProducersList from '../ProducersList'

import {
    Container, Header, PageBox, ProfileBox, Avatar, ProfileNameBox, ProfileName,
    ProfileRole, FlatList, ListTitle, Divider, ListTitleBox, EmptyListCard, Title
} from './styles'

const ManagerHome = () => {

    const { user } = useContext(AuthContext)
    const { producers, loadProducers } = useContext(RequestContext)
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

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={producers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ProducersList data={item} />}
                    ListEmptyComponent={
                        <EmptyListCard>
                            <Title>Sem resultados</Title>
                        </EmptyListCard>
                    }
                    ListHeaderComponent={producers &&
                        <Fragment>
                            <ListTitleBox>
                                <ListTitle>produtores cadastrados</ListTitle>
                            </ListTitleBox>
                            <Divider style={{ elevation: 1}} />
                        </Fragment>
                    }
                    stickyHeaderIndices={[0]}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                />

            </PageBox>

        </Container>
    );
}

export default ManagerHome