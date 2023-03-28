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
  } from '@chakra-ui/react'
import React, { useState } from 'react'
import api from '../../services/api';



export default function LoginDialog() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const handleRegister = () => {
        api
          .post("/client/create", {
            email,
            password
          })
          .then((response) => {
            console.log('response', response)
          });
      };
  
    return (
      <>
        <Button
        size={'sm'}
        style={{ width: '30%', backgroundColor: '#f104f1', margin: '0px 10px' }}
        onClick={onOpen}>
        Cirar conta
        </Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Criar sua conta no Bellas</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                type="email"
                ref={initialRef}
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Senha</FormLabel>
                <Input
                type="password"
                placeholder='Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={handleRegister} colorScheme='pink' mr={3}>
                Cadastrar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }