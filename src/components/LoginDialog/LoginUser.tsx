import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import RememberPassword from "../remember/remember";



export default function LoginUser() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = () => {
    api
      .post("/escort/login", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        if (token) {
          Cookies.set("token", token, { expires: 1 });
          handleLoginSuccessToast();
          navigate("/");
        } else {
          handleLoginFailToast("Você não está registrado.");
        }
      })
      .catch((error) => {
        handleLoginFailToast("Email ou senha incorretos.");
      });
  };
  
  const handleLoginSuccessToast = () => {
    toast({
      title: "Login realizado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  
  const handleLoginFailToast = (message: string) => {
    toast({
      title: "Falha no login",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
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
          <Heading fontSize={"4xl"}>
            Bem vindo{"a"} ao{" "}
            <Link href="/" color={"pink.400"}>
              Bellas
            </Link>
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Entre com seu número e senha
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Número de Telefone</FormLabel>
              <Input
                placeholder="Ex: 932136845"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                focusBorderColor="pink.400"
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                focusBorderColor="pink.400"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox colorScheme="pink" >Memorizar Usuário</Checkbox>
                <RememberPassword />
              </Stack>
              <Button
                bg={"pink.400"}
                color={"white"}
                onClick={handleLogin}
                _hover={{
                  bg: "pink.500",
                }}
              >
                Entrar
              </Button>
              <Link href="/register" textAlign={'center'} color={"pink.400"}>Criar uma conta no Bellas</Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
