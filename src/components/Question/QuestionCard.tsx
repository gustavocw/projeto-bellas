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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");

  const handleYesClick = () => {
    setAnswer("sim");
  };
  const h = () => {
    setAnswer("homens");
    navigate("/home/homens");
  };
  const m = () => {
    setAnswer("mulheres");
    navigate("/home/mulheres");
  };
  const t = () => {
    setAnswer("trans");
    navigate("/home/trans");
  };
  const c = () => {
    setAnswer("casais");
    navigate("/home/casais");
  };

  const handleNoClick = () => {
    setAnswer("não");
    navigate("/naopermitido");
  };

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
            <FormControl m={"2"}>
              <FormLabel m={"2"}>Você é maior de 18 ?</FormLabel>
              <Button
                onClick={handleYesClick}
                bg={"pink.500"}
                color={"#fff"}
                mx={"2"}
                isLoading={answer === "sim"}
              >
                SIM
              </Button>
              <Button
                onClick={handleNoClick}
                bg={"pink.500"}
                color={"#fff"}
                mx={"2"}
              >
                NÃO
              </Button>
            </FormControl>
            <FormControl>
              <FormLabel>Oque procura no site ?</FormLabel>
              <Button
                bg={"pink.500"}
                color={"#fff"}
                size={"sm"}
                mx={"2"}
                my={"2"}
                onClick={h}
                isLoading={answer === "homens"}
              >
                HOMENS
              </Button>
              <Button
                bg={"pink.500"}
                color={"#fff"}
                size={"sm"}
                mx={"2"}
                my={"2"}
                onClick={m}
                isLoading={answer === "mulheres"}
              >
                MULHERES
              </Button>
              <Button
                bg={"pink.500"}
                color={"#fff"}
                size={"sm"}
                mx={"2"}
                my={"2"}
                onClick={t}
                isLoading={answer === "trans"}
              >
                TRANS
              </Button>
              <Button
                bg={"pink.500"}
                color={"#fff"}
                size={"sm"}
                mx={"2"}
                my={"2"}
                onClick={c}
                isLoading={answer === "casais"}
              >
                CASAIS
              </Button>
            </FormControl>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FirstQuestion;
