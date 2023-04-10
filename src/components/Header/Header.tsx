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
import LoginDialogUser from "../LoginDialog/LoginUser";

const Links = ["Início"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    className="link-navbar"
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <>
      <Box bg={useColorModeValue("blackAlpha.900", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
              <Link
                onClick={onOpen}
                href="/anunciar"
                size={"sm"}
                mx={2}
                color="#fff"
                className="anunciar"
              >
                Anunciar
              </Link>
          {isLoggedIn ? (
            <Flex alignItems={"center"}>
              <Link
                onClick={onOpen}
                href="/profile"
                size={"sm"}
                mx={2}
                color="#fff"
                className="anunciar"
              >
                Minha conta
              </Link>
            </Flex>
          ) : (
            <div className="login-button">
              <LoginDialogUser
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
            </div>
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
