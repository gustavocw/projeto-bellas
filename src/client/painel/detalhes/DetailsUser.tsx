import "./dtls.css";
import { Escort } from "../Adm";
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
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import React, { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import api from "../../../services/api";
import Cookies from "js-cookie";
import axios from "axios";

interface DetailsUserProps {
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

const DetailsUser: React.FC<DetailsUserProps> = ({ acompanhante, onClose }) => {
  if (!acompanhante) {
    return null;
  }

  const [slider, setSlider] = React.useState<Slider | null>(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const mensagemAutorizada = () => {
    const nodeurl = "https://api.eumidas.com.br/send";
    // const mediaurl = "https://painel.eumidas.com.br/public/users/1/avatar.png";

    // const buttons = {
    //   replyButtons: [
    //     {
    //       buttonId: "yesContinue",
    //       buttonText: { displayText: "YES" },
    //       type: 1,
    //     },
    //     { buttonId: "noContinue", buttonText: { displayText: "NO" }, type: 1 },
    //     { buttonId: "info", buttonText: { displayText: "More Info" }, type: 1 },
    //   ],
    //   footerText: "This is footer",
    // };

    const data = {
      receiver: `${acompanhante?.dataEscort?.contact}`,
      msgtext: `*Seu anuncio foi aprovado.* \n\n
      DETALHES PARA MENSAGEM DE EXEMPLO COMO QUISER. \u2764\ufe0f`,
      token: "heZD93Lyq8yJxzZMXhYC",
      // mediaurl: mediaurl,
    };

    axios
      .post(nodeurl, data)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const mensagemRejeitada = () => {
    const nodeurl = "https://api.eumidas.com.br/send";
    // const mediaurl = "https://painel.eumidas.com.br/public/users/1/avatar.png";

    // const buttons = {
    //   replyButtons: [
    //     {
    //       buttonId: "yesContinue",
    //       buttonText: { displayText: "YES" },
    //       type: 1,
    //     },
    //     { buttonId: "noContinue", buttonText: { displayText: "NO" }, type: 1 },
    //     { buttonId: "info", buttonText: { displayText: "More Info" }, type: 1 },
    //   ],
    //   footerText: "This is footer",
    // };

    const data = {
      receiver: `${acompanhante?.dataEscort?.contact}`,
      msgtext: `*Seu anuncio foi rejeitado.* \n\n
      DETALHES PARA MENSAGEM DE EXEMPLO COMO QUISER. \u2764\ufe0f`,
      token: "heZD93Lyq8yJxzZMXhYC",
      // mediaurl: mediaurl,
    };

    axios
      .post(nodeurl, data)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const token = Cookies.get("token");
  const handleAutorizar = () => {
    api
      .post(
        "/escorts/authorization",
        {
          escortId: acompanhante.id,
          access: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        onClose();
        mensagemAutorizada()
      })
      .catch((error) => {
        console.log("erro na req");
      });
  };

  const handleRegeitar = () => {
    api
      .post(
        "/escorts/authorization",
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
        mensagemRejeitada()
      })
      .catch((error) => {
        console.log("erro na req");
      });
  };

  return (
    <Container maxW={"7xl"}>
      <div className="btns-ctn">
        <Button borderRadius={'50px'} className="btns" onClick={onClose}>
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
              <Link className="autorizar-painel" onClick={handleAutorizar}>
                Autorizar
              </Link>
              <Link className="rejeitar" onClick={handleRegeitar}>
                Rejeitar
              </Link>
              <Flex className="centrando" >
              <Link className="contatar" href={`https://api.whatsapp.com/send?phone=${acompanhante.dataEscort?.contact}`}>
              <FaWhatsapp style={{ marginRight: "2px" }} /> <span>Contatar</span>
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
              <Text textAlign="center" color="#fff" fontSize={"2xl"} fontWeight={"300"}>
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
                <div className="listas">
                  <div className="list">
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

export default DetailsUser;
