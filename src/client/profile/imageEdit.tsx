import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Flex, useToast } from "@chakra-ui/react";
import "./style/imageEdit.css";
import api from "../../services/api";

interface EscortImage {
  id: string;
  filename: string;
  urlPhoto: string;
  escortId: string;
}

interface User {
  imagesEscort: EscortImage[];
}

const EditImage: React.FC = () => {
  const [user, setUser] = useState<User>({
    imagesEscort: [
      {
        id: "",
        filename: "",
        urlPhoto: "",
        escortId: "",
      },
    ],
  });

  const [selectedImage, setSelectedImage] = useState<File>();

  const toast = useToast();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      api
        .get("/escort/list", config)
        .then((response) => {
          const userData = response.data;
          const imagesWithIds = userData.imagesEscort.map((image: any) => {
            return {
              ...image,
              id: image.id,
              filename: image.filename,
            };
          });
          setUser({ imagesEscort: imagesWithIds });
        })
        .catch((error) => console.error(error));
    } else {
      console.log("Token not found!");
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setSelectedImage(selectedFile);
  };

  const handleImageSubmit = (oldImageId: string, oldImageFilename: string) => {
    const token = Cookies.get("token");
    if (!token) {
      console.log("Token not found!");
      return;
    }

    const formData = new FormData();
    if (selectedImage) {
      formData.append("file", selectedImage);
    }
    formData.append("filename", oldImageFilename);
    formData.append("imageId", oldImageId);

    console.log("Campos enviados para a API:");
    console.log("imageId:", oldImageId);
    console.log("filename:", oldImageFilename);
    console.log("file:", selectedImage);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    api
      .post("/update/images", formData, config)
      .then(() => {
        toast({
          title: "Imagem alterada com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao alterar imagem",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex className="images-render">
      {user.imagesEscort.map((image) => (
        <div key={image.id} className="image-container">
          <img
            className="image-profile"
            src={image.urlPhoto}
            alt="Foto da acompanhante"
          />
          <label className="btn-change">
            Nova Imagem
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          <Button
            bg="#eb72ef"
            color="#fff"
            _hover={{ color: '#eb72ef', backgroundColor: '#fff' }}
            className="btn-save"
            onClick={() => handleImageSubmit(image.id, image.filename)}
          >
            Confirmar
          </Button>
        </div>
      ))}
    </Flex>
  );
};

export default EditImage;
