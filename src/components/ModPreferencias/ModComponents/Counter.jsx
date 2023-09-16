import { Box, Button } from "@chakra-ui/react"

export const Counter = ({ value, add, substract }) => {
    return (
        <>
            <Box as='p' fontSize="1.8em" m='auto'>{value}</Box>
            <Box display={'flex'} alignContent={'center'} justifyContent={'center'}>
                <Button m='3%' onClick={add}>+</Button>
                <Button m='3%' onClick={substract}>-</Button>
            </Box>
        </>
    )
}
export default Counter