import React, { useState, useEffect } from "react";
import { ActivityIndicator, Platform } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import * as Location from 'expo-location';
import apidDevices from '../../../contexts/devices.json';

import {
    Container,
    Header,
    Logo,
    TextLogo,
    Content,
    BoxVideo,
    ContentInfo,
    Text,
    Label,
    LabelInfo,
    ContentLocation
} from './styles';

import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

type DeviceProps = {
    id: string,
    name: string,
    code: string,
    cash_price: string,
    term_price: string,
    parcel: string,
    value_parcel: string,
    location: boolean
}

type LocationProps = {
    id: string,
    code: string,
    region: string,
    cash_price: string,
    term_price: string,
    parcel: string,
    value_parcel: string
}

import { api } from '../../services/api'

var shadow = {
    elevation: 3,
    shadowColor: "grey",
    shadowOpacity: 0.4,
    shadowRadius: 10,
}

export default function Home() {
    const [phone, setPhone] = useState('')
    const [devices, setDevices] = useState<DeviceProps[] | []>([])
    const [apiLocation, setApiLocation] = useState<LocationProps[] | []>([])
    const [location, setLocation] = useState({})
    const [region, setRegion] = useState({})

    console.log(region)

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status != 'granted') {
                console.log('Please grant locationn permissions')
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({})
            setLocation(currentLocation)
            const reversegeocodedLocation = await Location.reverseGeocodeAsync({
                longitude: currentLocation.coords.longitude,
                latitude: currentLocation.coords.latitude,
            })
            const regions = reversegeocodedLocation.map(item => item.region)
            setRegion(regions)
        }

        getPermissions()
    }, [region])

    useEffect(() => {
        const platform = JSON.stringify(Platform.constants.Model, null, 2)
        setPhone(platform)
    }, [])

    useEffect(() => {
        async function loadingDevice() {
            const response = await api.get('device')
            setDevices(response.data)
        }

        loadingDevice()
    }, [])

    useEffect(() => {
        async function loadingDevice() {
            const response = await api.get('location')
            setApiLocation(response.data)
        }

        loadingDevice()
    }, [])

    return (
        <Container>
            <Header>
                <Logo source={require('../../assets/logogazin.png')} />
                <TextLogo>Seja Bem Vindo (a)</TextLogo>
            </Header>

            {devices ? (
                <Content>
                    <BoxVideo>
                        <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                        <YoutubePlayer
                            width="100%"
                            height={222}
                            videoId={"IentQeNVJFU"}
                            play={true}
                        />
                    </BoxVideo>

                    {devices.map(item => {
                        if (`"${item.code}"` == phone) return (
                            <ContentInfo key={item.id} style={shadow}>
                                <Text>{item.name}</Text>
                                {item.location == false ? (
                                    <>
                                        <Label>Preço à Vista:
                                            <Text style={{ color: ColorTheme.Azul }}>R$ {item.cash_price}</Text>
                                        </Label>
                                        <Label>Preço à Prazo:
                                            <Text style={{ color: ColorTheme.Azul }}>R$ {item.term_price}</Text>
                                        </Label>
                                        <LabelInfo>em
                                            <Text style={{ color: ColorTheme.Laranja }}>{item.parcel}x</Text>
                                            de
                                            <Text style={{ color: ColorTheme.Laranja }}>R$ {item.value_parcel} </Text>sem juros
                                        </LabelInfo>
                                    </>
                                ) : (
                                    <>
                                        {apiLocation.map(i => {
                                            if (`"${i.code}"` == phone && i.region == region) return (
                                                < ContentLocation key={i.id}>
                                                    <Label>Preço à Vista:
                                                        <Text style={{ color: ColorTheme.Azul }}>R$ {i.cash_price}</Text>
                                                    </Label>
                                                    <Label>Preço à Prazo:
                                                        <Text style={{ color: ColorTheme.Azul }}>R$ {i.term_price}</Text>
                                                    </Label>
                                                    <LabelInfo>em
                                                        <Text style={{ color: ColorTheme.Laranja }}>{i.parcel}x</Text>
                                                        de
                                                        <Text style={{ color: ColorTheme.Laranja }}>R$ {i.value_parcel} </Text>sem juros
                                                    </LabelInfo>
                                                </ContentLocation>
                                            )
                                        })}
                                    </>
                                )}
                            </ContentInfo>
                        )
                    })}
                </Content>
            ) : (
                <Content>
                    <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                </Content>
            )}
        </Container>
    )
}
