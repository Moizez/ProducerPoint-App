import React, { useEffect, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '../../../contexts/auth'
import { RequestContext } from '../../../contexts/request'
import Loader from '../../../components/Loader'

import SalesProducer from '../../Manager/SaleProducer'
import FormSaleProducerModal from '../../../components/Modals/FormSaleProducerModal'

import {
    Container, Header, PageBox, ProfileBox, Avatar, ProfileNameBox, ProfileName,
    ProfileRole, FlatList, ListTitle, Divider, ListTitleBox, EmptyListCard, Title, ButtonBox,
    BackButton, TextButton, Modal,
} from './styles'

const ListSalesProducer = ({ route }) => {

    const data  = route.params

    const navigation = useNavigation()

    const { user } = useContext(AuthContext)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [salesproducer, setSalesProducer] = useState([])
    const { loading } = useContext(RequestContext)

    const [saleProducerModal, setSaleProducerModal] = useState(false)

    useEffect(() => {

    }, []);

    const onRefreshList = () => {
        setIsRefreshing(true)
        getSalesProducer()
        setIsRefreshing(false)
    }

    const getSalesProducer = async () => {

    }

    const openSaleProducerModal = () => setSaleProducerModal(true)
    const closeSaleProducerModal = () => setSaleProdocerModal(false)

    return (
        <Container>
            <Header />

            <PageBox>
                <ProfileBox>
                    <Avatar source={require('../../../assets/images/avatar.jpg')} />
                    <ProfileNameBox>
                        <ProfileRole>{data.route.role === 0 ? 'Administrador' : 'Produtor'}</ProfileRole>
                        <ProfileName>{data.route.name}</ProfileName>
                    </ProfileNameBox>
                </ProfileBox>
                <ListTitleBox>
                    <ListTitle>vendas do produtor</ListTitle>
                </ListTitleBox>
                <Divider style={{ elevation: 1 }} />
                <ButtonBox onPress={() => openSaleProducerModal}>
                    <BackButton>
                        <Icon
                            name='plus'
                            color={'#FFF'}
                            size={30}
                        />
                    </BackButton>
                </ButtonBox>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={salesproducer}
                    keyExtractor={(item) => item.id}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                    renderItem={({ item }) => (<SalesProducer data={item} />)}
                    ListEmptyComponent={
                        <EmptyListCard>
                            <Title>Nenhuma venda cadastrada para esse produtor</Title>
                        </EmptyListCard>
                    }
                />  

                <ButtonBox>
                    <BackButton onPress={() => navigation.goBack()}>
                        <TextButton>Voltar</TextButton>
                    </BackButton>
                </ButtonBox>

                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={saleProducerModal}
                >
                    <FormSaleProducerModal 
                        closeModal={closeSaleProducerModal}
                        bgColor={'red'}
                    />
                    
                </Modal> 

            </PageBox>

            {loading && <Loader />}         
        </Container>
    );
}

export default ListSalesProducer;