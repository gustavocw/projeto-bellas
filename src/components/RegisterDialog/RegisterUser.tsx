import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sexo, setSexo] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

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
        navigate("/");
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

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Registre-se no Bellas
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            para poder anunciar seu serviço ✌️
          </Text>
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
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  focusBorderColor="pink.400"
                  placeholder="Senha"
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
                Criar
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Já possui conta?{" "}
                <Link href="/login" color={"pink.400"}>
                  Entrar
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
