import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

export interface Escort {
  id: number;
  isOnline: boolean;
  city: string;
  sexo: string;
  name: string;
  imagesEscort: {
    id: string;
    urlPhoto: string;
    escortId: string;
  }[];
  dataEscort: {
    price: string;
    description: string;
    contact: string;
    type: string;
    eyes: string;
    tatoo: number;
    piercing: number;
    weight: string;
    height: string;
    languages: string;
    location: string;
    isSexAnal: boolean;
    nationality: string;
    obsScheduling: string;
    age: number;
  };
}

export default function Teste() {
  const { id } = useParams();
  const [acompanhantes, setAcompanhantes] = useState<Escort[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    api
      .get(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAcompanhantes(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      {acompanhantes.map((acompanhante) => (
        <div key={acompanhante.id}>
          <h1>{acompanhante.name}</h1>
          <p>{acompanhante.dataEscort.description}</p>
          {/* outras informações do acompanhante */}
        </div>
      ))}
    </div>
  );
}
