import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    Tbody,
    Thead,
    Tr,
    Th,
    useColorMode,
    Icon,
    Input,
    Stack,
    IconButton,
    SimpleGrid,
} from '@chakra-ui/react';
import Select, { components } from "react-select";
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe, FaWhatsapp, FaRegSave } from "react-icons/fa";
import Colorful from '@uiw/react-color-colorful';
import Screen2 from '../screens/Screen2'
import styles from "./ModPreferencias.module.css";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
    SummaCorrection
} from "../../colorFunctions"; // Importar las funciones

const availableSocialMedias = [
    { value: "Facebook", icon: FaFacebook, link: "/PanaderiaNTQJ" },
    { value: "Instagram", icon: FaInstagram, link: "@PanaderiaNTQJ" },
    { value: "TikTok", icon: FaTiktok, link: "@PanaderiaNTQJ" },
    { value: "Web", icon: FaGlobe, link: "www.PanaderiaNTQJ.com" },
    { value: 'WhatsApp', icon: FaWhatsapp, link: '+54 11 3293-0807' }
];




const ModPreferencias = ({ productos, onFetchProductos }) => {

    const { colorMode } = useColorMode();

    //Datos inmutables entre pantallas
    const [title, setTitle] = useState('NTQJ PANADERIA');
    const [image, setImage] = useState(null);

    //Datos Variables entre pantallas
    const [hexNav, setHexNav] = useState(["#000", "#000"]);
    const [hexBack, setHexBack] = useState(["#1A202C", "#1A202C"]);
    const [hexProduct, setHexProduct] = useState(["#EBEBEB", "#EBEBEB"]);

    let key = 0
    const [socialMedias, setSocialMedias] = useState([
        availableSocialMedias.map(x => {
            let social = {
                ...x,
                key: key,
            }
            key++
            return social
        }),
        availableSocialMedias.map(x => {
            let social = {
                ...x,
                key: key,
            }
            key++
            return social
        })
    ])

    const [currentScreen, setCurrentScreen] = useState(0)

    const Option = (props) => (
        <components.Option {...props} className={styles.SelectForm}>
            <Icon as={props.data.icon} alt="logo" width='40%' height='40%' m='auto' />
        </components.Option>
    );

    const SingleValue = ({ children, ...props }) => (
        <components.SingleValue {...props} className={styles.SelectForm}>
            <Icon as={props.data.icon} alt="s-logo" width='50%' height='50%' m='auto' />
        </components.SingleValue>
    );

    useEffect(() => {
        fetchProductos();
    }, []);
    const fetchProductos = async () => {
        await onFetchProductos();
    };

    return (
        <>
            <Box
                w="80vw"
                p={4}
                m="auto"
                mt={8}
                mb={8}
                borderRadius="lg"
            >
                <Table variant="striped">
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
                                <Stack>
                                    {
                                        socialMedias[currentScreen].map((x) => (
                                            <Box display='flex' key={x.key}>
                                                <Box minWidth='25%' pr='1em'>
                                                    <Select
                                                        className={styles.SelectForm}
                                                        value={x}
                                                        key={x.key}
                                                        options={availableSocialMedias}
                                                        onChange={
                                                            (value) => setSocialMedias(
                                                                (y) => {
                                                                    const newSocial = [...y]
                                                                    newSocial[currentScreen] =
                                                                        newSocial[currentScreen].map(obj =>
                                                                            obj.key == x.key ?
                                                                                {
                                                                                    ...obj,
                                                                                    name: value.value,
                                                                                    icon: value.icon
                                                                                }
                                                                                :
                                                                                { ...obj }
                                                                        )
                                                                    return newSocial;
                                                                }
                                                            )
                                                        }
                                                        isRtl={true}
                                                        styles={{
                                                            singleValue: (base) => ({
                                                                ...base,
                                                                display: "flex",
                                                                alignItems: "center"
                                                            })
                                                        }}
                                                        components={{
                                                            Option,
                                                            SingleValue
                                                        }}
                                                    />
                                                </Box>
                                                <Input placeholder='@NTQJ' value={x.link} onChange={
                                                    (value) => setSocialMedias(
                                                        (y) => {
                                                            const newSocial = [...y]
                                                            newSocial[currentScreen] =
                                                                newSocial[currentScreen].map(obj =>
                                                                    obj.key == x.key ?
                                                                        {
                                                                            ...obj,
                                                                            link: value.target.value
                                                                        }
                                                                        :
                                                                        { ...obj }
                                                                )
                                                            return newSocial;
                                                        }
                                                    )
                                                }
                                                />
                                            </Box>
                                        ))

                                    }
                                    <SimpleGrid columns={2} spacing={4}>
                                        <IconButton icon={<AddIcon />} onClick={() => setSocialMedias(x => x.concat({ ...availableSocialMedias[0], key: socialMedias.length }))} />
                                        <IconButton icon={<CloseIcon />} onClick={() => { if (socialMedias.length > 1) setSocialMedias(x => x.slice(0, x.length - 1)) }} />
                                    </SimpleGrid>
                                </Stack>
                            </Th>
                            <Th>
                                <Colorful
                                    className={styles.colorful}
                                    color={hexNav[currentScreen]}
                                    disableAlpha={true}
                                    onChange={(color) => {
                                        setHexNav((prevHexNav) => {
                                            const newHexNav = [...prevHexNav];
                                            newHexNav[currentScreen] = color.hexa;
                                            return newHexNav;
                                        })
                                    }}
                                />
                            </Th>
                            <Th>
                                <Colorful
                                    className={styles.colorful}
                                    color={hexBack[currentScreen]}
                                    disableAlpha={true}
                                    onChange={(color) => {
                                        setHexBack((prevHexBack) => {
                                            const newHexBack = [...prevHexBack];
                                            newHexBack[currentScreen] = color.hexa;
                                            return newHexBack;
                                        })
                                    }}
                                />
                            </Th>
                            <Th>
                                <Colorful
                                    className={styles.colorful}
                                    color={hexProduct[currentScreen]}
                                    disableAlpha={true}
                                    onChange={(color) => {
                                        setHexProduct((prevHexProduct) => {
                                            const newHexProduct = [...prevHexProduct];
                                            newHexProduct[currentScreen] = color.hexa;
                                            return newHexProduct;
                                        })
                                    }}
                                />
                            </Th>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
            <Box
                w="80vw"
                p={4}
                m="auto"
                mt={8}
                mb={8}
                borderRadius="lg"
            >
                <Table variant="striped">
                    <Thead>
                        <Tr m="2">
                            <Th fontSize="1.5em" >Titulo</Th>
                            <Th fontSize="1.5em" >Logo</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr fontSize="1.5em" m="2">
                            <Th fontWeight='extrabold'>
                                <Input placeholder='Titulo de tu Empresa' value={title} onChange={(value) => setTitle(value.target.value)} maxW={'22em'} /></Th>
                            <Th>
                                <Input type="file" accept="image/*" onChange={(value) => setImage(value.target.files[0])} maxW={'22em'} />
                            </Th>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
            <Carousel
                infiniteLoop
                showStatus={false}
                showThumbs={false}
                showArrows={true}
                showIndicators={false}
                className={styles.carousel}
                onChange={(x, item) => {
                    setCurrentScreen(x)
                }}
            >
                <Box borderColor={colorMode === "light" ? "black" : "white"} borderWidth='0.2em' borderRadius='2em' width='100%' minW='70em' maxHeight='30em' overflow='hidden'>
                    <Screen2 productos={productos} onFetchProductos={fetchProductos}
                        socialMedias={socialMedias[currentScreen]}
                        colors={{
                            nav: hexNav[currentScreen],
                            background: hexBack[currentScreen],
                            product: hexProduct[currentScreen],
                            textProduct: SummaCorrection(hexProduct[currentScreen]),
                            textCategories: SummaCorrection(hexBack[currentScreen]),
                            textNav: SummaCorrection(hexNav[currentScreen])
                        }}
                        title={{
                            title: title,
                            image: image
                        }}
                    />
                </Box>
                <Box borderColor={colorMode === "light" ? "black" : "white"} borderWidth='0.2em' borderRadius='2em' width='100%' minW='70em' maxHeight='30em' overflow='hidden'>
                    <Screen2 productos={productos} onFetchProductos={fetchProductos}
                        socialMedias={socialMedias[currentScreen]}
                        colors={{
                            nav: hexNav[currentScreen],
                            background: hexBack[currentScreen],
                            product: hexProduct[currentScreen],
                            textProduct: SummaCorrection(hexProduct[currentScreen]),
                            textCategories: SummaCorrection(hexBack[currentScreen]),
                            textNav: SummaCorrection(hexNav[currentScreen])
                        }}
                        title={{
                            title: title,
                            image: image
                        }}
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