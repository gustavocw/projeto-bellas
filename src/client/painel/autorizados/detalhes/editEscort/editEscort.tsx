import { Escort } from "../../Autorizados";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  useBreakpointValue,
  List,
  ListItem,
  IconButton,
  Link,
  Center,
  UnorderedList,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import api from "../../../../../services/api";
import Cookies from "js-cookie";
import "./edit.css";
interface EditEscortProps {
  acompanhante: Escort | null;
  onClose: () => void;
}

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const EditEscort: React.FC<EditEscortProps> = ({ acompanhante, onClose }) => {
  if (!acompanhante) {
    return null;
  }

  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const show = () => {
    setShowTable(true);
  };
  const hidden = () => {
    setShowTable(false);
  };

  const token = Cookies.get("token");

  const toast = useToast();

  const handleExcluir = () => {
    const toast = useToast();
    api
      .post(
        "/adm/deleteEscort",
        {
          escortId: acompanhante.id,
          access: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast({
          title: "Acompanhante excluída",
          description: "Você excluiu uma acompanhante",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        console.log("erro na req");
      });
  };

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
  const handleEditar = () => {
    const token = Cookies.get("token");
    const dataToSend = {
      userId: acompanhante?.id,
      price: price || acompanhante.dataEscort?.price,
      description: description || acompanhante.dataEscort?.description,
      contact: contact || acompanhante.dataEscort?.contact,
      type: type || acompanhante.dataEscort?.type,
      eyes: eyes || acompanhante.dataEscort?.eyes,
      tatoo: tatoo || acompanhante.dataEscort?.tatoo,
      piercing: piercing || acompanhante.dataEscort?.piercing,
      weight: weight || acompanhante.dataEscort?.weight,
      age: age || acompanhante.dataEscort?.age,
      height: height || acompanhante.dataEscort?.height,
      obsScheduling: obsScheduling || acompanhante.dataEscort?.obsScheduling,
      nationality: nationality || acompanhante.dataEscort?.nationality,
      isSexAnal: isSexAnal || acompanhante.dataEscort?.isSexAnal,
      languages: languages || acompanhante.dataEscort?.languages,
      location: location || acompanhante.dataEscort?.location,
    };
    api
      .post("/adm/updateEscort", dataToSend, {
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

  const handleSexAnalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value === "sim") {
      setIsSexAnal(true);
    } else {
      setIsSexAnal(false);
    }
  };

  const [showTable, setShowTable] = useState(false);

  return (
    <Container maxW={"7xl"}>
      <div className="btns-ctn">
        <Button className="btns" onClick={onClose}>
          <CloseIcon className="close" />
        </Button>
      </div>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Box
            position={"relative"}
            height={"650px"}
            width={"full"}
            overflow={"hidden"}
          >
            {/* CSS files for react-slick */}
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* Left Icon */}
            <IconButton
              color="#e47ce8"
              aria-label="left-arrow"
              variant="ghost"
              position="absolute"
              left={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
            >
              <BiLeftArrowAlt size="40px" />
            </IconButton>
            {/* Right Icon */}
            <IconButton
              color="#e47ce8"
              aria-label="right-arrow"
              variant="ghost"
              position="absolute"
              right={side}
              top={top}
              transform={"translate(0%, -50%)"}
              zIndex={2}
              onClick={() => slider?.slickNext()}
            >
              <BiRightArrowAlt size="40px" />
            </IconButton>
            {/* Slider */}
            <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
              {acompanhante.imagesEscort.map((imagem, index) => (
                <Box
                  key={index}
                  height={"1xl"}
                  position="relative"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundSize="contain"
                  backgroundImage={`url(${imagem.urlPhoto})`}
                  style={{ backgroundSize: "contain" }}
                >
                  {/* This is the block you need to change, to customize the caption */}
                  <Container
                    size="container.lg"
                    height="500px"
                    position="relative"
                  >
                    <Stack
                      spacing={6}
                      w={"full"}
                      maxW={"lg"}
                      position="absolute"
                      top="70%"
                      transform="translate(0, -30%)"
                    ></Stack>
                  </Container>
                </Box>
              ))}
            </Slider>
          </Box>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box className="centro" as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "4xl" }}
              color="#fff"
            >
              {acompanhante.name}
              {" - "}
              <span className="age">{acompanhante.dataEscort?.age} anos</span>
            </Heading>
            <Text color="#fff" fontWeight={300} fontSize={"2xl"}>
              ¢{acompanhante.dataEscort?.price}
            </Text>
            <Flex className="ajustes">
              <Flex className="centrando">
                <Link className="excluir" onClick={handleExcluir}>
                  Excluir
                </Link>
                <Link
                  className="contatar"
                  href={`https://api.whatsapp.com/send?phone=${acompanhante.dataEscort?.contact}`}
                >
                  <FaWhatsapp style={{ marginRight: "2px" }} />{" "}
                  <span>Contatar</span>
                </Link>
              </Flex>
            </Flex>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("white.200", "white.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                textAlign="center"
                color="#fff"
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {acompanhante.dataEscort?.description}
              </Text>
            </VStack>
            <Box className="detalhes-escort">
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("pink.500", "pink.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
                style={{ display: "flex", justifyContent: "center" }}
              >
                Detalhes
              </Text>

              <List
                spacing={2}
                style={{
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  className="listas"
                >
                  <div style={{ marginTop: '5px' }} className="editar">
                    {!showTable ? (
                      <Link
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                          padding: "5px",
                          borderRadius: "20px",
                        }}
                        onClick={show}
                      >
                        Ver Detalhes
                      </Link>
                    ) : (
                      <Link
                        style={{
                          backgroundColor: "#fff",
                          color: "#000",
                          padding: "5px",
                          borderRadius: "20px",
                        }}
                        onClick={hidden}
                      >
                        Editar Detalhes
                      </Link>
                    )}
                  </div>
                  <div className="list">
                    {showTable ? (
                      <Box bg="gray.900" p={4}>
                        <UnorderedList
                          display="flex"
                          flexWrap="wrap"
                          justifyContent="space-between"
                        >
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Altura:
                            </Text>{" "}
                            {acompanhante.dataEscort?.height}
                          </ListItem>
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Contacto:
                            </Text>{" "}
                            {acompanhante.dataEscort?.contact}
                          </ListItem>
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Peso:
                            </Text>{" "}
                            {acompanhante.dataEscort?.weight} kg
                          </ListItem>
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Tipo:
                            </Text>{" "}
                            {acompanhante.dataEscort?.type}
                          </ListItem>
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Local:
                            </Text>{" "}
                            {acompanhante.dataEscort?.location}
                          </ListItem>
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Olhos:
                            </Text>{" "}
                            {acompanhante.dataEscort?.eyes}
                          </ListItem>
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Sexo anal:
                            </Text>{" "}
                            {acompanhante.dataEscort?.isSexAnal ? "Sim" : "Não"}
                          </ListItem>
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Qtd. tatuagens:
                            </Text>{" "}
                            {acompanhante.dataEscort?.tatoo}
                          </ListItem>
                          <ListItem flexBasis="45%">
                            <Text as="span" fontWeight="bold">
                              Qtd. Piercings:
                            </Text>{" "}
                            {acompanhante.dataEscort?.piercing}
                          </ListItem>
                          <ListItem flexBasis="100%">
                            <Text as="span" fontWeight="bold">
                              Linguagens:
                            </Text>{" "}
                            {acompanhante.dataEscort?.languages}
                          </ListItem>
                          <ListItem flexBasis="100%" mt={2}>
                            <Text as="span" fontWeight="bold">
                              Nacionalidade:
                            </Text>{" "}
                            {acompanhante.dataEscort?.nationality}
                          </ListItem>
                          <ListItem flexBasis="100%" mt={2}>
                            <Text as="span" fontWeight="bold">
                              Horário e Local:
                            </Text>{" "}
                            {acompanhante.dataEscort?.obsScheduling}
                          </ListItem>
                        </UnorderedList>
                      </Box>
                    ) : (
                      <div className="form">
                        <div className="formularios-profile">
                          <Stack
                            className="all-profiles"
                            spacing={6}
                            bg={useColorModeValue("white", "gray.700")}
                            rounded={"xl"}
                            p="12"
                          >
                            <FormLabel color="#000">
                              Fale um pouco de sí (*)
                            </FormLabel>
                            <Center>
                              <Textarea
                                _placeholder={{ color: "black" }}
                                placeholder={
                                  acompanhante.dataEscort?.description
                                }
                                value={description}
                                onChange={(
                                  e: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setDescription(e.target.value)}
                              />
                            </Center>
                            <FormControl id="idade" isRequired>
                              <FormLabel color="#000">Idade</FormLabel>
                              <Input
                                color="#000"
                                placeholder={String(
                                  acompanhante.dataEscort?.age
                                )}
                                type="number"
                                value={age}
                                onChange={(event) =>
                                  setAge(parseInt(event.target.value))
                                }
                              />
                            </FormControl>
                            <FormControl id="olhos" isRequired>
                              <FormLabel color="#000">Olhos</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.eyes}
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={eyes}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setEyes(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="olhos" isRequired>
                              <FormLabel color="#000">Nacionalidade</FormLabel>
                              <Input
                                color="#000"
                                placeholder={
                                  acompanhante.dataEscort?.nationality
                                }
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={nationality}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setNationality(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="userName" isRequired>
                              <FormLabel color="#000">Preço</FormLabel>
                              <Input
                                color="#000"
                                _placeholder={{ color: "black" }}
                                type="number"
                                placeholder={acompanhante.dataEscort?.price}
                                onChange={(event) =>
                                  setPrice(event.target.value)
                                }
                              />
                            </FormControl>
                            <FormControl id="password" isRequired>
                              <FormLabel color="#000">Contacto</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.contact}
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={contact}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setContact(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="userName" isRequired>
                              <FormLabel color="#000">Tipo</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.type}
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={type}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setType(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="tatoo" isRequired>
                              <FormLabel color="#000">Qtd. Tatuagens</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.tatoo.toString()}
                                _placeholder={{ color: "black" }}
                                type="number"
                                value={tatoo}
                                onChange={(event) =>
                                  setTatoo(parseInt(event.target.value))
                                }
                              />
                            </FormControl>
                            <FormControl id="manequim" isRequired>
                              <FormLabel color="#000">Qtd. Piercings</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.piercing.toString()}
                                _placeholder={{ color: "black" }}
                                type="number"
                                value={piercing}
                                onChange={(event) =>
                                  setPiercing(parseInt(event.target.value))
                                }
                              />
                            </FormControl>
                            <FormControl id="olhos" isRequired>
                              <FormLabel color="#000">Linguagens</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.languages}
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={languages}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setLanguages(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="altura" isRequired>
                              <FormLabel color="#000">Altura</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.height}
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={height}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setHeight(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="peso" isRequired>
                              <FormLabel color="#000">Peso</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.weight}
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={weight}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setWeight(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="local" isRequired>
                              <FormLabel color="#000">Localidade</FormLabel>
                              <Input
                                color="#000"
                                placeholder={acompanhante.dataEscort?.location}
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={location}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setLocation(e.target.value)}
                              />
                            </FormControl>
                            <FormControl id="olhos" isRequired>
                              <FormLabel color="#000">Sexo Anal</FormLabel>
                              <Select
                                className="valores"
                                onChange={handleSexAnalChange}
                              >
                                <option className="valores" value="nao">
                                  Não
                                </option>
                                <option className="valores" value="sim">
                                  Sim
                                </option>
                              </Select>
                            </FormControl>
                            <FormControl id="peso" isRequired>
                              <FormLabel color="#000">
                                Informe Horário e Local em que atende
                              </FormLabel>
                              <Input
                                color="#000"
                                placeholder={
                                  acompanhante.dataEscort?.obsScheduling
                                }
                                _placeholder={{ color: "black" }}
                                type="text"
                                value={obsScheduling}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => setObsScheduling(e.target.value)}
                              />
                            </FormControl>
                            <Button
                              onClick={handleEditar}
                              bg={"pink.400"}
                              color={"white"}
                              w="sm"
                              p="2"
                              className="editar-dados"
                              _hover={{
                                bg: "pink.500",
                              }}
                            >
                              Editar dados
                            </Button>
                          </Stack>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default EditEscort;
