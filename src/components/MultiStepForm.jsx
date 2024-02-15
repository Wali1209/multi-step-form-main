import Steps from "./Steps";
import Description from "./Description";

import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const handleStepIncre = () => {
    if (step == 5) {
      return;
    }
    setStep((num) => num + 1);
  };
  const handleStepDecre = () => {
    if (step == 1) {
      return;
    }
    setStep((num) => num - 1);
  };
  return (
    <main>
      <Steps step={step} />
      <Description
        step={step}
        handleStepIncre={handleStepIncre}
        handleStepDecre={handleStepDecre}
        setStep={setStep}
      />
    </main>
  );
};

export default MultiStepForm;
