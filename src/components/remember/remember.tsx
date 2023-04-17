import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Box,
  Link,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import api from "../../services/api";
import Cookies from "js-cookie";


const LoginDialogAdm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleLogin = () => {
    api
      .post("/adm/login", {
        email,
      })
      .then((response) => {
        const token = response.data.token;
        if (token) {
          Cookies.set("token", token, { expires: 1 });
          onClose();
          handleLoginSuccessToast();
        } else {
          handleLoginFailToast("Você não é ADM.");
        }
      })
      .catch((error) => {
        handleLoginFailToast("Email ou senha incorretos.");
      });
  };

  const handleLoginSuccessToast = () => {
    toast({
      title: "Login realizado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLoginFailToast = (message: string) => {
    toast({
      title: "Falha no login",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Link
          onClick={onOpen}
          textAlign={"center"}
          color={"pink.400"}
        >
          Esqueceu sua senha ?
        </Link>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recupere sua senha</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Digite seu número</FormLabel>
              <Input
                type="text"
                placeholder="Senha"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleLogin} colorScheme="pink" mr={3}>
              Enviar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginDialogAdm;
