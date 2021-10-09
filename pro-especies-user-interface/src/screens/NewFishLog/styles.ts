import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from '@expo/vector-icons';

export const NewFishLogContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.background};
`
export const ImageContainer = styled.TouchableOpacity`
    align-self: center;
    align-items: center;
    flex-direction: row;
`

export const FishLogImage = styled.Image`
    align-self: center;
    margin-top: ${RFValue(52,640)}px;
    border-radius: ${RFValue(88,640)}px;
    height: ${RFValue(123, 640)}px;
`
export const TopIcon = styled(MaterialIcons)`
    font-size: ${RFValue(12, 640)}px;
    color: ${({ theme }) => theme.colors.on_primary};
    margin-top: ${RFValue(4,640)}px;
    
`
export const IconBars = styled(MaterialIcons)`
    font-size: ${RFValue(24, 640)}px;
    color: ${({ theme }) => theme.colors.on_primary};
    margin-top: ${RFValue(4,640)}px;
`
export const TextClick = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(12,640)}px;
    line-height: ${RFValue(18,640)}px;
    color: ${({ theme }) => theme.colors.on_primary};
    margin-top: ${RFValue(4,640)}px;
    text-align: center;  
`
export const InputContainer = styled.View`
    align-self: center;
    text-align: left;
    align-items: center;
    margin-top:${RFValue(33,640)}px;
`
export const InputView = styled.View`
    align-self: center;
    align-items: center;
    height: ${RFValue(39, 640)}px;
    flex-direction: row;
    border:  ${RFValue(1, 640)}px;
    border-radius: ${RFValue(5, 640)}px;
    margin-top: ${RFValue(10, 640)}px;
`
export const InputBox = styled.View`
    margin-bottom: ${RFValue(32, 640)}px;
`
export const Input = styled.TextInput`
    height: ${RFValue(39, 640)}px;
    width: ${RFValue(258, 640)}px;
    flex-direction: row;
    justify-content: flex-start;    
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12, 640)}px;
    margin-left: ${RFValue(4, 640)}px;
`
export const CentralizerBoxView = styled.View`
    justify-content: space-between;
    height: ${RFValue(39, 640)}px;
    flex-direction: row;
    margin-top: ${RFValue(10, 640)}px;
`
export const HalfInputView = styled.View`
    align-items: center;
    height: ${RFValue(39, 640)}px;
    width: ${RFValue(140, 640)}px;
    flex-direction: row;
    margin-right: ${RFValue(10, 640)}px;
    border:  ${RFValue(1, 640)}px;
    border-radius: ${RFValue(5, 640)}px;
`
export const SendButtonView = styled.View`
    align-items: center;
    margin-top: ${RFValue(20, 640)}px;
    padding-bottom:${RFValue(20, 640)}px;
`
export const SendButton = styled.TouchableOpacity`
    width: ${RFValue(156, 640)}px;
    height: ${RFValue(39, 640)}px;
    border-radius: ${RFValue(5, 640)}px;
    background-color: ${({ theme }) => theme.colors.secondary_dark};
    align-items: center;
    justify-content: center;
    `

export const SendButtonText = styled.Text`
    color:${({ theme }) => theme.colors.on_secondary_dark};
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(12, 640)}px;
`



