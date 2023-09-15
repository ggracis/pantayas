import { useColorMode, Box } from "@chakra-ui/react";

import Screen2 from '../../screens/Screen2'
import styles from "../ModPreferencias.module.css";
import { Carousel } from "react-responsive-carousel";

export const CarouselScreens = ({ productos, screenCounter, socialMedias, nav, background, product, title, image, HandleCarousel }) => {

    const { colorMode } = useColorMode();

    let screens = []
    for (let i = 0; i < screenCounter; i++)
        screens.push(
            <Box key={i} borderColor={colorMode === "light" ? "black" : "white"} borderWidth='0.2em' borderRadius='2em' width='100%' minW='70em' maxHeight='30em' overflow='hidden'>
                <Screen2
                    productos={productos}
                    onFetchProductos={() => { }}
                    socialMedia={socialMedias}
                    nav={nav}
                    background={background}
                    product={product}
                    title={title}
                    image={image}
                />
            </Box>
        )
    return (
        <Carousel
            infiniteLoop
            showArrows={true}
            showIndicators={false}
            className={styles.carousel}
            onChange={(index, item)=>HandleCarousel(index)}
        >
            {screens}
        </Carousel>
    )
}
export default CarouselScreens;