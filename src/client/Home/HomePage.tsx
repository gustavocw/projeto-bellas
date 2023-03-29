import "./style/home.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const data = {
  isOnline: true,
  imageURL: "http://www.caurn.org.br/wp-content/uploads/2017/03/IMG_7320.jpg",
  idade: "19 anos",
};

interface Accompanhante {
  id: number;
  isOnline: boolean;
  imageURL: string;
  idade: string;
  nome: string;
}

const HomePage = () => {
  const navigate = useNavigate()
  const [acompanhantes, setAcompanhantes] = useState<Accompanhante[]>([]);

  useEffect(() => {
    async function fetchAcompanhantes() {
      try {
        const response = await api.get("/escort/acompanhante");
        setAcompanhantes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAcompanhantes();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="card-content">
          <div className="titulo">
            <h1 className="apresentacao">Acompanhantes de Luxo em destaque</h1>
          </div>
          <div className="card">
            {acompanhantes.map((acompanhante) => (
              <Flex key={acompanhante.id} className="anuncio" w="full">
                <Link
                  onClick={() => navigate(`/detalhes/${acompanhante.id}`)}
                  href="/detalhes"
                  className="anunciante"
                  bg={useColorModeValue("gray.200", "gray.800")}
                  maxW="sm"
                  borderWidth="1px"
                  rounded="lg"
                  shadow="lg"
                  position="relative"
                >
                  {data.isOnline && (
                    <>
                      <Text style={{ margin: "0 0 0 20px" }}>Online</Text>
                      <Circle
                        size="10px"
                        position="absolute"
                        top={2}
                        left={2}
                        bg="green.400"
                      />
                    </>
                  )}
                  <Image
                    src={acompanhante.imageURL}
                    alt={"acompanhante"}
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
                          {acompanhante.nome}
                        </Badge>
                    </Box>
                    <Flex
                      mt="1"
                      justifyContent="space-between"
                      alignContent="center"
                    >
                      <Box
                        fontSize="2xl"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {data.idade}
                      </Box>
                    </Flex>
                    <Flex justifyContent="space-between" alignContent="center">
                      <Box
                        fontSize="2xl"
                        color={useColorModeValue("gray.800", "white")}
                      ></Box>
                    </Flex>
                  </Box>
                </Link>
              </Flex>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
