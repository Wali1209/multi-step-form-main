import React from "react";
import thankYouImg from "../assets/images/icon-thank-you.svg";
const FormSubmittedMsg = () => {
  return (
    <div className="level-5">
      <img src={thankYouImg} alt="thankyouimg" />
      <h1>Thank you!</h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
    </div>
  );
};

export default FormSubmittedMsg;
