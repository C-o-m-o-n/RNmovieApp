import { createContext, useState } from "react";

const CurrMovie = createContext();
export default function playerContext({ children }) {
  const [CurrentMovie, setCurrentMovie] = useState(null);
  return (
    <CurrMovie.Provider value={{ CurrentMovie, CurrentMovie }}>
      {children}
    </CurrMovie.Provider>
  );
}

export { CurrMovie };
