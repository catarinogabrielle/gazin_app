import React, { useState, useEffect } from "react";
import { ActivityIndicator, Platform } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

import { Container, Header, Logo, TextLogo, Content, BoxVideo, ContentInfo, Text, Label, LabelInfo } from './styles';

import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

import api from '../../../contexts/api.json'

var shadow = {
    elevation: 3,
    shadowColor: "grey",
    shadowOpacity: 0.4,
    shadowRadius: 10,
}

export default function Home() {
    const [phone, setPhone] = useState('')

    useEffect(() => {
        const platform = JSON.stringify(Platform.constants.Model, null, 2)
        setPhone(platform)
    }, [])

    return (
        <Container>
            <Header>
                <Logo source={require('../../assets/logogazin.png')} />
                <TextLogo>Seja Bem Vindo (a)</TextLogo>
            </Header>

            <Content>
                <BoxVideo>
                    <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                    <YoutubePlayer
                        width="100%"
                        height={222}
                        videoId={api.link}
                        play={true}
                    />
                </BoxVideo>

                {api.rows.map(item => {
                    if (`"${item.code}"` == phone) return (
                        <ContentInfo key={item.id} style={shadow}>
                            <Text>{item.name}</Text>
                            <Label>Preço à Vista: <Text style={{ color: ColorTheme.Azul }}>R$ {item.cash_price}</Text></Label>
                            <Label>Preço à Prazo: <Text style={{ color: ColorTheme.Azul }}>R$ {item.term_price}</Text></Label>
                            <LabelInfo>em <Text style={{ color: ColorTheme.Laranja }}>{item.parcel}x</Text> de <Text style={{ color: ColorTheme.Laranja }}>R$ {item.value_parcel} </Text>sem juros</LabelInfo>
                        </ContentInfo>
                    )
                })}
            </Content>
        </Container>
    )
}
