import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.main};
`;

export const Header = styled.SafeAreaView`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.main};
    padding: 10px;
    margin-top: 10px;
`;

export const Title = styled.Text`
    color: #5c5c5c;
    font-size: 20px;
`;