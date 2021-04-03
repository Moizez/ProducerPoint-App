import React from 'react'

import { Container, Title } from './styles'

const ProfileDetails = ({ route }) => {

    const { data } = route.params

    return (
        <Container>
            <Title>{data.name}</Title>
        </Container>
    );
}

export default ProfileDetails