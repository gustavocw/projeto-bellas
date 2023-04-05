import "./style/anuncie.css";
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
  Center,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RegisterDialogUser from "../../components/RegisterDialog/RegisterUser";
import LoginDialogUser from "../../components/LoginDialog/LoginUser";
import Cookies from "js-cookie";
import Loading from "../../components/loading/loading";

export default function AnunciePage(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [eyes, setEyes] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [obsScheduling, setObsScheduling] = useState("");
  const [age, setAge] = useState(0);
  const [tatoo, setTatoo] = useState(0);
  const [piercing, setPiercing] = useState(0);

  const toast = useToast();

  const handleSubmit = () => {
    uploadImages();
    const token = Cookies.get("token");
    api
      .post(
        "/description/create",
        {
          price,
          description,
          contact,
          type,
          eyes,
          tatoo,
          piercing,
          weight,
          age,
          height,
          obsScheduling,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast({
          title: "ANUNCIO ENVIADO PARA ANÁLISE",
          description: "Verifique sua caixa de email",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Falha ao anunciar",
          description: "verifique seu login",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const token = Cookies.get("token");

  const [images, setImages] = useState<File[]>([]);
  const [sendingImages, setSendingImages] = useState(false);

  const uploadImages = async () => {
    if (images.length === 0) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Selecione pelo menos uma imagem para enviar",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const token = Cookies.get("token");

    setSendingImages(true);
    for (let i = 0; i < images.length; i++) {
      const data = new FormData();
      data.append("file", images[i]);
      const response = await api.post("/upload/images", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setSendingImages(false);

    toast({
      title: "Envio bem sucedido",
      description: "As imagens foram enviadas com sucesso",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div className="container">
      {isLoading && <Loading />}
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
              {!isLoggedIn && (
                <Heading
                  textAlign={"center"}
                  color="red"
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl" }}
                >
                  Registre-se no site ou entre com sua conta antes de anunciar.
                </Heading>
              )}
              <RegisterDialogUser
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              <LoginDialogUser
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
              {isLoggedIn && (
                <Heading
                  color="#e47ce8"
                  textAlign={"center"}
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl" }}
                >
                  Preencha os campos abaixo com suas características.
                  <br></br>
                  <br></br>
                  <span className="informe" >
                    Seram estas características que iram paarecer no anuncio
                  </span>
                </Heading>
              )}
              <Center>
                {images.length > 0 &&
                  images.map((image, index) => (
                    <img
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "120px",
                        height: "150px",
                        margin: "1px",
                      }}
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Imagem ${index}`}
                    />
                  ))}
              </Center>
              <FormControl id="userName">
                <Stack direction={["column"]} spacing={6}>
                  <Center></Center>
                  <Center>
                    {sendingImages ? (
                      <div>Enviando...</div>
                    ) : images.length > 0 ? (
                      <div>
                        Enviando {images.length} foto
                        {images.length > 1 ? "s" : ""}...
                      </div>
                    ) : null}
                  </Center>
                  {isLoggedIn && (
                    <Center display={"block"}>
                      <Heading
                        style={{ textAlign: "center", color: "#e47ce8" }}
                        lineHeight={1.1}
                        fontSize={{ base: "2x1", sm: "12xl" }}
                      >
                        Selecione as imagens que quer no anuncio
                      </Heading>
                      <input
                        type="file"
                        multiple
                        onChange={(event) => {
                          if (event.target.files) {
                            setImages([...event.target.files]);
                          }
                        }}
                      />
                    </Center>
                  )}
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
              <FormLabel>Fale um pouco de sí (*)</FormLabel>
              <Center>
                <Textarea
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                />
              </Center>
              <FormControl id="idade" isRequired>
                <FormLabel>Idade</FormLabel>
                <Input
                  placeholder="19, 25..."
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                  value={age}
                  onChange={(event) => setAge(parseInt(event.target.value))}
                />
              </FormControl>
              <FormControl id="userName" isRequired>
                <FormLabel>Preço</FormLabel>
                <Input
                  placeholder="Ex:€100"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={price}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPrice(e.target.value)
                  }
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contacto</FormLabel>
                <Input
                  placeholder="Ex: 932123123"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={contact}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setContact(e.target.value)
                  }
                />
              </FormControl>
              <FormControl id="userName" isRequired>
                <FormLabel>Tipo</FormLabel>
                <Input
                  placeholder="Loira, Morena..."
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={type}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setType(e.target.value)
                  }
                />
              </FormControl>
              <FormControl id="olhos" isRequired>
                <FormLabel>Olhos</FormLabel>
                <Input
                  placeholder="Azuis, Castanhos..."
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={eyes}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEyes(e.target.value)
                  }
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
                  type="number"
                  value={tatoo}
                  onChange={(event) => setTatoo(parseInt(event.target.value))}
                />
              </FormControl>
              <FormControl id="manequim" isRequired>
                <FormLabel>Qtd. Piercings</FormLabel>
                <Input
                  placeholder="0, 1, 2..."
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                  value={piercing}
                  onChange={(event) =>
                    setPiercing(parseInt(event.target.value))
                  }
                />
              </FormControl>
              <FormControl id="altura" isRequired>
                <FormLabel>Altura</FormLabel>
                <Input
                  placeholder="1,65..."
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={height}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setHeight(e.target.value)
                  }
                />
              </FormControl>
              <FormControl id="peso" isRequired>
                <FormLabel>Peso</FormLabel>
                <Input
                  placeholder="58, 60kg..."
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={weight}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWeight(e.target.value)
                  }
                />
              </FormControl>
              <FormControl id="peso" isRequired>
                <FormLabel>Informe Horário e Local em que atende</FormLabel>
                <Input
                  placeholder="Ex: Ap 123, somente a noite..."
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={obsScheduling}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setObsScheduling(e.target.value)
                  }
                />
              </FormControl>
              <Stack spacing={6} direction={["column", "row"]}>
                {isLoggedIn && (
                  <Button
                    onClick={handleSubmit}
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
