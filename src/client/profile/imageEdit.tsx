import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import "./style/imageEdit.css";
import api from "../../services/api";

const EditImage: React.FC = () => {
  const [user, setUser] = useState<User>({
    imagesEscort: [
      {
        id: "",
        urlPhoto: "",
        escortId: "",
      },
    ],
  });

  interface EscortImages {
    id: string;
    urlPhoto: string;
    escortId: string;
  }

  interface User {
    imagesEscort: EscortImages[];
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      api
        .get("/escort/list", config)
        .then((response) => {
          const userData = response.data;
          console.log(userData);
          setUser(userData);
        })
        .catch((error) => console.error(error));
    } else {
      console.log("Token not found!");
    }
  }, []);

  const [images, setImages] = useState<File[]>([]);


  const handleImageEdit = async (index: number) => {
    const selectedImage = images[index];
    const newImage = await selectImageFromDevice();
    if (newImage) {
      images[index] = newImage;
      setImages([...images]);
      setUser((prevState) => {
        const updatedImages = [...prevState.imagesEscort];
        updatedImages[index].urlPhoto = URL.createObjectURL(newImage);
        return { ...prevState, imagesEscort: updatedImages };
      });
    }
  };
  
  const selectImageFromDevice = (): Promise<File | null> => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event: Event) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
          resolve(files[0]);
        } else {
          resolve(null);
        }
      };
      input.click();
    });
  };
  

  return (
    <div className="images-render">
      {user.imagesEscort.map((imagem, index) => (
        <img
          key={index}
          className="imagens-profile"
          style={{
            flexWrap: "wrap",
            width: "220px",
            height: "250px",
            margin: "1px",
          }}
          src={imagem.urlPhoto}
          alt={`Imagem ${index + 1}`}
          onClick={() => handleImageEdit(index)}
        />
      ))}
    </div>
  );
};

export default EditImage;
