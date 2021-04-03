import React from 'react'
import styled from 'styled-components/native'

const InputBox = styled.View`
    width: 100%;
    height: 60px;
    background-color: #DDD;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #007200;
    margin-left: 10px;
`;

export default ({ IconSvg, placeholder, value, onChangeText, password }) => {
    return (
        <InputBox>
            <Input
                placeholder={placeholder}
                placeholderTextColor='#4c956c'
                autoCorrect={false}
                autoCapitalize='none'
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
            />
        </InputBox>
    );
}