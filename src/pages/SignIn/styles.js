import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #FFF;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.Image`
    height: 180px;
    width: 180px;
`;

export const Title = styled.Text`
    font-size: 18px;
    margin-bottom: 12px;
    color: #292b2c;
    text-align: center;
    font-weight: bold;
    font-variant:small-caps;
`;

export const InputBox = styled.View`
    width: 100%;
    padding: 40px;
`;

export const Button = styled.TouchableOpacity`
    height: 60px;
    background-color: #007200;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const TextButton = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const Link = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const TextLink = styled.Text`
    font-size: 16px;
    color: #268596;
`;

export const TextLinkBold = styled.Text`
    font-size: 16px;
    color: #268596;
    font-weight: bold;
`; 