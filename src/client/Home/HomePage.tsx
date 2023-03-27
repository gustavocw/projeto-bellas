import "./style/home.css"
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

const data = {
  isOnline: true,
  imageURL: "http://www.caurn.org.br/wp-content/uploads/2017/03/IMG_7320.jpg",
  endereco: "Av. rua teste - Lisboa",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

const HomePage = () => {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="card-content">
          <div className="titulo">
            <h1 className="apresentacao">
              Acompanhantes de Luxo em destaque
            </h1>
            </div>
            <div className="card">           
            <Flex className="anuncio" w="full">
              <Link
                href="/detalhes"
                className="anunciante"
                bg={useColorModeValue("gray.200", "gray.800")}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
              >
                <Text style={{ margin: "0 0 0 20px" }}>Online</Text>
                {data.isOnline && (
                  <Circle
                    size="10px"
                    position="absolute"
                    top={2}
                    left={2}
                    bg="green.400"
                  />
                )}

                <Image
                  src={data.imageURL}
                  alt={`Picture of ${data.endereco}`}
                  roundedTop="lg"
                />

                <Box p="6">
                  <Box display={"flex"} alignItems="baseline">
                    {data.isOnline && (
                      <Badge
                        rounded="full"
                        px="2"
                        fontSize="0.8em"
                        colorScheme="red"
                      >
                        Renata Souza
                      </Badge>
                    )}
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
                      {data.endereco}
                    </Box>
                    {/* <Tooltip
                    label="Add to cart"
                    bg="white"
                    placement={"top"}
                    color={"gray.800"}
                    fontSize={"1.2em"}
                  >
                    <chakra.a href={"#"} display={"flex"}>
                      <Icon
                        as={FiShoppingCart}
                        h={7}
                        w={7}
                        alignSelf={"center"}
                      />
                    </chakra.a>
                  </Tooltip> */}
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
            <Flex className="anuncio" w="full">
              <Link
                href="/detalhes"
                className="anunciante"
                bg={useColorModeValue("gray.200", "gray.800")}
                maxW="sm"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative"
              >
                <Text style={{ margin: "0 0 0 20px" }}>Online</Text>
                {data.isOnline && (
                  <Circle
                    size="10px"
                    position="absolute"
                    top={2}
                    left={2}
                    bg="green.400"
                  />
                )}

                <Image
                  src={data.imageURL}
                  alt={`Picture of ${data.endereco}`}
                  roundedTop="lg"
                />

                <Box p="6">
                  <Box display={"flex"} alignItems="baseline">
                    {data.isOnline && (
                      <Badge
                        rounded="full"
                        px="2"
                        fontSize="0.8em"
                        colorScheme="red"
                      >
                        Renata Souza
                      </Badge>
                    )}
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
                      {data.endereco}
                    </Box>
                    {/* <Tooltip
                    label="Add to cart"
                    bg="white"
                    placement={"top"}
                    color={"gray.800"}
                    fontSize={"1.2em"}
                  >
                    <chakra.a href={"#"} display={"flex"}>
                      <Icon
                        as={FiShoppingCart}
                        h={7}
                        w={7}
                        alignSelf={"center"}
                      />
                    </chakra.a>
                  </Tooltip> */}
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
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default HomePage;
