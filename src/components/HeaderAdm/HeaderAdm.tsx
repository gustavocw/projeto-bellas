import "./headerAdm.css";
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
import LoginDialogUser from "../LoginDialog/LoginUser";
import Cookies from "js-cookie";
import RegistyerDialogUser from "../RegisterDialog/RegisterUser";
import LoginDialogAdm from "../../client/painel/LoginAdm";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove("token");
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
            <Link className="links" href="/">
              Início
            </Link>
            <Link className="links" href="/administracao">
              Autorizar
            </Link>
            <Link className="links" href="/autorizados">
              {" "}
              Autorizados
            </Link>
          </HStack>
        </HStack>
        <Flex
          className="navbar"
          h={16}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          {isLoggedIn ? (
            <Flex>
              <Button
                className="sair"
                size={"sm"}
                fontSize={"14"}
                style={{
                  backgroundColor: "#e048e0",
                  color: "#fff",
                  fontWeight: "normal",
                }}
                onClick={handleLogout}
              >
                Sair
              </Button>
            </Flex>
          ) : (
            <>
              <div className="login-button">
                <LoginDialogAdm
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </div>
              <div className="login-button">
                <RegistyerDialogUser
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </div>
            </>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link href="/">Início</Link>
              <Link href="/administracao">Autorizar</Link>
              <Link href="/autorizados"> Autorizados</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
