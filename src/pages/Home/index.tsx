import React, { useState, useEffect } from "react";
import { ActivityIndicator, Platform, Modal, ScrollView, View, ImageBackground } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';

import ApiDevices from '../../../contexts/devices.json';
import ApiLocation from '../../../contexts/location.json';

import {
    Container,
    Header,
    ContentLogo,
    Logo,
    TextLogo,
    ContentMenu,
    Content,
    BoxVideo,
    ContentInfo,
    Text,
    Label,
    LabelInfo,
    ContentLocation,
    ContainerModal,
    ContainerModalOpacity,
    ContentModal,
    TouchableClosed,
    BoxStore,
    NameStore
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
    city: string,
    store: string,
    id_store: number,
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
    shadowOffset: {
        width: 0,
        height: 2
    }
}

export default function Home() {
    const [phone, setPhone] = useState('')
    const [apiLocation, setApiLocation] = useState<LocationProps[] | []>([])
    const [apiDevices, setApiDevices] = useState<DeviceProps[] | []>([])
    const [location, setLocation] = useState({})
    const [region, setRegion] = useState({})
    const [street, setStret] = useState({})
    const [store, setStore] = useState('')
    const [visibleModal, setVisibleModal] = useState(false)

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
            const street = reversegeocodedLocation.map(item => item.street)
            setStret(street)
        }

        getPermissions()
    }, [region])

    useEffect(() => {
        const platform = JSON.stringify(Platform.constants.Model, null, 2)
        setPhone(platform)
    }, [phone, region])
    /*
        useEffect(() => {
            async function loadingDevice() {
                const response = await api.get('device')
                setApiDevices(response.data)
            }
    
            loadingDevice()
        }, [region])
    
        useEffect(() => {
            async function loadingDevice() {
                const response = await api.get('location')
                setApiLocation(response.data)
            }
    
            loadingDevice()
        }, [region])
    */
    function handleLocation(item: any) {
        return (
            <>
                <Label>Preço à Vista:
                    <Text style={{ color: ColorTheme.Azul }}> R$ {item.cash_price}</Text>
                </Label>
                <Label>Preço à Prazo:
                    <Text style={{ color: ColorTheme.Azul }}> R$ {item.term_price}</Text>
                </Label>
                <LabelInfo>em
                    <Text style={{ color: ColorTheme.Laranja }}> {item.parcel}x </Text>
                    de
                    <Text style={{ color: ColorTheme.Laranja }}> R$ {item.value_parcel} </Text>sem juros
                </LabelInfo>
            </>
        )
    }

    return (
        <Container>
            <Header>
                <ContentLogo>
                    <Logo source={require('../../assets/logogazin.png')} />
                    <TextLogo>Seja Bem Vindo (a)</TextLogo>
                </ContentLogo>
                {ApiDevices.devices.map(item => {
                    if (`"${item.code}"` == phone) return (
                        <View key={item.id}>
                            {item.location == true && (
                                <ContentMenu onPress={() => setVisibleModal(true)}>
                                    <Ionicons name="menu" size={28} color={ColorTheme.Branco3} />
                                </ContentMenu>
                            )}
                        </View>
                    )
                })}
            </Header>

            {ApiDevices && ApiLocation ? (
                <Content>
                    <ImageBackground source={require('../../assets/backgroundGazin.png')} resizeMode="cover" style={{ flex: 1 }}>
                        <BoxVideo>
                            <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                            <YoutubePlayer
                                width="100%"
                                height={222}
                                videoId={"BrX5P0iJsLM"}
                                play={true}
                            />
                        </BoxVideo>

                        {ApiDevices.devices.map(item => {
                            if (`"${item.code}"` == phone) return (
                                <ContentInfo key={item.id} style={shadow}>
                                    <Text>{item.name}</Text>
                                    {item.location == false || store == 'unik' ? (
                                        <ContentLocation>
                                            {handleLocation(item)}
                                        </ContentLocation>
                                    ) : (
                                        <>
                                            {ApiLocation.locations.map(i => {
                                                if (i.street == street && `"${i.code}"` == phone) return (
                                                    <ContentLocation key={i.id}>
                                                        <Label>Preço à Vista:
                                                            <Text style={{ color: ColorTheme.Azul }}> R$ {i.cash_price}</Text>
                                                        </Label>
                                                        <Label>Preço à Prazo:
                                                            <Text style={{ color: ColorTheme.Azul }}> R$ {i.term_price}</Text>
                                                        </Label>
                                                        <LabelInfo>em
                                                            <Text style={{ color: ColorTheme.Laranja }}> {i.parcel}x </Text>
                                                            de
                                                            <Text style={{ color: ColorTheme.Laranja }}> R$ {i.value_parcel} </Text>sem juros
                                                        </LabelInfo>
                                                    </ContentLocation>
                                                )
                                            })}
                                        </>
                                    )}
                                </ContentInfo>
                            )
                        })}
                    </ImageBackground>
                </Content>
            ) : (
                <Content>
                    <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                </Content>
            )}

            <Modal
                visible={visibleModal}
                transparent={true}
                onRequestClose={() => setVisibleModal(false)}
                animationType="slide"
            >
                <ContainerModal>
                    <ContainerModalOpacity>
                        <ContentModal>
                            <TouchableClosed onPress={() => setVisibleModal(false)}>
                                <Ionicons name="close" size={28} color={ColorTheme.Branco5} />
                            </TouchableClosed>
                            <ScrollView style={{ width: "100%" }}>
                                <BoxStore onPress={() => {
                                    setStore('unik')
                                    setVisibleModal(false)
                                }}>
                                    <Ionicons name="md-location-outline" size={16} color={ColorTheme.Azul} />
                                    <NameStore>Valor Nacional</NameStore>
                                </BoxStore>
                                {ApiLocation.locations.map(i => {
                                    if (i.street == street && `"${i.code}"` == phone) return (
                                        <BoxStore key={i.id} onPress={() => {
                                            setStore(i.store)
                                            setVisibleModal(false)
                                        }}>
                                            <Ionicons name="md-location-outline" size={16} color={ColorTheme.Azul} />
                                            <NameStore>{i.store}</NameStore>
                                        </BoxStore>
                                    )
                                })}
                            </ScrollView>
                        </ContentModal>
                    </ContainerModalOpacity>
                </ContainerModal>
            </Modal>
        </Container>
    )
}