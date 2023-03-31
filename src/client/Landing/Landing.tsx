import "./style/landing.css";
import { useDisclosure } from "@chakra-ui/react";
import FirstQuestion from "../../components/Question/QuestionCard";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/loading";

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setShowModal(true);
      onOpen();
    }
  }, [isLoading, onOpen]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="container">
        <FirstQuestion isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
};

export default LandingPage;
