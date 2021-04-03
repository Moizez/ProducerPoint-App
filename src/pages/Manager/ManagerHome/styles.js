import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.main};
`;

export const Header = styled.SafeAreaView`
    width: 100%;
    height: 100px;
    background-color: ${props => props.theme.main};
`;

export const PageBox = styled.View`
    flex: 1;
    background-color: #e3e3e3;
    border-top-left-radius: 50px;
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
    flex: 1;
    justify-content: center;
    margin-top: 15px;
`;

export const ProfileName = styled.Text`
    color: #000;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const ProfileRole = styled.Text`
    color: #000;
    font-size: 13px;
    margin-top: 10px;
`;

export const ListTitle = styled.Text`
    color: #000;
    font-size: 14px;
    margin-top: 25px;
    text-align: center;
    font-weight: bold;
    font-variant:small-caps;
`;

export const FlatList = styled.FlatList`
    flex: 1;
`;

export const Divider = styled.View`
    height: 0.5px;
    background-color: #CCC;
    margin: 0 20px 10px 20px;
`;

export const ListTitleBox = styled.View`
    background-color: #e3e3e3;
`;


