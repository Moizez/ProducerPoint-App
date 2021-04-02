import React from 'react'
import styled from 'styled-components/native';

const Loader = () => {

    return (
        <Container>
            <Load>
                <Indicator color='#FFF' size="large" />
                <Text>Carregando...</Text>
            </Load>
        </Container>
    );
}

export default Loader

const Container = styled.View`
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

const Load = styled.View`
    width: 200px;
    height: 100px;
    background-color: #292b2c;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    padding: 20px;
    margin-bottom: 30px;
`;

const Indicator = styled.ActivityIndicator`
    margin-top: 5px;
    margin-bottom: 10px;
`;

const Text = styled.Text`
    color: #FFF;
    text-align: center;
`;


