import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Table,
    Tbody,
    Thead,
    Tr,
    Th,
    Input,
    IconButton
} from '@chakra-ui/react';
import { FaRegSave } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { EditSocialMedia } from './ModComponents/EditSocialMedia'
import { EditColor } from './ModComponents/EditColor'
import { CarouselScreens } from "./ModComponents/CarouselScreens";
import { Counter } from './ModComponents/counter'
import { availableSocialMedias, productos } from './ModComponents/usefulObjectes'


const ModPreferencias = ({ pantallas, onFetchPantallas, handleEditarPantallas, setPantallas, handleAgregarPantallas }) => {
    //Datos inmutables entre pantallas
    const [title, setTitle] = useState('NTQJ PANADERIA');
    const [image, setImage] = useState(null);

    //simulacion db
    const [preferences, setPreferences] = useState([
        {
            hexNav: '#000',
            hexBack: '#1A202C',
            hexProduct: '#EBEBEB',
            socialMedias: availableSocialMedias
        },
        {
            hexNav: '#000',
            hexBack: '#1A202C',
            hexProduct: '#EBEBEB',
            socialMedias: availableSocialMedias
        }
    ])

    const [currentScreen, setCurrentScreen] = useState(0)
    const [screenCounter, setScreenCounter] = useState(2)

    //Datos Variables entre pantallas
    const [hexNav, setHexNav] = useState('#000');
    const [hexBack, setHexBack] = useState('#1A202C');
    const [hexProduct, setHexProduct] = useState('#EBEBEB');
    const [socialMedias, setSocialMedias] = useState(availableSocialMedias);

    const handlehexNav = (color) => setHexNav(color)
    const handlehexBack = (color) => setHexBack(color)
    const handlehexProduct = (color) => setHexProduct(color)
    const handlesocialMedias = (color) => setSocialMedias(color)

    const handleTitle = (value) => setTitle(value.target.value)
    const handleImage = (value) => setImage(value.target.files[0])

    useEffect(() => {
        onFetchPantallas()
    }, [])

    useEffect(() => {
        try {
            setTitle(pantallas.Title)
            setImage(pantallas.Image)
            setPreferences(pantallas.Preferences)
            setScreenCounter(pantallas.Preferences.length)

            handlehexNav(pantallas.Preferences[currentScreen].hexNav)
            handlehexBack(pantallas.Preferences[currentScreen].hexBack)
            handlehexProduct(pantallas.Preferences[currentScreen].hexProduct)
            handlesocialMedias(pantallas.Preferences[currentScreen].socialMedias)
        } catch {
            console.log('nao nao mano')
        }
    }, [pantallas])

    const HandleCarousel = (index, item) => {
        console.log(index)
        setPreferences(
            x => {
                const arr = [...x]
                arr[currentScreen] = {
                    hexNav: hexNav,
                    hexBack: hexBack,
                    hexProduct: hexProduct,
                    socialMedias: socialMedias
                }
                return arr
            }
        )
        setCurrentScreen(index)

        setHexNav(preferences[index].hexNav);
        setHexBack(preferences[index].hexBack);
        setHexProduct(preferences[index].hexProduct);
        setSocialMedias(preferences[index].socialMedias);
    }

    const AddScreenCounter = () => {
        if (screenCounter < 10) {
            preferences.push(preferences[0])
            handleScreenCounter(screenCounter + 1)
        }
    }
    const SubstractScreenCounter = () => {
        if (screenCounter > 1) {
            preferences.pop()
            handleScreenCounter(screenCounter - 1)
        }
    }
    const handleScreenCounter = useCallback((value) => setScreenCounter(value), [screenCounter])
    return (
        <>
            <Table
                w="80vw"
                p={4}
                m="auto"
                mt={8}
                mb={8}
                borderRadius="lg"
                variant="striped"
            >
                <Thead>
                    <Tr fontSize="1.5em" fontWeight="bold" textAlign="center" m="2">
                        <Th textAlign='center'>Redes Sociales</Th>
                        <Th textAlign='center'>Color nav</Th>
                        <Th textAlign='center'>Color back</Th>
                        <Th textAlign='center'>Color producto</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr fontSize="1.5em" fontWeight="bold" textAlign="center" alignItems='center'>
                        <Th textAlign='center' minW='20em'>
                            <EditSocialMedia
                                socialMedias={socialMedias}
                                UpdateSocials={handlesocialMedias}
                            />
                        </Th>
                        <Th>
                            <EditColor colorState={hexNav} UpdateColor={handlehexNav} />

                        </Th>
                        <Th>
                            <EditColor colorState={hexBack} UpdateColor={handlehexBack} />
                        </Th>
                        <Th>
                            <EditColor colorState={hexProduct} UpdateColor={handlehexProduct} />
                        </Th>
                    </Tr>
                </Tbody>
            </Table>
            <Table
                variant="striped"
                w="80vw"
                p={4}
                m="auto"
                mt={8}
                mb={8}
                borderRadius="lg"
            >
                <Thead>
                    <Tr m="2">
                        <Th fontSize="1.5em" >Titulo</Th>
                        <Th fontSize="1.5em" >Logo</Th>
                        <Th fontSize="1.5em" textAlign={'center'}>CANTIDAD DE PANTALLAS</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr fontSize="1.5em" m="2">
                        <Th fontWeight='extrabold'>
                            <Input placeholder='Titulo de tu Empresa' value={title} onChange={handleTitle} maxW={'22em'} />
                        </Th>
                        <Th>
                            <Input type="file" accept="image/*" onChange={handleImage} maxW={'22em'} />
                        </Th>
                        <Th fontWeight='extrabold' display={'flex'} flexDir={'column'} alignContent={'center'} justifyContent={'center'}>
                            <Counter
                                value={screenCounter}
                                add={AddScreenCounter}
                                substract={SubstractScreenCounter}
                            />
                        </Th>
                    </Tr>
                </Tbody>
            </Table>
            <CarouselScreens
                productos={productos}
                socialMedias={socialMedias}
                nav={hexNav}
                background={hexBack}
                product={hexProduct}
                title={title}
                image={image}
                screenCounter={screenCounter}
                HandleCarousel={HandleCarousel}
            />
            <Box p='2em'>
                <IconButton icon={<FaRegSave />} width='100%' minW='70em' onClick={() => {
                    console.log(pantallas)

                    let _preferences = [...preferences]
                    _preferences[currentScreen] = {
                        hexNav: hexNav,
                        hexNav: hexBack,
                        hexNav: hexProduct,
                        socialMedias: socialMedias,
                    }

                    handleEditarPantallas({
                        Title: title,
                        Image: image,
                        Preferences: _preferences
                    })

                }
                } />
            </Box>
        </>
    )
}

export default ModPreferencias;