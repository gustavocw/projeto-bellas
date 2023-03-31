import "./style/landing.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Flex, Grid, Link, useDisclosure } from "@chakra-ui/react";
import FirstQuestion from "../../components/Question/QuestionCard";
import { useEffect } from "react";
import React from "react";

const LandingPage = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    onOpen();
  }, [onOpen]);


  return (
    <div className="container">
      <div className="content">
        <div className="lugares">
        </div>
      </div>
      <FirstQuestion isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default LandingPage;
