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

const storedOpciones = JSON.parse(localStorage.getItem("userOpciones"));
const logoURL = storedOpciones ? storedOpciones.logoURL : "/chopin.png";
const nombreLocal = storedOpciones ? storedOpciones.nombreLocal : "Pantayas";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const DesktopNav = () => {
    return (
      <nav>
        <NavLink className={styles.enlaces} to="/">
          Inicio
        </NavLink>
        <NavLink className={styles.enlaces} to="/usuario">
          Usuarios
        </NavLink>
        <NavLink className={styles.enlaces} to="/productos">
          Productos
        </NavLink>
        <NavLink className={styles.enlaces} to="/preferencias">
          Preferencias
        </NavLink>
        <NavLink className={styles.enlaces} to="/screen">
          📺 1
        </NavLink>
        <NavLink className={styles.enlaces} to="/screen2">
          📺 2
        </NavLink>
        <NavLink className={styles.enlaces} to="/screen3">
          📺 3
        </NavLink>
        <NavLink className={styles.enlaces} to="/c1">
          📺 🖌
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
              <NavLink className={styles.enlaces} to="/">
                Inicio
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className={styles.enlaces} to="/usuario">
                Usuarios
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className={styles.enlaces} to="/productos">
                Productos
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className={styles.enlaces} to="/preferencias">
                Preferencias
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className={styles.enlaces} to="/screen">
                📺 1
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className={styles.enlaces} to="/screen2">
                📺 2
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className={styles.enlaces} to="/screen3">
                📺 3
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className={styles.enlaces} to="/c1">
                📺 🖌
              </NavLink>
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
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex align="center" mr={5}>
          <NavLink to="/">
            <Heading as="h1" size="lg">
              {colorMode === "light" ? (
                <Image
                  maxH={55}
                  src={logoURL}
                  alt={nombreLocal}
                  title={nombreLocal}
                />
              ) : (
                <Image
                  maxH={55}
                  src={logoURL} // version Dark
                  alt={nombreLocal}
                  title={nombreLocal}
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

        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                {/* <Avatar
                  size={"md"}
                  src={`https://avatars.dicebear.com/api/male/${userNombre}${userApellido}.svg`}
                  alt={userNombre}
                  title={userNombre}
                /> */}
              </MenuButton>
              <MenuList alignItems="center">
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
