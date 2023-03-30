import "./style/anuncie.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import api from "../../services/api"
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
  useDisclosure,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import LoginDialogUser from "../../components/LoginDialog/LoginUser";

export default function AnunciePage(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [answer, setAnswer] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const DEFAULT_IMAGE_SRC = "https://via.placeholder.com/450";

  const h = () => {
    setAnswer("homem");
  };
  const m = () => {
    setAnswer("mulher");
  };
  const t = () => {
    setAnswer("trans");
  };
  const c = () => {
    setAnswer("casal");
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await api.post("/escort/create", {
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="anuncio">
          <Flex className="all-cards" bg="white">
            <Stack
              className="all"
              spacing={6}
              maxW={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              p="12"
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Preencha com suas características
              </Heading>
              <FormControl id="userName">
                <Stack direction={["column"]} spacing={6}>
                  <Center>
                    <img src={imageSrc || DEFAULT_IMAGE_SRC} alt="imagem" />
                  </Center>
                  <Center>
                    <Input
                      type={"file"}
                      placeholder="Digite o texto personalizado aqui"
                      multiple
                      onChange={handleImageChange}
                    />
                  </Center>
                  <FormLabel>Fale um pouco de sí (*)</FormLabel>
                  <Center>
                    <Textarea />
                  </Center>
                </Stack>
              </FormControl>
            </Stack>
            <Stack
              className="all"
              spacing={6}
              maxW={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              p="12"
            >
              <Center>
                <Button
                  bg={"pink.500"}
                  color={"#fff"}
                  size={"sm"}
                  onClick={h}
                  isLoading={answer === "homem"}
                  px={"2"}
                  mx={"1"}
                >
                  homem
                </Button>
                <Button
                  bg={"pink.500"}
                  color={"#fff"}
                  size={"sm"}
                  onClick={m}
                  isLoading={answer === "mulher"}
                  px={"2"}
                  mx={"1"}
                >
                  mulher
                </Button>
                <Button
                  bg={"pink.500"}
                  color={"#fff"}
                  size={"sm"}
                  onClick={t}
                  isLoading={answer === "trans"}
                  px={"2"}
                  mx={"1"}
                >
                  TRANS
                </Button>
                <Button
                  bg={"pink.500"}
                  color={"#fff"}
                  size={"sm"}
                  onClick={c}
                  isLoading={answer === "casal"}
                  px={"2"}
                  mx={"1"}
                >
                  casal
                </Button>
              </Center>
              <FormControl id="userName" isRequired>
                <Select placeholder="Localização">
                  <option value="Aveiro">Aveiro</option>
                  <option value="Bragança">Bragança</option>
                  <option value="Castelo Branco">Castelo Branco</option>
                  <option value="Coimbra">Coimbra</option>
                  <option value="Évora">Évora</option>
                  <option value="Faro">Faro</option>
                  <option value="Guarda">Guarda</option>
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
              <FormControl id="idade" isRequired>
                <FormLabel>Idade</FormLabel>
                <Input
                  placeholder="19, 25..."
                  _placeholder={{ color: "gray.500" }}
                  type="tel"
                />
              </FormControl>
              <FormControl id="userName" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  placeholder="Nome"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
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
            </Stack>
            <Stack
              className="all"
              spacing={6}
              maxW={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              p="12"
            >
              <FormControl id="tatoo" isRequired>
                <FormLabel>Qtd. Tatuagens</FormLabel>
                <Input
                  placeholder="0, 1, 2..."
                  _placeholder={{ color: "gray.500" }}
                  type="tel"
                />
              </FormControl>
              <FormControl id="manequim" isRequired>
                <FormLabel>Qtd. Piercings</FormLabel>
                <Input
                  placeholder="0, 1, 2..."
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
                  placeholder="58, 60kg..."
                  _placeholder={{ color: "gray.500" }}
                  type="tel"
                />
              </FormControl>
              <FormControl id="peso" isRequired>
                <FormLabel>Informe Horário e Local em que atende</FormLabel>
                <Input
                  placeholder="Ex: Ap 123, somente a noite..."
                  _placeholder={{ color: "gray.500" }}
                  type="tel"
                />
              </FormControl>
              <LoginDialogUser
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <Stack spacing={6} direction={["column", "row"]}>
                {isLoggedIn && (
                  <Button
                    disabled={!isLoggedIn}
                    bg={"pink.400"}
                    color={"white"}
                    w="full"
                    _hover={{
                      bg: "pink.500",
                    }}
                  >
                    Concluir
                  </Button>
                )}
              </Stack>
            </Stack>
          </Flex>
        </div>
      </div>
      <Footer />
    </div>
  );
}
