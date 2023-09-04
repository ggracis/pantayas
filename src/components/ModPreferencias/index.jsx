import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    Tbody,
    Thead,
    Tr,
    Th,
    useColorMode,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
    Button
} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";
import { FaFacebook, FaInstagram, FaTiktok, FaGlobe, FaWhatsapp } from "react-icons/fa";
import Colorful from '@uiw/react-color-colorful';
import Screen2 from '../screens/Screen2'

const ModPreferencias = ({ productos, onFetchProductos }) => {

    const { colorMode } = useColorMode();

    const [hexNav, setHexNav] = useState("#190B07");
    const [hexBack, setHexBack] = useState("#FBEFEF");
    const [hexProduct, setHexProduct] = useState("#6E6E6E");

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        await onFetchProductos();
    }; screenX

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
                                <Menu closeOnSelect={false} alignItems='center'>
                                    <MenuButton as={Button} colorScheme='blue'>
                                        <AddIcon />
                                    </MenuButton>
                                    <MenuList minWidth='10em' zIndex='1000'>
                                        <MenuOptionGroup defaultValue='fb' type='radio' alignItems='center'>
                                            <MenuItemOption value='fb'><FaFacebook height='10em' width='10em' /></MenuItemOption>
                                            <MenuItemOption value='wpp'><FaWhatsapp /></MenuItemOption>
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                            </Th>
                            <Th>
                                <Colorful
                                    color={hexNav}
                                    disableAlpha={true}
                                    onChange={(color) => {
                                        setHexNav(color.hexa);
                                    }}
                                />
                            </Th>
                            <Th>
                                <Colorful
                                    color={hexBack}
                                    disableAlpha={true}
                                    onChange={(color) => {
                                        setHexBack(color.hexa);
                                    }}
                                />
                            </Th>
                            <Th>
                                <Colorful

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