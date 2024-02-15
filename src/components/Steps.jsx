import React from "react";

const Steps = ({ step }) => {
  return (
    <div id="steps">
      {/* step 1 */}
      <div
        className={
          step == 1 ? "step1 step-list highlighted-step" : "step-list step1"
        }
      >
        <span>1</span>
        <div className="step-description">
          <span>step 1</span>
          <p>Your info</p>
        </div>
      </div>

      {/* step 2 */}
      <div
        className={
          step == 2 ? "step2 step-list highlighted-step" : "step-list step2"
        }
      >
        <span>2</span>
        <div className="step-description">
          <span>step 2</span>
          <p>select plan</p>
        </div>
      </div>

      {/* step 3 */}
      <div
        className={
          step == 3 ? "step3 step-list highlighted-step" : "step-list step3"
        }
      >
        <span>3</span>
        <div className="step-description">
          <span>step 3</span>
          <p>add-ons</p>
        </div>
      </div>

      {/* step 4 */}
      <div
        className={
          step == 4 || step == 5
            ? "step4 step-list highlighted-step"
            : "step-list step4"
        }
      >
        <span>4</span>
        <div className="step-description">
          <span>step 4</span>
          <p>summary</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
