import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.main};
`;

export const Header = styled.SafeAreaView`
    width: 100%;
    height: 100px;
    background-color: ${props => props.theme.main};
    align-items: center;
    margin-top: 20px;
`;

export const Title = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;

export const PageBox = styled.ScrollView`
    flex: 1;
    background-color: #e3e3e3;
    border-top-left-radius: 50px;
    margin-top: -50px;
`;

export const FormContainer = styled.View`
    flex: 1;
`;

export const FormBox = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

export const FormTitle = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #000;
`;

export const InputBox = styled.View`
    width: 90%;
    height: 48px;
    border-radius: 5px;
    background-color: #CCC;
    margin-bottom: 10px;
    justify-content: space-around;
`;

export const HalfInputBox = styled.View`
    width: 48%;
    height: 48px;
    border-radius: 5px;
    background-color: #CCC;
    margin-bottom: 10px;
    justify-content: space-around;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#495057',
})`
    width: 100%;
    font-size: 18px;
    color: #292b2c;
    padding-left: 15px;
`;

export const Text = styled.Text`
    margin: 5px 0 0 3px;
    font-size: 11px;
    color: #495057;
`;

export const InputsBox = styled.View`
    width: 90%;
    height: 48px;
    flex-direction: row;
    border-radius: 5px;
    margin-bottom: 10px;
    justify-content: space-between;
`;

export const IconBox = styled.TouchableOpacity`
    height: 48px;
    width: 15%;
    align-items: center;
    justify-content: center;
    margin-right: 25px;
    background-color: #BBB;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
`;

export const ErrorBox = styled.View`
    width: 90%;
    flex-direction: row;
    justify-content: space-around;
`;

export const ErrorText = styled.Text`
    font-size: 11px;
    color: #c1121f;
    margin-top: -8px;
    margin-bottom: 3px;
`;

export const ButtonBox = styled.View`
    width: 90%;
    height: 48px;
    border-radius: 5px;
    margin-bottom: 70px;
    justify-content: space-between;
`;

export const SaveButton = styled.TouchableOpacity`
    width: 100%;
    height: 48px;
    flex-direction: row;
    background-color: #2a9d8f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const ResetForm = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;

export const Modal = styled.Modal``;

export const Divider = styled.View`
    width: 85%;    
    height: 0.5px;
    background-color: #CCC;
    margin: 8px 0 15px 0;
`;
