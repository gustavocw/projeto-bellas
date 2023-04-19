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
  Center,
  Textarea,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../../components/loading/loading";
import EditImage from "./imageEdit";

export default function ProfilePage(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [eyes, setEyes] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [obsScheduling, setObsScheduling] = useState("");
  const [nationality, setNationality] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [isSexAnal, setIsSexAnal] = useState(false);
  const [age, setAge] = useState(0);
  const [tatoo, setTatoo] = useState(0);
  const [piercing, setPiercing] = useState(0);

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const handleEditar = () => {
    const token = Cookies.get("token");
    const dataToSend = {
      price: price || user.dataEscort?.price,
      description: description || user.dataEscort?.description,
      contact: contact || user.dataEscort?.contact,
      type: type || user.dataEscort?.type,
      eyes: eyes || user.dataEscort?.eyes,
      tatoo: tatoo || user.dataEscort?.tatoo,
      piercing: piercing || user.dataEscort?.piercing,
      weight: weight || user.dataEscort?.weight,
      age: age || user.dataEscort?.age,
      height: height || user.dataEscort?.height,
      obsScheduling: obsScheduling || user.dataEscort?.obsScheduling,
      nationality: nationality || user.dataEscort?.nationality,
      isSexAnal: isSexAnal || user.dataEscort?.isSexAnal,
      languages: languages || user.dataEscort?.languages,
      location: location || user.dataEscort?.location,
    };
    api
      .post("/update/description", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          title: "ANUNCIO EDITADO COM SUCESSO",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Falha ao editar",
          description: "verifique seu login",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleSexAnalChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value === "sim") {
      setIsSexAnal(true);
    } else {
      setIsSexAnal(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
      const response = await api.post("/update/images", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  interface EscortData {
    price: string;
    description: string;
    contact: string;
    type: string;
    eyes: string;
    weight: string;
    height: string;
    obsScheduling: string;
    age: number;
    tatoo: number;
    piercing: number;
    isSexAnal: boolean;
    languages: string;
    location: string;
    nationality: string;
  }

  interface EscortImages {
    id: string;
    urlPhoto: string;
    escortId: string;
  }

  interface User {
    city: string;
    sexo: string;
    name: string;
    imagesEscort: EscortImages[];
    dataEscort: EscortData;
  }

  const [user, setUser] = useState<User>({
    city: "",
    sexo: "",
    name: "",
    dataEscort: {
      price: "",
      description: "",
      contact: "",
      type: "",
      eyes: "",
      weight: "",
      height: "",
      obsScheduling: "",
      age: 0,
      tatoo: 0,
      piercing: 0,
      isSexAnal: false,
      location: "",
      languages: "",
      nationality: "",
    },
    imagesEscort: [
      {
        id: "",
        urlPhoto: "",
        escortId: "",
      },
    ],
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      api
        .get("/escort/list", config)
        .then((response) => {
          const userData = response.data;
          console.log(userData);
          setUser(userData);
        })
        .catch((error) => console.error(error));
    } else {
      console.log("Token not found!");
    }
  }, []);

  return (
    <div className="container-profile">
      {isLoading && <Loading />}
      <Header />
      <div className="content-profile">
        <div className="anuncio-profile">
          <Flex className="all-cards-profile" bg="white">
            <Stack
              className="all-profile"
              spacing={15}
              maxW={"xxl"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              p="30"
            >
              <Flex className="campos-images-profile">
                <EditImage />
              </Flex>
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
            <div className="formularios-profile">
              <Stack
                className="all-profile"
                spacing={6}
                maxW={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                p="12"
              >
                <FormLabel>Fale um pouco de sí (*)</FormLabel>
                <Center>
                  <Textarea
                    _placeholder={{ color: "black" }}
                    placeholder={user.dataEscort?.description}
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDescription(e.target.value)
                    }
                  />
                </Center>
                {/* <FormControl id="city" isRequired>
                  <FormLabel>City</FormLabel>
                  <Input
                    placeholder={user.city}
                    _placeholder={{ color: "black" }}
                    type="text"
                    value={city}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                  />
                </FormControl> */}
                <FormControl id="idade" isRequired>
                  <FormLabel>Idade</FormLabel>
                  <Input
                    placeholder={String(user.dataEscort?.age)}
                    type="number"
                    value={age}
                    onChange={(event) => setAge(parseInt(event.target.value))}
                  />
                </FormControl>
                <FormControl id="olhos" isRequired>
                  <FormLabel>Olhos</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.eyes}
                    _placeholder={{ color: "black" }}
                    type="text"
                    value={eyes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEyes(e.target.value)
                    }
                  />
                </FormControl>
                <FormControl id="olhos" isRequired>
                  <FormLabel>Nacionalidade</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.nationality}
                    _placeholder={{ color: "black" }}
                    type="text"
                    value={nationality}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNationality(e.target.value)
                    }
                  />
                </FormControl>
              </Stack>
              <Stack
                className="all-profile"
                spacing={6}
                maxW={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                p="12"
              >
                <FormControl id="userName" isRequired>
                  <FormLabel>Preço</FormLabel>
                  <Input
                    _placeholder={{ color: "black" }}
                    type="number"
                    placeholder={user.dataEscort?.price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Contacto</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.contact}
                    _placeholder={{ color: "black" }}
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
                    placeholder={user.dataEscort?.type}
                    _placeholder={{ color: "black" }}
                    type="text"
                    value={type}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setType(e.target.value)
                    }
                  />
                </FormControl>
                <FormControl id="tatoo" isRequired>
                  <FormLabel>Qtd. Tatuagens</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.tatoo.toString()}
                    _placeholder={{ color: "black" }}
                    type="number"
                    value={tatoo}
                    onChange={(event) => setTatoo(parseInt(event.target.value))}
                  />
                </FormControl>
                <FormControl id="manequim" isRequired>
                  <FormLabel>Qtd. Piercings</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.piercing.toString()}
                    _placeholder={{ color: "black" }}
                    type="number"
                    value={piercing}
                    onChange={(event) =>
                      setPiercing(parseInt(event.target.value))
                    }
                  />
                </FormControl>
                <FormControl id="olhos" isRequired>
                  <FormLabel>Linguagens</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.languages}
                    _placeholder={{ color: "black" }}
                    type="text"
                    value={languages}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLanguages(e.target.value)
                    }
                  />
                </FormControl>
              </Stack>
              <Stack
                className="all-profile"
                spacing={6}
                maxW={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                p="12"
              >
                <FormControl id="altura" isRequired>
                  <FormLabel>Altura</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.height}
                    _placeholder={{ color: "black" }}
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
                    placeholder={user.dataEscort?.weight}
                    _placeholder={{ color: "black" }}
                    type="text"
                    value={weight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWeight(e.target.value)
                    }
                  />
                </FormControl>
                <FormControl id="local" isRequired>
                  <FormLabel>Localidade</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.location}
                    _placeholder={{ color: "black" }}
                    type="text"
                    value={location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setLocation(e.target.value)
                    }
                  />
                </FormControl>
                <FormControl id="olhos" isRequired>
                  <FormLabel>Sexo Anal</FormLabel>
                  <Select onChange={handleSexAnalChange}>
                    <option value="nao">Não</option>
                    <option value="sim">Sim</option>
                  </Select>
                </FormControl>
                <FormControl id="peso" isRequired>
                  <FormLabel>Informe Horário e Local em que atende</FormLabel>
                  <Input
                    placeholder={user.dataEscort?.obsScheduling}
                    _placeholder={{ color: "black" }}
                    type="text"
                    value={obsScheduling}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setObsScheduling(e.target.value)
                    }
                  />
                </FormControl>
                <Button
                  onClick={handleEditar}
                  bg={"pink.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  Editar dados
                </Button>
              </Stack>
            </div>
          </Flex>
        </div>
      </div>
      <Footer />
    </div>
  );
}
