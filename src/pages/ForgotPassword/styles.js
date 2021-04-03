import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    padding-left: 40px;
    padding-right: 40px;
`;

export const Titulo = styled.Text`
    font-size: 18px;
    margin-bottom: 12px;
    color: #292b2c;
    text-align: center;
`;

export const InputContainer = styled.View`
    flex: 1;
    justify-content: center;
`;

export const InputBox = styled.View`
    width: 100%;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#495057',
})`
    width: 100%;
    font-size: 18px;
    color: #292b2c;
    padding-left: 15px;
`;

export const Button = styled.TouchableOpacity`
    height: 60px;
    background-color: #007200;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const RecoverText = styled.Text`
    font-size: 20px;
    color: #FFF;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    margin-top: 20px;
`;

export const Text = styled.Text`
    margin: 5px 0 0 3px;
    font-size: 11px;
    color: #495057;
`;


