import "./style/anuncie.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function AnunciePage(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="anuncio">
          <Flex
            minH={"100vh"}
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Stack
              className="all"
              spacing={4}
              maxW={"sm"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p="6"
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Preencha com suas características
              </Heading>
              <div className="formulario">
                <FormControl id="userName">
                  <Stack direction={["column"]} spacing={6}>
                    <Center>
                      <img
                        src="http://www.caurn.org.br/wp-content/uploads/2017/03/IMG_7320.jpg"
                        alt="imagem"
                      />
                    </Center>
                    <Center>
                      <Input
                        type={"file"}
                        placeholder="Digite o texto personalizado aqui"
                        multiple
                      />
                    </Center>
                  </Stack>
                </FormControl>
              </div>
              <div className="formulario">
                <FormControl id="userName" isRequired>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    placeholder="Nome"
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="email@example.com"
                    _placeholder={{ color: "gray.500" }}
                    type="email"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Contacto</FormLabel>
                  <Input
                    placeholder="Contacto"
                    _placeholder={{ color: "gray.500" }}
                    type="tel"
                  />
                </FormControl>
              </div>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
            <Stack
              className="formulario-all"
              spacing={4}
              maxW={"sm"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              boxShadow={"lg"}
              p="6"
            >
              <div className="formulario">
                <FormControl id="userName" isRequired>
                  <FormLabel>Tipo</FormLabel>
                  <Input
                    placeholder="Loira, Morena..."
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="olhos" isRequired>
                  <FormLabel>Olhos</FormLabel>
                  <Input
                    placeholder="Azuis, Castanhos..."
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="cintura" isRequired>
                  <FormLabel>Cintura</FormLabel>
                  <Input
                    placeholder="60cm, 55cm..."
                    _placeholder={{ color: "gray.500" }}
                    type="tel"
                  />
                </FormControl>
                <FormControl id="manequim" isRequired>
                  <FormLabel>Manequim</FormLabel>
                  <Input
                    placeholder="36, 40..."
                    _placeholder={{ color: "gray.500" }}
                    type="tel"
                  />
                </FormControl>
                <FormControl id="pes" isRequired>
                  <FormLabel>Pés</FormLabel>
                  <Input
                    placeholder="35, 38..."
                    _placeholder={{ color: "gray.500" }}
                    type="tel"
                  />
                </FormControl>
                <FormControl id="altura" isRequired>
                  <FormLabel>Altura</FormLabel>
                  <Input
                    placeholder="1,65..."
                    _placeholder={{ color: "gray.500" }}
                    type="tel"
                  />
                </FormControl>
                <FormControl id="peso" isRequired>
                  <FormLabel>Peso</FormLabel>
                  <Input
                    placeholder="58, 60..."
                    _placeholder={{ color: "gray.500" }}
                    type="tel"
                  />
                </FormControl>
                <FormControl id="quadril" isRequired>
                  <FormLabel>Quadril</FormLabel>
                  <Input
                    placeholder="100cm..."
                    _placeholder={{ color: "gray.500" }}
                    type="tel"
                  />
                </FormControl>
                <FormControl id="idade" isRequired>
                  <FormLabel>Idade</FormLabel>
                  <Input
                    placeholder="19, 25..."
                    _placeholder={{ color: "gray.500" }}
                    type="tel"
                  />
                </FormControl>
              </div>
            </Stack>
          </Flex>
        </div>
      </div>
      <Footer />
    </div>
  );
}
