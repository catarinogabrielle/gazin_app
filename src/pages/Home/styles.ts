import styled from 'styled-components';
import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

export const Container = styled.View`
height: 100%;
display: flex;
`;

export const Header = styled.View`     
width: 100%;
padding: 16px 13px 13px 10px;
flex-direction: row;
height: 60px;
align-items: center;
justify-content: space-between;
z-index: 1 !important;
`;

export const ContentLogo = styled.View`
display: flex;
flex-direction: row;
align-items: center;
`;

export const TextLogo = styled.Text`                                    
color: ${ColorTheme.Branco3};
font-size: 13px;
font-weight: 700;
font-family: Roboto;
`;

export const Content = styled.View`
flex: 1;
background-color:${ColorTheme.Branco3};
flex-direction: column;
width: 100%;
display: flex;
`;

export const ContentInfo = styled.View`
padding: 12px 25px;
background: ${ColorTheme.Branco3};
border-radius: 10px;
margin-left: 10px;
margin-right: 10px;
margin-bottom: 20px;
display: flex;
flex-direction: column;
`;

export const Text = styled.Text`                                    
color: ${ColorTheme.Preto};
font-size: 21px;
font-weight: 700;
text-transform: uppercase;
font-family: Roboto;
`;

export const IdProduct = styled.Text`                                    
color: ${ColorTheme.Branco5};
font-size: 16px;
font-weight: 500;
text-transform: uppercase;
margin-top: 2px;
font-family: Roboto;
`;

export const Label = styled.Text`                                    
color: ${ColorTheme.Preto};
font-size: 19px;
font-weight: 300;
font-family: Roboto;
`;

export const ContentLocation = styled.View`
display: flex;
`;

export const ContentInfo2 = styled.View`
display: flex;
flex: 1;
padding: 0 20px;
margin-top: 50px;
`;

export const Title = styled.Text`                                    
color: ${ColorTheme.Cinza};
font-size: 22px;
font-weight: 300;
margin-bottom: 18px;
font-family: Roboto;
`;

export const Filial = styled.View`
display: flex;
background-color: ${ColorTheme.Azul};
padding: 16px 12px;
margin-bottom: 15px;
`;

export const TextFilial = styled.Text`                                    
color: ${ColorTheme.Branco3};
font-size: 16px;
`;

export const Line = styled.View`
border: 0.5px solid #cecece;
`;

export const ButtonPicker = styled.Button`
display: flex;
height: 30px;
`;

export const ImageLogo = styled.Image`
width: 100%;
height: 100px;
margin-top: 110px;
`;