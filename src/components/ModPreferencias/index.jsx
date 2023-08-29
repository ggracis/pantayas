import React, { useEffect } from "react";
import {
    Box,
    Table,
    Tbody,
    Thead,
    Tr,
    Th
} from '@chakra-ui/react';

const ModPreferencias = () => {

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        await onFetchProductos();
    };screenX

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
                            <Th>Redes Sociales</Th>
                            <Th>Color nav</Th>
                            <Th>Color back</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    </Tbody>
                </Table>
            </Box>
        </>
    )
}

export default ModPreferencias;