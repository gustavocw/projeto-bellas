import "./header.css";
import { ReactNode } from "react";
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
import { HamburgerIcon, CloseIcon, ArrowRightIcon } from "@chakra-ui/icons";

const Links = ["Cidades", "Acompanhantes", "Vídeos"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    className="link-navbar"
    _hover={{
      textDecoration: "none",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Link
              href="/home"
              style={{ color: "white", textDecoration: "none" }}
            >
              LOGO
            </Link>
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
          <Flex alignItems={"center"}>
            <Link
              href="/anunciar"
              size={"sm"}
              mr={4}
              color="#fff"
              className="anunciar"
            >
              Anunciar
            </Link>
            <Button
              variant={"solid"}
              colorScheme={"pink"}
              size={"sm"}
              mr={4}
              leftIcon={<ArrowRightIcon />}
            >
              Minha conta
            </Button>
            <Button
              variant={"solid"}
              colorScheme={"red"}
              size={"sm"}
              mr={4}
              leftIcon={<CloseIcon />}
            >
              Sair
            </Button>
          </Flex>
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
