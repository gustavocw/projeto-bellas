import "./header.css";
import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";

const Links = ["Início"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    className="link-navbar"
    borderRadius={"20px"}
    _hover={{
      textDecoration: "none",
    }}
    href={"/"}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLogged = Cookies.get("token") != null;

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Box
        className="display"
        justifyContent={"space-between"}
        bg={useColorModeValue("blackAlpha.900", "gray.900")}
        px={4}
      >
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex
          className="navbar"
          h={16}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <IconButton
            bg="#000"
            color="#fff"
            size={"md"}
            icon={isOpen ? <CloseIcon className="close" /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            variant="unstyled"
            onClick={isOpen ? onClose : onOpen}
          />
          {isLogged ? (
            <Flex>
              <Link
                mx="2"
                onClick={onOpen}
                href="/anunciar"
                size={"sm"}
                color="#fff"
                className="anunciar"
              >
                Anunciar
              </Link>
              <Link
                fontSize={"14"}
                onClick={onOpen}
                href="/profile"
                size={"sm"}
                mx={2}
                color="#fff"
                className="anunciar"
              >
                Minha conta
              </Link>
              <Button
                className="sair"
                size={"sm"}
                fontSize={"14"}
                style={{
                  backgroundColor: "#e048e0",
                  color: "#fff",
                  fontWeight: "normal",
                  borderRadius: "20px",
                }}
                onClick={handleLogout}
              >
                Sair
              </Button>
            </Flex>
          ) : (
            <>
              <div className="login-button">
                <Link color={"#fff"} className="anunciar" href="/login">
                  Entrar
                </Link>
              </div>
            </>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
