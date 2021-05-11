import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.main};
`;

export const Header = styled.SafeAreaView`
    width: 100%;
    height: 100px;
    background-color: ${props => props.theme.main};
    padding: 10px;
`;

export const Title = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #000;
`;

export const PageBox = styled.View`
    flex: 1;
    background-color: #e3e3e3;
    border-top-left-radius: 20px;
    margin-top: -50px;
`;

export const ProfileBox = styled.View`
    flex-direction: row;
    margin-top: -30px;
`;

export const Avatar = styled.Image`
    width: 110px;
    height: 110px;
    margin-left: 30px;
    margin-right: 20px;
    border-radius: 20px;
    border-width: 4px;
    border-color: #FFF;
`;

export const ProfileNameBox = styled.View`
    width: 200px;
    justify-content: center;
    margin-top: 15px;
`;

export const ProfileName = styled.Text`
    color: #000;
    font-size: 16px;
    font-weight: bold;
`;

export const ProfileRole = styled.Text`
    color: #000;
    font-size: 13px;
    margin-top: 10px;
`;

export const ProfileInfo = styled.View`
    justify-content: center;
    margin-top: 15px;
`;

export const InfoBox = styled.View`
    justify-content: center;
    padding: 10px 20px 20px 20px;
`;

export const ProfileActivity = styled.Text`
    color: #000;
    font-size: 13px;
`;

export const Divider = styled.View`
    height: 0.5px;
    background-color: #CCC;
    margin: 0 20px 10px 20px;
`;

export const BoldText = styled.Text`
    font-size: 15px;
    font-weight: bold;
`;

export const Text = styled.Text`
    font-size: 15px;
    font-weight: normal;
`;

export const ButtonBox = styled.View`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
    width: 90%;
    height: 48px;
    background-color:  ${props => props.theme.main};
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;