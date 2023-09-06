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


const socialMedias = [
    { value: "WPP", icon: FaWhatsapp },
    { value: "FB", icon: FaFacebook },
    { value: "IG", icon: FaInstagram },
    { value: "TT", icon: FaTiktok },
    { value: "Gl", icon: FaGlobe }
];




const ModPreferencias = ({ productos, onFetchProductos }) => {

    const { colorMode } = useColorMode();

    const [hexNav, setHexNav] = useState("#190B07");
    const [hexBack, setHexBack] = useState("#FBEFEF");
    const [hexProduct, setHexProduct] = useState("#6E6E6E");

    const [selectedSocial, setSelectedSocial] = useState(socialMedias[0]);

    const Option = (props) => (
        <components.Option {...props} className={styles.SelectForm}>
            <Icon as={props.data.icon} alt="logo" width='30%' height='30%' m='auto' />
        </components.Option>
    );

    const SingleValue = ({ children, ...props }) => (
        <components.SingleValue {...props} className={styles.SelectForm}>
            <Icon as={props.data.icon} alt="s-logo" width='50%' height='50%' m='auto' />
        </components.SingleValue>
    );

    const handleChange = (value) => {
        setSelectedSocial(value);
    };

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
                bg="whiteAlpha.50"
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
                            <Th textAlign='center'>
                                <Stack>
                                        <Box display='flex'>
                                                <Box minWidth='25%' pr='1em'>
                                                    <Select
                                                        className={styles.SelectForm}
                                                        value={selectedSocial}
                                                        options={socialMedias}
                                                        onChange={handleChange}
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
                                                <Input placeholder='Ej: @NTQJ' />
                                            </Box>
                                    <SimpleGrid columns={2} spacing={4}>
                                        <IconButton icon={<AddIcon />} />
                                        <IconButton icon={<CloseIcon />} />
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
                <Box borderColor={colorMode === "light" ? "black" : "white"} borderWidth='0.2em' borderRadius='2em' width='100%' maxHeight='30em' overflow='hidden'>
                    <Screen2 productos={productos} onFetchProductos={fetchProductos} />
                </Box>
            </Box>
        </>
    )
}

export default ModPreferencias;