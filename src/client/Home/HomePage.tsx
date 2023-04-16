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
    languages: string;
    location: string;
    isSexAnal: boolean;
    nationality: string;
    obsScheduling: string;
    age: number;
  };
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

  async function fetchData() {
    const response = await api.get("/");
    setAcompanhantes(response.data);

    const countCoimbra = response.data.filter(
      (acompanhante: { city: string }) => acompanhante.city === "Coimbra"
    ).length;
    setQuantidadeCoimbra(countCoimbra);

    const countLisboa = response.data.filter(
      (acompanhante: { city: string }) => acompanhante.city === "Lisboa"
    ).length;
    setQuantidadeLisboa(countLisboa);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/");
      setAcompanhantes(response.data);

      const countCoimbra = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Coimbra"
      ).length;
      setQuantidadeCoimbra(countCoimbra);

      const countLisboa = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Lisboa"
      ).length;
      setQuantidadeLisboa(countLisboa);

      const countAveiro = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Aveiro"
      ).length;
      setQuantidadeAveiro(countAveiro);

      const countBraganca = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Bragança"
      ).length;
      setQuantidadeBraganca(countBraganca);

      const countCasteloBranco = response.data.filter(
        (acompanhante: { city: string }) =>
          acompanhante.city === "Castelo Branco"
      ).length;
      setQuantidadeCasteloBranco(countCasteloBranco);

      const countEvora = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Évora"
      ).length;
      setQuantidadeEvora(countEvora);

      const countFaro = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Faro"
      ).length;
      setQuantidadeFaro(countFaro);

      const countGuarda = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Guarda"
      ).length;
      setQuantidadeGuarda(countGuarda);

      const countLeiria = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Leiria"
      ).length;
      setQuantidadeLeiria(countLeiria);

      const countBraga = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Braga"
      ).length;
      setQuantidadeBraga(countBraga);

      const countPorto = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Porto"
      ).length;
      setQuantidadePorto(countPorto);
      const countSantarém = response.data.filter(
        (acompanhante: { city: string }) => acompanhante.city === "Santarém"
      ).length;
      setQuantidadeSantarém(countSantarém);
    }
    fetchData();
  }, []);

  const [quantidadeCoimbra, setQuantidadeCoimbra] = useState<number>(0);
  const [quantidadeLisboa, setQuantidadeLisboa] = useState<number>(0);
  const [quantidadeAveiro, setQuantidadeAveiro] = useState<number>(0);
  const [quantidadeBraganca, setQuantidadeBraganca] = useState<number>(0);
  const [quantidadeCasteloBranco, setQuantidadeCasteloBranco] =
    useState<number>(0);
  const [quantidadeEvora, setQuantidadeEvora] = useState<number>(0);
  const [quantidadeFaro, setQuantidadeFaro] = useState<number>(0);
  const [quantidadeGuarda, setQuantidadeGuarda] = useState<number>(0);
  const [quantidadeLeiria, setQuantidadeLeiria] = useState<number>(0);
  const [quantidadeBraga, setQuantidadeBraga] = useState<number>(0);
  const [quantidadePorto, setQuantidadePorto] = useState<number>(0);
  const [quantidadeSantarém, setQuantidadeSantarém] = useState<number>(0);

  return (
    <div className="container">
      <Header />
      {popup && (
        <DetailsUser
          acompanhante={selectedAcompanhante}
          onClose={() => setPopup(false)}
        />
      )}
      {[false].includes(popup) && (
        <>
          <div className="content">
            <div className="tudo">
              <div className="titulo">
                <h1 className="apresentacao">
                  Acompanhantes de Luxo em destaque
                </h1>
                <div className="escolha">
                  <div className="escolha-sexo">
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
                  <div className="escolha-local">
                    <Select
                      className="local"
                      value={localizacaoSelecionada}
                      onChange={(event) =>
                        setLocalizacaoSelecionada(event.target.value)
                      }
                    >
                      <option className="valores-local" value="Todos">
                        Localização
                      </option>
                      {![0].includes(quantidadeAveiro) && (
                        <option className="valores-local" value="Aveiro">
                          Aveiro ({quantidadeAveiro})
                        </option>
                      )}
                      {![0].includes(quantidadeBraganca) && (
                        <option className="valores-local" value="Bragança">
                          Bragança ({quantidadeBraganca})
                        </option>
                      )}
                      {![0].includes(quantidadeCasteloBranco) && (
                        <option
                          className="valores-local"
                          value="Castelo Branco"
                        >
                          Castelo Branco ({quantidadeCasteloBranco})
                        </option>
                      )}
                      {![0].includes(quantidadeCoimbra) && (
                        <option className="valores-local" value="Coimbra">
                          Coimbra ({quantidadeCoimbra})
                        </option>
                      )}
                      {![0].includes(quantidadeEvora) && (
                        <option className="valores-local" value="Évora">
                          Évora ({quantidadeEvora})
                        </option>
                      )}
                      {![0].includes(quantidadeFaro) && (
                        <option className="valores-local" value="Faro">
                          Faro ({quantidadeFaro})
                        </option>
                      )}
                      {![0].includes(quantidadeGuarda) && (
                        <option className="valores-local" value="Guarda">
                          Guarda ({quantidadeGuarda})
                        </option>
                      )}
                      {![0].includes(quantidadeLisboa) && (
                        <option className="valores-local" value="Lisboa">
                          Lisboa ({quantidadeLisboa})
                        </option>
                      )}
                      {![0].includes(quantidadeLeiria) && (
                        <option className="valores-local" value="Leiria">
                          Leiria ({quantidadeLeiria})
                        </option>
                      )}
                      {![0].includes(quantidadeBraga) && (
                        <option className="valores-local" value="Braga">
                          Braga ({quantidadeBraga})
                        </option>
                      )}
                      {![0].includes(quantidadePorto) && (
                        <option className="valores-local" value="Porto">
                          Porto ({quantidadePorto})
                        </option>
                      )}
                      {![0].includes(quantidadeSantarém) && (
                        <option className="valores-local" value="Santarém">
                          Santarém ({quantidadeSantarém})
                        </option>
                      )}
                    </Select>
                  </div>
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
                      <Flex className="anuncio" key={acompanhante?.id}>
                        <Link
                          onClick={() => {
                            click(acompanhante);
                            window.scrollTo({ top: 0, behavior: "auto" });
                          }}
                          className="anunciante-card"
                          bg={useColorModeValue("gray.200", "gray.800")}
                          maxW="sm"
                          borderWidth="1px"
                          rounded="lg"
                          shadow="lg"
                          position="relative"
                        >
                          {acompanhante?.name && (
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
                            maxWidth={"220px"}
                            maxHeight={"280px"}
                            src={acompanhante?.imagesEscort[0]?.urlPhoto}
                            roundedTop="md"
                          />

                          <Box p="6">
                            <Box display={"flex"} alignItems="baseline">
                              <Badge
                                rounded="full"
                                px="2"
                                fontSize="0.8em"
                                bg="gray.800"
                                color="#fff"
                              >
                                {acompanhante?.city}
                              </Badge>
                            </Box>
                            <Flex
                              mt="1"
                              justifyContent="space-between"
                              alignContent="center"
                            >
                              <Box
                                color={"white"}
                                textTransform={"uppercase"}
                                fontSize="1xl"
                                fontWeight="semibold"
                                as="h5"
                                lineHeight="tight"
                                isTruncated
                              >
                                {acompanhante?.name &&
                                  (acompanhante?.name.length > 15
                                    ? acompanhante?.name.slice(0, 13) + "..."
                                    : acompanhante?.name)}
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
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
