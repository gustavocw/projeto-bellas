import "./style/profile.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import api from "../../services/api";
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
  useToast,
  Box,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  Select,
} from "@chakra-ui/react";
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Loading from "../../components/loading/loading";

export default function ProfilePage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sexo, setSexo] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const token = Cookies.get("token");

  const handleRegister = () => {
    api
      .post(
        "/escort/create",
        {
          email,
          password,
          name,
          sexo,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        Cookies.set("token", response.data.token);
        toast({
          title: "Registrado(a) com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Falha no registro",
          description: "Digite um email e senha válidos.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };



  // const handleEditar = () => {
  //   const token = Cookies.get("token");
  //   const dataToSend = {
  //     price: price || user.dataEscort?.price,
  //     description: description || user.dataEscort?.description,
  //     contact: contact || user.dataEscort?.contact,
  //     type: type || user.dataEscort?.type,
  //     eyes: eyes || user.dataEscort?.eyes,
  //     tatoo: tatoo || user.dataEscort?.tatoo,
  //     piercing: piercing || user.dataEscort?.piercing,
  //     weight: weight || user.dataEscort?.weight,
  //     age: age || user.dataEscort?.age,
  //     height: height || user.dataEscort?.height,
  //     obsScheduling: obsScheduling || user.dataEscort?.obsScheduling,
  //     nationality: nationality || user.dataEscort?.nationality,
  //     isSexAnal: isSexAnal || user.dataEscort?.isSexAnal,
  //     languages: languages || user.dataEscort?.languages,
  //     location: location || user.dataEscort?.location,
  //   };
  //   api
  //     .post("/update/description", dataToSend, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       toast({
  //         title: "ANUNCIO EDITADO COM SUCESSO",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Falha ao editar",
  //         description: "verifique seu login",
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     });
  // };

  // const handleSexAnalChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ): void => {
  //   if (event.target.value === "sim") {
  //     setIsSexAnal(true);
  //   } else {
  //     setIsSexAnal(false);
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);



  return (
    <div className="container-profile">
      <Header />
      <div className="content-profile">
      <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Editar dados da conta
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={5}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Nome Fantasia</FormLabel>
                  <Input
                    focusBorderColor="pink.400"
                    type="name"
                    placeholder="Ex: Natália Loirinha"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    focusBorderColor="pink.400"
                    type="text"
                    placeholder="EX: 932136875"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl id="sexo" isRequired>
                  <Select
                    focusBorderColor="pink.400"
                    w="194px"
                    placeholder="Opção Sexual"
                    value={sexo}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSexo(e.target.value)
                    }
                  >
                    <option value="Mulher">Mulher</option>
                    <option value="Homem">Homem</option>
                    <option value="Trans">Trans</option>
                    <option value="Casal">Casal</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="distrito" isRequired>
                  <Select
                    focusBorderColor="pink.400"
                    w="194px"
                    placeholder="Distrito"
                    value={city}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCity(e.target.value)
                    }
                  >
                    <option value="Aveiro">Aveiro</option>
                    <option value="Bragança">Bragança</option>
                    <option value="Castelo Branco">Castelo Branco</option>
                    <option value="Coimbra">Coimbra</option>
                    <option value="Évora">Évora</option>
                    <option value="Faro">Faro</option>
                    <option value="Guarda">Guarda</option>
                    <option value="Lisboa">Lisboa</option>
                    <option value="Leiria">Leiria</option>
                    <option value="Braga">Braga</option>
                    <option value="Portalegre">Portalegre</option>
                    <option value="Porto">Porto</option>
                    <option value="Santarém">Santarém</option>
                    <option value="Setúbal">Setúbal</option>
                    <option value="Viana do Castelo">Viana do Castelo</option>
                    <option value="Vila Real">Vila Real</option>
                    <option value="Viseu">Viseu</option>
                  </Select>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="password" isRequired>
              <FormLabel>Alterar Senha</FormLabel>
              <InputGroup>
                <Input
                  my="2"
                  focusBorderColor="pink.400"
                  placeholder="Digite sua nova senha"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input
                  focusBorderColor="pink.400"
                  placeholder="Confirme a senha"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"pink.400"}
                color={"white"}
                onClick={handleRegister}
                _hover={{
                  bg: "pink.500",
                }}
              >
                Editar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
      </div>
      <Footer />
    </div>
  );
}
