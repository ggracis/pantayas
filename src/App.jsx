import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";

const categories = ["Entradas", "Platos principales", "Postres"];
const menuItems = [
  {
    name: "Ensalada César",
    description: "Lechuga, pollo, crutones y aderezo César",
    price: 8.99,
    category: "Entradas",
  },
  {
    name: "Hamburguesa clásica",
    description: "Carne de res, quesoeddar, lechuga y tomate",
    price: 12.99,
    category: "Platos principales",
  },
  {
    name: "Tarta de manzana",
    description: "Tarta de manzana con helado de vainilla",
    price: 6.99,
    category: "Postres",
  },
];

function MenuItem({ name, description, price }) {
  return (
    <Flex justify="space-between" mb={4}>
      <Box>
        <Heading as="h3" size="md">
          {name}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          {description}
        </Text>
      </Box>
      <Text fontSize="lg" fontWeight="bold">
        ${price}
      </Text>
    </Flex>
  );
}

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.category.includes(selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Menú
      </Heading>
      <Flex mb={4}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Buscar plato"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Select
          ml={4}
          placeholder="Filtrar por categoría"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Flex>
      {filteredMenuItems.length > 0 ? (
        filteredMenuItems.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))
      ) : (
        <Text>No se encontraron platos</Text>
      )}
    </Box>
  );
}
