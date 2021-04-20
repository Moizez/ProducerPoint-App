import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`;

export const InputTitle = styled.Text`
    font-size: 16px;
    color: #292b2c;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 5px;
`;

export const InputContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const InputBox = styled.View`
    width: 80%;
    height: 60px;
    border-radius: 20px;
    background-color: #DDD;
    margin-bottom: 10px;
    justify-content: space-around;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#007200',
})`
    width: 100%;
    font-size: 18px;
    color: #292b2c;
    padding-left: 15px;
`;

export const RecoverButton = styled.TouchableOpacity`
    height: 60px;
    width: 80%;
    background-color: #007200;
    border-radius: 20px;
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
    margin-left: 20px;
`;

export const Text = styled.Text`
    margin: 5px 0 0 15px;
    font-size: 11px;
    color: #007200;
`;


