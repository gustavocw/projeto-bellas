import { createContext } from "react";

export interface Acompanhante {
  id: string;
  name: string;
  description: string;
}

export interface AcompanhanteContextType {
  acompanhanteSelecionada: Acompanhante | null;
  setAcompanhanteSelecionada: (acompanhante: Acompanhante) => void;
}

export const AcompanhanteContext = createContext<AcompanhanteContextType>({
  acompanhanteSelecionada: null,
  setAcompanhanteSelecionada: () => {},
});
