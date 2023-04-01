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
} from "@chakra-ui/react";

interface Accompanhante {
  id: number;
  isOnline: boolean;
  city: string;
  name: string;
  imagesEscort: {
    id: string;
    urlPhoto: string;
    escortId: string;
  }[];
}

const HomePage = () => {
  const [acompanhantes, setAcompanhantes] = useState<Accompanhante[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/");
      setAcompanhantes(response.data);
    }
    fetchData();
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
              <Flex className="anuncio" w="full" key={acompanhante.id}>
                <Link
                  className="anunciante"
                  bg={useColorModeValue("gray.200", "gray.800")}
                  maxW="sm"
                  borderWidth="1px"
                  rounded="lg"
                  shadow="lg"
                  position="relative"
                >
                  {acompanhante.isOnline && (
                    <Circle
                      size="10px"
                      position="absolute"
                      top={2}
                      left={2}
                      bg="green.400"
                    />
                  )}
                  <Image
                    width="60"
                    alt={acompanhante.name}
                    src={acompanhante.imagesEscort[0].urlPhoto}
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
                        fontSize="2xl"
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
