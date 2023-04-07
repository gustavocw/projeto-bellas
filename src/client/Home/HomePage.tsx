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
  Select,
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
  const [selectedAcompanhante, setSelectedAcompanhante] =
    useState<Escort | null>(null);
  const [popup, setPopup] = useState(false);
  const [generoSelecionado, setGeneroSelecionado] = useState<string>("Todos");
  const [localizacaoSelecionada, setLocalizacaoSelecionada] =
    useState<string>("Todos");

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
    if (generoSelecionado === "Todos" && localizacaoSelecionada === "Todos") {
      return acompanhantes;
    } else if (
      generoSelecionado === "Todos" &&
      localizacaoSelecionada !== "Todos"
    ) {
      return acompanhantes.filter(
        (acompanhante) => acompanhante.city === localizacaoSelecionada
      );
    } else {
      return acompanhantes.filter(
        (acompanhante) =>
          acompanhante.sexo === generoSelecionado &&
          (localizacaoSelecionada === "Todos" ||
            acompanhante.city === localizacaoSelecionada)
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
          <div className="escolha-local">
            <Select
              className="local"
              value={localizacaoSelecionada}
              onChange={(event) =>
                setLocalizacaoSelecionada(event.target.value)
              }
            >
              <option className="valores-local" value="Todos">Localização</option>
              <option className="valores-local" value="Aveiro">Aveiro</option>
              <option className="valores-local" value="Bragança">Bragança</option>
              <option className="valores-local" value="Castelo Branco">Castelo Branco</option>
              <option className="valores-local" value="Coimbra">Coimbra</option>
              <option className="valores-local" value="Évora">Évora</option>
              <option className="valores-local" value="Faro">Faro</option>
              <option className="valores-local" value="Guarda">Guarda</option>
              <option className="valores-local" value="Lisboa">Lisboa</option>
              <option className="valores-local" value="Leiria">Leiria</option>
              <option className="valores-local" value="Braga">Braga</option>
              <option className="valores-local" value="Portalegre">Portalegre</option>
              <option className="valores-local" value="Porto">Porto</option>
              <option className="valores-local" value="Santarém">Santarém</option>
              <option className="valores-local" value="Setúbal">Setúbal</option>
              <option className="valores-local" value="Viana do Castelo">Viana do Castelo</option>
              <option className="valores-local" value="Vila Real">Vila Real</option>
              <option className="valores-local" value="Viseu">Viseu</option>
              {/* Adicione outras opções para outras localizações */}
            </Select>
          </div>
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
                        <Text mx="6">Disponível</Text>
                      </div>
                    )}
                    <Image
                      className="img-card-home"
                      maxWidth={"200px"}
                      maxHeight={"250px"}
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
