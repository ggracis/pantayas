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
    SimpleGrid
} from '@chakra-ui/react';
import Select, { components } from "react-select";
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe, FaWhatsapp } from "react-icons/fa";
import Colorful from '@uiw/react-color-colorful';
import Screen2 from '../screens/Screen2'
import styles from "./ModPreferencias.module.css";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

import {
    SummaCorrection
} from "../../colorFunctions"; // Importar las funciones


const availableSocialMedias = [
    { value: "Facebook", icon: FaFacebook, link: "/PanaderiaNTQJ" },
    { value: "Instagram", icon: FaInstagram, link: "@PanaderiaNTQJ" },
    { value: "TikTok", icon: FaTiktok, link: "@PanaderiaNTQJ" },
    { value: "Web", icon: FaGlobe, link: "www.PanaderiaNTQJ.com" },
];




const ModPreferencias = ({ productos, onFetchProductos }) => {

    const { colorMode } = useColorMode();

    const [hexNav, setHexNav] = useState("#000");
    const [hexBack, setHexBack] = useState("#1A202C");
    const [hexProduct, setHexProduct] = useState("#EBEBEB");

    let key = 0
    const [socialMedias, setSocialMedias] = useState(availableSocialMedias.map(x => {
        let social = {
            ...x,
            key: key,
        }
        key++

        return social
    }));

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

    useEffect(()=>{
        console.log(socialMedias)
      })

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
                                        socialMedias.map((x) => (
                                            <Box display='flex' key={x.key}>
                                                <Box minWidth='25%' pr='1em'>
                                                    <Select
                                                        className={styles.SelectForm}
                                                        value={x}
                                                        key={x.key}
                                                        options={availableSocialMedias}
                                                        onChange={
                                                            (value) => setSocialMedias(y => y.map(obj =>
                                                                obj.key == x.key ?
                                                                    {
                                                                        ...obj,
                                                                        name: value.value,
                                                                        icon: value.icon
                                                                    }
                                                                    :
                                                                    { ...obj }
                                                            ))
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
                                                    (value) => setSocialMedias(y => y.map(obj =>
                                                        obj.key == x.key ?
                                                            {
                                                                ...obj,
                                                                link: value.target.value,
                                                            }
                                                            :
                                                            { ...obj }
                                                    ))
                                                } />
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
                                    color={hexNav}
                                    disableAlpha={true}
                                    onChange={(color) => {
                                        setHexNav(color.hexa);
                                    }}
                                />
                            </Th>
                            <Th>
                                <Colorful
                                    className={styles.colorful}
                                    color={hexBack}
                                    disableAlpha={true}
                                    onChange={(color) => {
                                        setHexBack(color.hexa);
                                    }}
                                />
                            </Th>
                            <Th>
                                <Colorful
                                    className={styles.colorful}
                                    color={hexProduct}
                                    disableAlpha={true}
                                    onChange={(color) => {
                                        setHexProduct(color.hexa);
                                    }}
                                />
                            </Th>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>
            <Box borderColor={colorMode === "light" ? "black" : "white"} borderWidth='0.2em' borderRadius='2em' width='100%' minW='70em' maxHeight='30em' overflow='hidden'>
                <Screen2 productos={productos} onFetchProductos={fetchProductos} socialMedias={socialMedias} 
                colors={{
                    nav: hexNav,
                    background: hexBack,
                    product: hexProduct,
                    textProduct: SummaCorrection(hexProduct),
                    textCategories: SummaCorrection(hexBack),
                    textNav: SummaCorrection(hexNav)
                }}
                />
            </Box>
        </>
    )
}

export default ModPreferencias;