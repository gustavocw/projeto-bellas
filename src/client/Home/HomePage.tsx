import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./style/home.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
  Link,
  Spinner,
  Button,
} from "@chakra-ui/react";
import DetailsUser from "./detalhes/DetailsUser";

export interface Escort {
  id: number;
  isOnline: boolean;
  city: string;
  sexo: string;
  name: string;
  imagesEscort: {
    id: string;
    urlPhoto: string;
    escortId: string;
  }[];
  dataEscort: {
    price: string;
    description: string;
    contact: string;
    type: string;
    eyes: string;
    tatoo: number;
    piercing: number;
    weight: string;
    height: string;
    obsScheduling: string;
    age: number;
  }[];
}

const HomePage = () => {
  const [acompanhantes, setAcompanhantes] = useState<Escort[]>([]);
  const [selectedAcompanhante, setSelectedAcompanhante] = useState<Escort | null>(null);
  const [popup, setPopup] = useState(false);
  const [generoSelecionado, setGeneroSelecionado] = useState<string>("Todos");

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/");
      setAcompanhantes(response.data);
    }
    fetchData();
  }, []);

  const click = (acompanhante: Escort) => {
    setSelectedAcompanhante(acompanhante);
    setPopup(true);
  };

  const filterAcompanhantes = () => {
    if (generoSelecionado === "Todos") {
      return acompanhantes;
    } else {
      return acompanhantes.filter(
        (acompanhante) => acompanhante.sexo === generoSelecionado
      );
    }
  };


  return (
    <div className="container">
      <Header />
      <div className="content">
        {popup && (
          <DetailsUser
            acompanhante={selectedAcompanhante}
            onClose={() => setPopup(false)}
          />
        )}
        <div className="titulo">
          <h1 className="apresentacao">Acompanhantes de Luxo em destaque</h1>
          <div className="escolha">
            <Button
              className="btnse"
              color={"#fff"}
              bg={"pink.300"}
              mx="2"
              onClick={() => setGeneroSelecionado("Todos")}
            >
              Todos
            </Button>
            <Button
              className="btnse"
              color={"#fff"}
              bg={"pink.300"}
              mx="2"
              onClick={() => setGeneroSelecionado("Mulher")}
            >
              Mulheres
            </Button>
            <Button
              className="btnse"
              color={"#fff"}
              bg={"pink.300"}
              mx="2"
              onClick={() => setGeneroSelecionado("Homem")}
            >
              Homens
            </Button>
            <Button
              className="btnse"
              color={"#fff"}
              bg={"pink.300"}
              mx="2"
              onClick={() => setGeneroSelecionado("Trans")}
            >
              Trans
            </Button>
            <Button
              className="btnse"
              color={"#fff"}
              bg={"pink.300"}
              mx="2"
              onClick={() => setGeneroSelecionado("Casal")}
            >
              Casais
            </Button>
          </div>
        </div>
        <div className="card-content">
          {filterAcompanhantes().length === 0 ? (
            <div className="msg">
              <div className="spinner">
                <Spinner />
              </div>
              Ainda não possui acompanhantes nesta região
            </div>
          ) : (
            <div className="card">
              {filterAcompanhantes().map((acompanhante) => (
                <Flex className="anuncio" key={acompanhante.id}>
                  <Link
                    onClick={() => click(acompanhante)}
                    className="anunciante-card"
                    bg={useColorModeValue("gray.200", "gray.800")}
                    maxW="sm"
                    borderWidth="1px"
                    rounded="lg"
                    shadow="lg"
                    position="relative"
                  >
                    {acompanhante.name && (
                      <div className="on">
                        <Circle
                          size="10px"
                          position="absolute"
                          top={2}
                          left={2}
                          bg="green.400"
                        />
                        <Text mx="6" >
                          Disponível
                        </Text>
                      </div>
                    )}
                    <Image
                      className='img-card-home'
                      maxWidth={'200px'}
                      maxHeight={'250px'}
                      src={acompanhante.imagesEscort[0]?.urlPhoto}
                      roundedTop="lg"
                    />
  
                    <Box p="6">
                      <Box display={"flex"} alignItems="baseline">
                        <Badge
                          rounded="full"
                          px="2"
                          fontSize="0.8em"
                          colorScheme="red"
                        >
                          {acompanhante.city}
                        </Badge>
                      </Box>
                      <Flex
                        mt="1"
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Box
                          fontSize="1xl"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          isTruncated
                        >
                          {acompanhante.name}
                        </Box>
                      </Flex>
                    </Box>
                  </Link>
                </Flex>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
  
};

export default HomePage;
