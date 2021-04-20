import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    background-color: #FFF;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.Image`
    height: 180px;
    width: 180px;
`;

export const Text = styled.Text`
    margin: 5px 0 0 15px;
    font-size: 11px;
    color: #007200;
`;

export const Title = styled.Text`
    font-size: 18px;
    margin-bottom: 12px;
    color: #292b2c;
    text-align: center;
    font-weight: bold;
    font-variant:small-caps;
`;

export const InputTitle = styled.Text`
    font-size: 16px;
    color: #292b2c;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 5px;
`;

export const InputBox = styled.View`
    width: 80%;
    flex-direction: row;
    border-radius: 20px;
    background-color: #DDD;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#007200',
})`
    width: 100%;
    font-size: 18px;
    color: #292b2c;
    padding-left: 15px;
`;

export const InputItemBox = styled.View`
    height: 60px;
    width: 85%;
    justify-content: space-around;
`;

export const IconBox = styled.TouchableOpacity`
    height: 60px;
    width: 15%;
    align-items: center;
    justify-content: center;
    background-color: #CCC;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
`;

export const Button = styled.TouchableOpacity`
    height: 60px;
    width: 80%;
    background-color: #007200;
    border-radius: 20px;
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