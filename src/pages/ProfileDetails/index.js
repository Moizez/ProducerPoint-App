import React from 'react'
import { useNavigation } from '@react-navigation/native'


import {
    Container, Header, PageBox, Title, ProfileBox, Avatar, ProfileNameBox, ProfileName,
    ProfileRole, ProfileInfo, InfoBox, BoldText, Text, ButtonBox, BackButton, TextButton, Divider
} from './styles'

const ProfileDetails = ({ route }) => {

    const { data } = route.params
    const navigation = useNavigation()

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
                        <BoldText>Nascimento: <Text>15/12/1996</Text></BoldText>
                        <BoldText>Telefone: <Text>{data.phone}</Text></BoldText>
                        <BoldText>E-mail: <Text>{data.email}</Text></BoldText>
                        <BoldText>Atividade: <Text>{data.farmingActivity.activityName}</Text></BoldText>
                        <BoldText>Principal produto: <Text>{data.farmingActivity.productName}</Text></BoldText>
                        <BoldText>Renda média: <Text>{data.farmingActivity.averageCash}</Text></BoldText>
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