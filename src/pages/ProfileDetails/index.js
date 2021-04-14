import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaskService } from 'react-native-masked-text'
import { format } from 'date-fns'

import {
    Container, Header, PageBox, Title, ProfileBox, Avatar, ProfileNameBox, ProfileName,
    ProfileRole, ProfileInfo, InfoBox, BoldText, Text, ButtonBox, BackButton, TextButton, Divider
} from './styles'

const ProfileDetails = ({ route }) => {

    const { data } = route.params
    const navigation = useNavigation()
    const birthDate = format(Date.parse(data.birthDate), 'dd/MM/yyyy')
    const income = MaskService.toMask('money', data.farmingActivity.averageCash, {
        unit: 'R$ ',
        separator: ',',
        delimiter: '.'
    })

    const products = data.products.map(i => i.label)

    console.log(products)

    return (
        <Container>
            <Header />
            <PageBox>
                <ProfileBox>
                    <Avatar source={require('../../assets/images/avatar.jpg')} />
                    <ProfileNameBox>
                        <ProfileRole>{data.role === 0 ? 'Administrador' : 'Produtor'}</ProfileRole>
                        <ProfileName>{data.name}</ProfileName>
                    </ProfileNameBox>
                </ProfileBox>

                <ProfileInfo>
                    <Title>Informações pessoais</Title>
                    <Divider />
                    <InfoBox>
                        <BoldText>Apelido: <Text>{data.nickname}</Text></BoldText>
                        <BoldText>Nascimento: <Text>{birthDate}</Text></BoldText>
                        <BoldText>Telefone: <Text>{data.phone}</Text></BoldText>
                        <BoldText>E-mail: <Text>{data.email}</Text></BoldText>
                        <BoldText>Atividade: <Text>{data.farmingActivity.activityName}</Text></BoldText>
                        <BoldText>Produto{products.length > 1 && 's'}: <Text>{products.join(', ')}</Text></BoldText>
                        <BoldText>Renda média: <Text>{income}</Text></BoldText>
                        <BoldText>Período: <Text>{data.farmingActivity.period}</Text></BoldText>
                    </InfoBox>

                    <Title>Endereço</Title>
                    <Divider />
                    <InfoBox>
                        <BoldText>Cidade: <Text>{data.address.city}</Text></BoldText>
                        <BoldText>Estado: <Text>{data.address.uf}</Text></BoldText>
                        <BoldText>CEP: <Text>{data.address.zipCode}</Text></BoldText>
                        <BoldText>Bairro: <Text>{data.address.district}</Text></BoldText>
                        <BoldText>Rua: <Text>{data.address.street}</Text></BoldText>
                        <BoldText>Número da casa: <Text>{data.address.houseNumber}</Text></BoldText>
                        <BoldText>Referência: <Text>{data.address.reference}</Text></BoldText>
                    </InfoBox>

                </ProfileInfo>

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