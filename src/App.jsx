import MultiStepForm from "./components/MultiStepForm";
import "./App.scss";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function App() {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {isLoading ? (
        <BeatLoader
          color="hsl(354, 84%, 57%)"
          speedMultiplier={0.5}
          size={24}
        />
      ) : (
        <MultiStepForm />
      )}
    </>
  );
}

export default App;
