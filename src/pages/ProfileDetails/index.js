import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TabView, TabBar } from 'react-native-tab-view'
import api from '../../services/api'

import {
    Container, Header, PageBox, ProfileBox, Avatar, ProfileNameBox, ProfileName,
    ProfileRole, Text, ButtonBox, BackButton, TextButton
} from './styles'

import ProducerDetails from './ProducerDetails'
import ProducerSales from './ProducerSales'

const initialLayout = { width: Dimensions.get('window').width };

const ProfileDetails = ({ route }) => {


    const { id } = route.params
    const navigation = useNavigation()

    const [producer, setProducer] = useState([])

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Informação' },
        { key: 'second', title: 'Vendas' },
    ])

    const loadProducer = async () => {
        const response = await api.getProduceById(id)
        setProducer(response.data)
    }

    useEffect(() => {
        loadProducer()
    }, [])


    const renderTabBar = props => (
        <TabBar {...props}
            renderLabel={({ route, color }) => (
                <Text style={{ color, fontSize: 15, height: 30 }}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: '#FFF' }}
            style={{ backgroundColor: '#292b2c', height: 35, marginTop: 20 }}
        />
    )

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ProducerDetails data={producer} />
            case 'second':
                return <ProducerSales producer={producer} />
            default:
                return null;
        }
    }

    return (
        <Container>
            <Header />
            <PageBox>
                <ProfileBox>
                    <Avatar source={require('../../assets/images/avatar.jpg')} />
                    <ProfileNameBox>
                        <ProfileRole>{producer?.role === 0 ? 'Administrador' : 'Produtor'}</ProfileRole>
                        <ProfileName>{producer?.name}</ProfileName>
                    </ProfileNameBox>
                </ProfileBox>

                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={renderTabBar}
                />

                <ButtonBox>
                    <BackButton onPress={() => navigation.goBack()}>
                        <TextButton>Voltar</TextButton>
                    </BackButton>
                </ButtonBox>
            </PageBox>
        </Container>
    );
}

export default ProfileDetails