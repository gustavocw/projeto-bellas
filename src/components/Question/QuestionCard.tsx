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
  import React, { useState } from "react";

  interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialRef?: React.RefObject<HTMLInputElement>;
    finalRef?: React.RefObject<HTMLButtonElement>;
  }
  
  const FirstQuestion: React.FC<Props> = ({
    isOpen,
    onClose,
    initialRef,
    finalRef,
  }) => {
  
  
    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Responda para nós antes</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl m={'2'} >
                <FormLabel m={'2'} >Você é maior de 18 ?</FormLabel>
                <Button bg={'pink.500'} color={'#fff'} mx={'2'} >SIM</Button>
                <Button bg={'pink.500'} color={'#fff'} mx={'2'} >NÃO</Button>
              </FormControl>
              <FormControl>
                <FormLabel>Oque procura no site ?</FormLabel>
                <Button bg={'pink.500'} color={'#fff'} size={'sm'} mx={'2'} >HOMENS</Button>
                <Button bg={'pink.500'} color={'#fff'} size={'sm'} mx={'2'} >MULHERES</Button>
                <Button bg={'pink.500'} color={'#fff'} size={'sm'} mx={'2'} >TRANS</Button>
                <Button bg={'pink.500'} color={'#fff'} size={'sm'} mx={'2'} >CASAIS</Button>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default FirstQuestion;