import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  useColorMode,
  Heading,
  Image,
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

        <NavLink className={styles.enlaces} to="/c1" target="_blank">
          📺 1
        </NavLink>
        <NavLink className={styles.enlaces} to="/c2" target="_blank">
          📺 2
        </NavLink>
        <NavLink className={styles.enlaces} to="/issues">
          Sugerencias 💡
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
              <NavLink to="/usuario">Usuarios</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/productos">Productos</NavLink>
            </MenuItem>

            <MenuItem>
              <NavLink to="/preferencias">Preferencias</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/c1" target="_blank">
                📺 1
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/c2" target="_blank">
                📺 2
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/issues">Sugerencias 💡</NavLink>
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
            <Button onClick={toggleColorMode} size="l" p={5}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
