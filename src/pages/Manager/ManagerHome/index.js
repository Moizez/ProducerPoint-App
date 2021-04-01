import React, { useEffect, useContext, Fragment } from 'react'

import { AuthContext } from '../../../contexts/auth'
import { RequestContext } from '../../../contexts/request'
import ProducersList from '../ProducersList'

import {
    Container, Header, PageBox, ProfileBox, Avatar, ProfileNameBox, ProfileName,
    ProfileRole, FlatList, ListTitle, Divider
} from './styles'

const ManagerHome = () => {

    const { user } = useContext(AuthContext)
    const { producers, loadProducers } = useContext(RequestContext)

    useEffect(() => {
        loadProducers()
    }, [])

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
                    ListHeaderComponent={producers &&
                        <Fragment>
                            <ListTitle>produtores cadastrados</ListTitle>
                            <Divider />
                        </Fragment>
                    }
                    stickyHeaderIndices={[0]}
                />

            </PageBox>

        </Container>
    );
}

export default ManagerHome