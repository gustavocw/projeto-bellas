import { useState } from "react";
import { Acompanhante, AcompanhanteContext } from "./escortContext";

interface AcompanhanteProviderProps {
  children: React.ReactNode;
}

export function AcompanhanteProvider({ children }: AcompanhanteProviderProps) {
  const [acompanhanteSelecionada, setAcompanhanteSelecionada] = useState<Acompanhante | null>(
    null
  );

  return (
    <AcompanhanteContext.Provider
      value={{
        acompanhanteSelecionada,
        setAcompanhanteSelecionada,
      }}
    >
      {children}
    </AcompanhanteContext.Provider>
  );
}
