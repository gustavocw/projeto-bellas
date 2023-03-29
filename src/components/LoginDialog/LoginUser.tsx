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
  } from "@chakra-ui/react";
  import { Dispatch, SetStateAction } from 'react'
  import React, { useState } from "react";
  import api from "../../services/api";

  interface Props {
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
  }
  
  const LoginDialogUser: React.FC<Props> = ({ isLoggedIn, setIsLoggedIn }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
  
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
  
    const handleLogin = () => {
      api
        .post("/escort/create", {
          email,
          password,
        })
        .then((response) => {
          setIsLoggedIn(true);
          console.log("response", response);
        })
        .catch((error) => {
          toast({
            title: "Falha no registro",
            description: "Digite um email e senha válidos.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    };
  
    const handleLoginSuccessToast = () => {
      toast({
        title: "Registrado(a) com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };
  
    React.useEffect(() => {
      if (isLoggedIn) {
        handleLoginSuccessToast();
        onClose();
      }
    }, [isLoggedIn, onClose]);
  
    return (
      <>
        {!isLoggedIn && (
          <Button
            size={"md"}
            px={'6'}
            fontSize={'12'}
            style={{
              width: "100%",
              backgroundColor: "#e048e0",
              color: '#fff'
            }}
            onClick={onOpen}
          >
            Antes de anunciar, registre-se no site!
          </Button>
        )}
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Entre na sua conta</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  ref={initialRef}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={handleLogin} colorScheme="pink" mr={3}>
                Registrar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default LoginDialogUser;