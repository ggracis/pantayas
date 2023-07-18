import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Image,
  WrapItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const DesktopNav = () => {
    return (
      <nav>
        <NavLink className={styles.enlaces} to="/">
          Inicio
        </NavLink>
        <NavLink className={styles.enlaces} to="/usuario">
          Agregar usuario
        </NavLink>
        <NavLink className={styles.enlaces} to="/productos">
          Agregar productos
        </NavLink>
      </nav>
    );
  };
  const MobileNav = () => {
    return (
      <nav>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            mr={2}
            size="l"
            p={5}
          />
          <MenuList>
            <MenuItem>
              <NavLink to="/">Inicio</NavLink>
            </MenuItem>

            <MenuItem>
              <NavLink to="/herramientas">Herramientas</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/deportes">Deportes y fitness</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/moda">Moda</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/salud">Salud y belleza</NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </nav>
    );
  };

  return (
    <Box
      px={4}
      position="sticky"
      top={0}
      width="100%"
      zIndex={1}
      pb={2}
      className={styles.navbar}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex align="center" mr={5}>
          <NavLink to="/">
            <Heading as="h1" size="lg">
              {colorMode === "light" ? (
                <Image
                  maxH={55}
                  src="/chopin.png"
                  alt="PANTAYAS"
                  title="PANTAYAS"
                />
              ) : (
                <Image
                  maxH={55}
                  src="/chopin_w.png"
                  alt="PANTAYAS"
                  title="PANTAYAS"
                />
              )}
            </Heading>
          </NavLink>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          <DesktopNav />
        </Flex>
        <Flex display={{ base: "flex", md: "none" }}>
          <MobileNav />
        </Flex>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                {/* <Avatar
                  size={"md"}
                  src={`https://avatars.dicebear.com/api/male/${userNombre}${userApellido}.svg`}
                  alt={userNombre}
                  title={userNombre}
                /> */}
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <WrapItem>
                    {/*  <Avatar
                      size={"2xl"}
                      src={`https://avatars.dicebear.com/api/male/${userNombre}${userApellido}.svg`}
                      alt={userNombre}
                      title={userNombre}
                    /> */}
                  </WrapItem>
                </Center>
                <br />
                <Center>
                  <p>Hola !</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>
                  <NavLink to="/miscompras">Mis compras</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/admProductos">
                    ❗Administrar productos❗
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Menu>

            <Button onClick={toggleColorMode} size="l" p={5}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
