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
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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
  const [sex, setSex] = useState("");


  const handleYesClick = () => {
    setAnswer("sim");
  };

  const handleNoClick = () => {
    setAnswer("nao");
    navigate("/naopermitido");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    try {
      const response = await api.post("/escort/sex", {
        sex,
      });
      console.log(response.data); // log the response data
    } catch (error) {
      console.error(error);
    }
  
    onClose(); // Feche o modal após o envio
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
        <ModalContent margin={'auto'} textAlign={'center'} >
          <ModalHeader>Responda para nós antes</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
            <FormControl m={"2"}>
              <FormLabel textAlign={'center'} m={"2"}>Você é maior de 18 ?</FormLabel>
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
            {['sim'].includes(answer) && (
            <FormControl>
              <FormLabel textAlign={'center'} >Selecione o distrito</FormLabel>
                <Select
                placeholder="Distrito"
                >
                  <option value="Aveiro">Aveiro</option>
                  <option value="Bragança">Bragança</option>
                  <option value="Castelo Branco">Castelo Branco</option>
                  <option value="Coimbra">Coimbra</option>
                  <option value="Évora">Évora</option>
                  <option value="Faro">Faro</option>
                  <option value="Guarda">Guarda</option>
                  <option value="Leiria">Leiria</option>
                  <option value="Braga">Braga</option>
                  <option value="Portalegre">Portalegre</option>
                  <option value="Porto">Porto</option>
                  <option value="Santarém">Santarém</option>
                  <option value="Setúbal">Setúbal</option>
                  <option value="Viana do Castelo">Viana do Castelo</option>
                  <option value="Vila Real">Vila Real</option>
                  <option value="Viseu">Viseu</option>
                </Select>
            </FormControl>
            )}
            {['sim'].includes(answer) && (
            <FormControl>
              <FormLabel mt={4} textAlign={'center'} >Selecione o que procura</FormLabel>
                <Select
                value={sex}
                placeholder="Oque procura ?"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSex(e.target.value)}
                >
                  <option value="Mulheres">Mulheres</option>
                  <option value="Homens">Homens</option>
                  <option value="Trans">Trans</option>
                  <option value="Casais">Casais</option>
                </Select>
            </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            {![''].includes(sex) && (
            <Button style={{ margin: 'auto' }} onClick={handleSubmit} colorScheme="pink" mr={3}>
              Confirmar
            </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FirstQuestion;
