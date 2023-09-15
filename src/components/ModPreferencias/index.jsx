import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    Tbody,
    Thead,
    Tr,
    Th,
    useColorMode,
    Input,
    IconButton,
} from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe, FaWhatsapp, FaRegSave } from "react-icons/fa";
import Screen2 from '../screens/Screen2'
import styles from "./ModPreferencias.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { EditSocialMedia } from './ModComponents/EditSocialMedia'
import { EditColor } from './ModComponents/EditColor'


const availableSocialMedias = [
    { value: "Facebook", icon: FaFacebook, link: "/PanaderiaNTQJ", key: 0 },
    { value: "Instagram", icon: FaInstagram, link: "@PanaderiaNTQJ", key: 1 },
    { value: "TikTok", icon: FaTiktok, link: "@PanaderiaNTQJ", key: 2 },
    { value: "Web", icon: FaGlobe, link: "www.PanaderiaNTQJ.com", key: 3 },
    { value: 'WhatsApp', icon: FaWhatsapp, link: '+54 11 3293-0807', key: 4 }
];
const productos = [{
    "tituloProducto": "Pasta frola batata",
    "categoria": "Pasteleria",
    "subcategoria": "Tarta",
    "unidadMedida": "Unidad",
    "titulosVariantes": [
        "Chico",
        "Mediano",
        "Grande"
    ],
    "preciosVariantes": [
        "123",
        "",
        "1233"
    ],
    "activo": true,
    "createdAt": "2023-09-03T23:04:43.496Z",
    "updatedAt": "2023-09-14T20:35:04.523Z",
    "objectId": "bG8NPoA4Cq"
},
{
    "tituloProducto": "Lunitas",
    "categoria": "Galletitas",
    "subcategoria": "Hojaldre",
    "unidadMedida": "Kg.",
    "titulosVariantes": [
        "1/4",
        "1/2",
        "1Kg."
    ],
    "preciosVariantes": [
        "123",
        "",
        "1233"
    ],
    "activo": true,
    "createdAt": "2023-09-03T23:04:43.497Z",
    "updatedAt": "2023-09-03T23:04:43.497Z",
    "objectId": "m6BEg1sdvo"
}]


const ModPreferencias = () => {

    const { colorMode } = useColorMode();



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

    //Datos Variables entre pantallas
    const [hexNav, setHexNav] = useState(preferences[currentScreen].hexNav);
    const [hexBack, setHexBack] = useState(preferences[currentScreen].hexBack);
    const [hexProduct, setHexProduct] = useState(preferences[currentScreen].hexProduct);
    const [socialMedias, setSocialMedias] = useState(preferences[currentScreen].socialMedias);

    const handleTitle = (value) => setTitle(value.target.value)
    const handleImage = (value) => setImage(value.target.files[0])


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
                                UpdateSocials={setSocialMedias}
                            />
                        </Th>
                        <Th>
                            <EditColor colorState={hexNav} UpdateColor={setHexNav} />

                        </Th>
                        <Th>
                            <EditColor colorState={hexBack} UpdateColor={setHexBack} />
                        </Th>
                        <Th>
                            <EditColor colorState={hexProduct} UpdateColor={setHexProduct} />
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
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr fontSize="1.5em" m="2">
                        <Th fontWeight='extrabold'>
                            <Input placeholder='Titulo de tu Empresa' value={title} onChange={handleTitle} maxW={'22em'} /></Th>
                        <Th>
                            <Input type="file" accept="image/*" onChange={handleImage} maxW={'22em'} />
                        </Th>
                    </Tr>
                </Tbody>
            </Table>
            <Carousel
                infiniteLoop
                showArrows={true}
                showIndicators={false}
                className={styles.carousel}
                onChange={(index, item) => {
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

                }}
            >
                <Box borderColor={colorMode === "light" ? "black" : "white"} borderWidth='0.2em' borderRadius='2em' width='100%' minW='70em' maxHeight='30em' overflow='hidden'>
                    <Screen2
                        productos={productos}
                        onFetchProductos={() => { }}
                        socialMedias={socialMedias}
                        nav={hexNav}
                        background={hexBack}
                        product={hexProduct}
                        title={title}
                        image={image}
                    />
                </Box>
                <Box borderColor={colorMode === "light" ? "black" : "white"} borderWidth='0.2em' borderRadius='2em' width='100%' minW='70em' maxHeight='30em' overflow='hidden'>
                    <Screen2
                        productos={productos}
                        onFetchProductos={() => { }}
                        socialMedias={socialMedias}
                        nav={hexNav}
                        background={hexBack}
                        product={hexProduct}
                        title={title}
                        image={image}
                    />
                </Box>
            </Carousel>
            <Box p='2em'>
                <IconButton icon={<FaRegSave />} width='100%' minW='70em' onClick={() => { console.log('mando a servidor') }} />
            </Box>
        </>
    )
}

export default ModPreferencias;