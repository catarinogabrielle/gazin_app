import React, { useState, useEffect } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, TextInput, ScrollView, Modal, View, Pressable, TouchableOpacity } from "react-native";;
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSWR from "swr";
import { Ionicons } from "@expo/vector-icons";
import { Video } from 'expo-av';

const intro = require('../../assets/animation.mp4')

import {
    Container,
    Header,
    ContentLogo,
    TextLogo,
    Content,
    ContentInfo,
    Text,
    IdProduct,
    Label,
    ContentLocation,
    ContentInfo2,
    Title,
    Filial,
    TextFilial,
    Line,
    ButtonPicker,
    ImageLogo,
} from './styles';

import Colors from "../../../constants/Colors";
const ColorTheme = Colors['Theme'];

import { ApiDevices } from "../../services/apiDevices"
import { Api } from "../../services/api"

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [filtro, setFiltro] = useState(true)
    const [branch, setBranch] = useState('')
    const [branchFix, setBranchFix] = useState('10002')
    const [brand, setBrand] = useState('Marca')
    const [product, setProduct] = useState('Modelo')
    const [color, setColor] = useState('Cor')
    const [voltagem, setVoltagem] = useState('Voltagem')
    const [device, setDevice] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    async function loadData() {
        const storageInfo = await AsyncStorage.getItem('@deviceitem')
        let hasDevice = JSON.parse(storageInfo || '{}')

        await ApiDevices.get(`/celulares?idfilial=${Object.keys(hasDevice).length > 0 ? hasDevice.branch : branch}&token=Gazin-tech%C3%87$2y$10$85Udhj9L4Pa9XULE5RxyTu0Yv5G0POBiS7u2Yb693P9o6Ctege7cq%C3%87Gazin-tech`).then(response => {
            setDevice(response.data)

        }).catch((err) => {
            console.log('erro', err)
        })
        return true
    }

    const [time, setTime] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            loadData()
            setTime(!time)
        }, 600000)
    }, [time])

    const Marca = device?.map((item: { marca: string; }) => item.marca)
    const uniqueMarcaList = [...new Set(Marca)]

    const data = {
        branch,
        brand,
        product,
        color,
        voltagem,
    }

    async function diveceItemsInfo() {
        await AsyncStorage.setItem('@deviceitem', JSON.stringify(data))
    }

    async function deviceId(device_id: any) {
        await AsyncStorage.setItem('@deviceId', JSON.stringify(device_id))
    }

    const [loadingStorage, setLoadingStorage] = useState(true)

    useEffect(() => {
        setLoading(true)

        async function getDeviceStorage() {
            const storageInfo = await AsyncStorage.getItem('@deviceitem')
            let hasDevice = JSON.parse(storageInfo || '{}')

            setLoading(false)

            if (Object.keys(hasDevice).length > 0) {
                setBranch(hasDevice.branch)
                setBrand(hasDevice.brand)
                setProduct(hasDevice.product)
                setColor(hasDevice.color)
                setVoltagem(hasDevice.voltagem)
                setLoading(true)

                if (branch == '') {
                    setLoadingStorage(!loadingStorage)
                } else {
                    loadData()
                }
            }
        }

        getDeviceStorage()
    }, [loadingStorage])

    async function removeItemValue() {
        setLoading(false)
        try {
            await AsyncStorage.removeItem('@deviceitem')
            setLoading(false)
            return true
        }
        catch (exception) {
            return false;
        }
    }

    function HandleLowestPrice(
        jsonData: any,
        tipo: string
    ): any {
        const val = new Date()
        var today = val.toLocaleDateString()
        var dia = today.split("/")[0]
        var mes = today.split("/")[1]
        var ano = today.split("/")[2]
        var hoje = ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2)

        const produtosFiltradosDataIgualHoje = jsonData?.filter((produto: { idproduto: number; produto: string; cor: string; marca: string; tipo: string; voltagem: string; datainicial: string | number | Date; datafinal: string | number | Date; }) => {

            return (
                produto.produto == product &&
                produto.cor == color &&
                produto.marca == brand &&
                produto.tipo == tipo &&
                produto.voltagem == voltagem &&
                produto.datainicial == hoje && produto.datafinal == hoje
            )
        })

        if (produtosFiltradosDataIgualHoje && produtosFiltradosDataIgualHoje.length > 0) {

            if (tipo == 'A Vista') {
                produtosFiltradosDataIgualHoje?.sort((a: { precopartida: string; }, b: { precopartida: string; }) => {
                    return parseFloat(a.precopartida) - parseFloat(b.precopartida)
                })
            }

            if (tipo == 'Cartão' || tipo == 'Carteira')
                produtosFiltradosDataIgualHoje?.sort((a: { precoaprazo: string; }, b: { precoaprazo: string; }) => {
                    return parseFloat(a.precoaprazo) - parseFloat(b.precoaprazo)
                })

            return produtosFiltradosDataIgualHoje[0]
        }

        const produtosFiltrados = jsonData?.filter((produto: { idproduto: number; produto: string; cor: string; marca: string; tipo: string; voltagem: string; datafinal: string | number | Date; }) => {

            return (
                produto.produto == product &&
                produto.cor == color &&
                produto.marca == brand &&
                produto.tipo == tipo &&
                produto.voltagem == voltagem &&
                produto.datafinal >= hoje
            )
        })

        if (tipo == 'A Vista') {
            produtosFiltrados?.sort((a: { precopartida: string; }, b: { precopartida: string; }) => {
                return parseFloat(a.precopartida) - parseFloat(b.precopartida)
            })
        }

        if (tipo == 'Cartão' || tipo == 'Carteira')
            produtosFiltrados?.sort((a: { precoaprazo: string; }, b: { precoaprazo: string; }) => {
                return parseFloat(a.precoaprazo) - parseFloat(b.precoaprazo)
            })

        return produtosFiltrados[0]
    }

    function mask(input: string): string {
        input = parseFloat(input).toFixed(2)
        input = input.toString().replace('.', ',')
        const valor = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        return 'R$ ' + valor
    }

    function handleProductBrand(jsonData: any[], marca: string): string[] {
        const produtoNomes: string[] = []

        for (const value of jsonData) {
            if (value.marca === marca && !produtoNomes.includes(value.produto)) {
                produtoNomes.push(value.produto)
            }
        }

        return produtoNomes
    }

    function handleProductColor(jsonData: any[], produto: string): string[] {
        const produtoNomes: string[] = []

        for (const value of jsonData) {
            if (value.produto === produto && !produtoNomes.includes(value.cor)) {
                produtoNomes.push(value.cor)
            }
        }

        return produtoNomes
    }

    function handleProductVolt(jsonData: any[], produto: string): string[] {
        const voltagemDevice: string[] = []

        for (const value of jsonData) {
            if (value.produto === produto && !voltagemDevice.includes(value.voltagem)) {
                voltagemDevice.push(value.voltagem)
            }
        }

        return voltagemDevice
    }

    async function handleDeleteDevice() {
        /*const storageId = await AsyncStorage.getItem('@deviceId')
        let hasDeviceId = JSON.parse(storageId || '{}')
        try {
            await Api.delete('/devices', {
                params: {
                    device_id: hasDeviceId
                }
            })
        } catch (err) {
            console.log('erro', err)
        }
        */
    }

    async function handleAddDevice() {
        /*
        try {
            await Api.post('/devices', {
                device: product,
                color: color,
                voltagem: voltagem,
                branch: branch,
                cash: mask(HandleLowestPrice(device, 'A Vista').precopartida),
                card: mask(HandleLowestPrice(device, 'Cartão').precoaprazo),
                wallet: mask(HandleLowestPrice(device, 'Carteira').precoaprazo),
            }).then(response => {
                const device_id = response.data.id
                deviceId(device_id)

            }).catch((err) => {
                console.log('erro', err)
            })

        } catch (err) {
            console.log('erro', err)
        }
        */
    }

    async function handleDeviceUpdate() {
        /*
        const storageId = await AsyncStorage.getItem('@deviceId')
        let hasDeviceId = JSON.parse(storageId || '{}')

        try {
            await Api.put('/devices', {
                device_id: hasDeviceId,
                cash: mask(HandleLowestPrice(device, 'A Vista').precopartida),
                card: mask(HandleLowestPrice(device, 'Cartão').precoaprazo),
                wallet: mask(HandleLowestPrice(device, 'Carteira').precoaprazo),
            })
        } catch (err) {
            console.log('erro', err)
        }
        */
    }
    /*
        useEffect(() => {
            if (loading == true) {
                setTimeout(() => {
                    handleDeviceUpdate()
                }, 5000)
            }
        }, [device, loading])
        */

    const ModalContainer = () => {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(true)}>

                    <TouchableOpacity style={styles.centeredView2} onPress={() => setModalVisible(false)}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Deseja confirmar a saida do aplicativo?</Text>
                            <Text style={styles.modalTextVer}>Versão - 2.0.0</Text>
                            <Pressable
                                style={styles.buttonClose}
                                onPress={() => {
                                    setModalVisible(false),
                                        removeItemValue(),
                                        setFiltro(true),
                                        setBranch(''),
                                        setBrand('Marca'),
                                        setProduct('Modelo'),
                                        setColor('Cor'),
                                        setVoltagem('Voltagem'),
                                        handleDeleteDevice()
                                }}>
                                <Text style={styles.textStyle}>Sair</Text>
                            </Pressable>
                        </View>
                    </TouchableOpacity>

                </Modal>
            </View>
        )
    }

    return (
        <Container>
            {loading ? (
                <>
                    <Header>
                        <ContentLogo>
                            <TextLogo>Seja Bem Vindo à Gazin</TextLogo>
                        </ContentLogo>
                        <Ionicons onPress={() => setModalVisible(true)} name="exit-outline" size={22} color={ColorTheme.Branco3} />
                    </Header>

                    {device.length > 0 ? (
                        <Content>
                            <Video
                                style={{ position: 'absolute', width: '100%', height: '100%', flex: 1 }}
                                source={intro}
                                resizeMode="cover"
                                isLooping={true}
                                isMuted={true}
                                shouldPlay={true}
                                useNativeControls
                            />
                            <ScrollView>
                                <ContentInfo>
                                    {brand == 'Marca' || product == 'Modelo' || color == 'Cor' || voltagem == 'Voltagem' ? (null) : (
                                        <View>
                                            <Text>{product} - {color}</Text>
                                            {HandleLowestPrice(device, 'A Vista') && (
                                                <IdProduct key={HandleLowestPrice(device, 'A Vista').idproduto + '4'}>{HandleLowestPrice(device, 'A Vista').idproduto}</IdProduct>
                                            )}
                                        </View>
                                    )}
                                    <ContentLocation>
                                        {HandleLowestPrice(device, 'A Vista') && (
                                            <Label key={HandleLowestPrice(device, 'A Vista').idproduto + '1'}><Text style={{ color: ColorTheme.Azul, fontSize: 26 }}>{mask(HandleLowestPrice(device, 'A Vista').precopartida)}</Text> (A Vista)</Label>
                                        )}
                                        {HandleLowestPrice(device, 'Cartão') && (
                                            <Label key={HandleLowestPrice(device, 'Cartão').idproduto + '2'}><Text style={{ color: ColorTheme.Azul, fontSize: 26 }}>{mask(HandleLowestPrice(device, 'Cartão').precoaprazo)}</Text>  Parcelas em até<Text style={{ color: ColorTheme.Laranja, fontSize: 24 }}> {HandleLowestPrice(device, 'Cartão').prazofinal}x </Text>no cartão.</Label>
                                        )}
                                        {HandleLowestPrice(device, 'Carteira') && (
                                            <Label key={HandleLowestPrice(device, 'Carteira').idproduto + '2'}><Text style={{ color: ColorTheme.Azul, fontSize: 26 }}>{mask(HandleLowestPrice(device, 'Carteira').precoaprazo)}</Text>  Parcelas em até<Text style={{ color: ColorTheme.Laranja, fontSize: 24 }}> {HandleLowestPrice(device, 'Carteira').prazofinal}x </Text>no carne.</Label>
                                        )}
                                    </ContentLocation>
                                    {/*<Video
                                            style={{ position: 'absolute', width: '100%', height: '100%', flex: 1 }}
                                            source={intro}
                                            resizeMode="cover"
                                            isLooping={true}
                                            isMuted={true}
                                            shouldPlay={true}
                                            useNativeControls
                                            />*/}
                                </ContentInfo>
                            </ScrollView>
                            {ModalContainer()}
                        </Content>
                    ) : (
                        <Content style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                        </Content>
                    )
                    }
                </>
            ) : (
                <ImageBackground source={require('../../assets/background.png')} resizeMode="cover" style={{ flex: 1 }}>
                    <ContentInfo2>
                        {filtro == true ? (
                            <>
                                <Title>Digite sua filial:</Title>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setBranch}
                                    value={branch}
                                    placeholder="Filial"
                                    keyboardType="numeric"
                                />
                            </>
                        ) : (
                            <>
                                <Title>Selecione as opções:</Title>
                                <Filial>
                                    <TextFilial>{branch}</TextFilial>
                                </Filial>
                            </>
                        )}

                        {filtro == true && branch !== '' && (
                            <ButtonPicker
                                onPress={() => { loadData(), setFiltro(false) }}
                                title="Filtrar Filial"
                                color={ColorTheme.Roxo}
                                accessibilityLabel="Learn more about this purple button"
                            />
                        )}

                        {filtro == false && (
                            <Line />
                        )}

                        {device.length > 0 && filtro == false ? (
                            <>
                                <Picker
                                    style={brand == 'Marca' ? styles.container : styles.containerSelect}
                                    selectedValue={brand}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setBrand(itemValue)
                                    }>
                                    <Picker.Item label="Marca" value="Marca" />
                                    {uniqueMarcaList.map(item => {
                                        if (item !== 'AMET PELICULAS')
                                            return (
                                                <Picker.Item key={item} value={item} label={item} />
                                            )
                                    })}
                                </Picker>

                                <Picker
                                    style={product == 'Modelo' ? styles.container : styles.containerSelect}
                                    selectedValue={product}
                                    numberOfLines={2}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setProduct(itemValue)
                                    }>
                                    <Picker.Item label="Modelo" value="Modelo" />

                                    {handleProductBrand(device, brand).map(item => (
                                        <Picker.Item key={item} label={item} value={item} />
                                    ))}
                                </Picker>

                                <Picker
                                    style={color == 'Cor' ? styles.container : styles.containerSelect}
                                    selectedValue={color}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setColor(itemValue)
                                    }>
                                    <Picker.Item label="Cor" value="Cor" />
                                    {handleProductColor(device, product).map(item => (
                                        <Picker.Item key={item} label={item} value={item} />
                                    ))}
                                </Picker>

                                <Picker
                                    style={voltagem == 'Voltagem' ? styles.container2 : styles.containerSelect2}
                                    selectedValue={voltagem}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setVoltagem(itemValue)
                                    }>
                                    <Picker.Item label="Voltagem" value="Voltagem" />
                                    {handleProductVolt(device, product).map(item => (
                                        <Picker.Item key={item} label={item} value={item} />
                                    ))}
                                </Picker>

                                {brand == 'Marca' || product == 'Modelo' || color == 'Cor' || voltagem == 'Voltagem' ? (null) : (
                                    <ButtonPicker
                                        onPress={() => { setLoading(true), diveceItemsInfo(), handleAddDevice() }}
                                        title="Filtrar"
                                        color={ColorTheme.Roxo}
                                        accessibilityLabel="Learn more about this purple button"
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {(filtro !== true && device.length == 0) && (
                                    <ActivityIndicator style={{ top: 40 }} size={40} color={ColorTheme.Azul} />
                                )}
                            </>
                        )}
                    </ContentInfo2>
                </ImageBackground>
            )}
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        color: ColorTheme.Cinza,
        marginTop: 15,
        backgroundColor: ColorTheme.Branco4,
        borderWidth: 1,
        borderColor: ColorTheme.Branco2,
    },
    containerSelect: {
        color: ColorTheme.Branco3,
        marginTop: 15,
        backgroundColor: ColorTheme.Azul,
    },
    container2: {
        color: ColorTheme.Cinza,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: ColorTheme.Branco4,
        borderWidth: 1,
        borderColor: ColorTheme.Branco2,
    },
    containerSelect2: {
        color: ColorTheme.Branco3,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: ColorTheme.Azul,
    },
    input: {
        color: ColorTheme.Cinza,
        marginBottom: 15,
        backgroundColor: ColorTheme.Branco4,
        padding: 12,
        borderWidth: 1,
        borderColor: ColorTheme.Branco2,
    },
    inputFiltro: {
        marginBottom: 15,
        color: ColorTheme.Branco3,
        backgroundColor: ColorTheme.Azul,
        padding: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.377)',
    },
    modalView: {
        backgroundColor: ColorTheme.Branco3,
        borderRadius: 8,
        padding: 35,
        alignItems: 'center',
        width: '80%',
    },
    buttonClose: {
        borderRadius: 8,
        padding: 10,
        backgroundColor: ColorTheme.Roxo,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 19,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 19,
    },
    modalTextVer: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 15,
        color: ColorTheme.Branco5,
    }
});