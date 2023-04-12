import "./dtls.css";
import { Escort } from "../HomePage";
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
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import Slider from "react-slick";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import React, { useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";

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

  return (
    <Container maxW={"7xl"}>
      <div className="btns-ctn">
        <Button className="btns" onClick={onClose}>
          <CloseIcon />
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
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "4xl" }}
              color="#fff"
            >
              {acompanhante.name}
              {" - "}
              <span className="age">
                {acompanhante.dataEscort?.age} anos
              </span>
            </Heading>
            <Text color="#fff" fontWeight={300} fontSize={"2xl"}>
              ¢{acompanhante.dataEscort?.price}
            </Text>
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
              <Text color="#fff" fontSize={"2xl"} fontWeight={"300"}>
                {acompanhante.dataEscort?.description}
              </Text>
            </VStack>
            <Box>
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
                className="toda-lista"
                spacing={2}
                style={{
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div className="list">
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Contacto:
                    </Text>{" "}
                    {acompanhante.dataEscort?.contact}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Tipo:
                    </Text>{" "}
                    {acompanhante.dataEscort?.type}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Olhos:
                    </Text>{" "}
                    {acompanhante.dataEscort?.eyes}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Qtd. tatuagens:
                    </Text>{" "}
                    {acompanhante.dataEscort?.tatoo}
                  </ListItem>
                </div>
                <div className="list">
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Qtd. Piercings:
                    </Text>{" "}
                    {acompanhante.dataEscort?.piercing}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Altura:
                    </Text>{" "}
                    {acompanhante.dataEscort?.height}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Peso:
                    </Text>{" "}
                    {acompanhante.dataEscort?.weight} kg
                  </ListItem>
                </div>
                <div className="separado">
                <ListItem className="textos-hl" >
                    <Text as={"span"} fontWeight={"bold"}>
                      Horario e Local:
                    </Text>{" "}
                    {acompanhante.dataEscort?.obsScheduling}
                  </ListItem>
                </div>
              </List>
            </Box>
          </Stack>

          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "10px",
            }}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("whiteAlpha.900", "whiteAlpha.50")}
            color="#e47ce8"
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            href={`https://api.whatsapp.com/send?phone=${acompanhante.dataEscort?.contact}`}
            isExternal
          >
            <Text
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaWhatsapp style={{ color: "#e47ce8", marginRight: "10px" }} />
              Contatar
            </Text>
          </Link>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default DetailsUser;
