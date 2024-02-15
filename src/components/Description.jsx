import React, { useState, useEffect } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

import arcadeImg from "../assets/images/icon-arcade.svg";
import advanceImg from "../assets/images/icon-advanced.svg";
import proImg from "../assets/images/icon-pro.svg";

import FormSubmittedMsg from "./FormSubmittedMsg";

// react animation on scroll
import AOS from "aos";
import "../../node_modules/aos/dist/aos.css";

const Description = ({ step, handleStepIncre, handleStepDecre, setStep }) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const formInfo = {
    plan: {
      // arcade plan
      arcade: {
        title: "Arcade",
        monthly: {
          price: "9",
        },
        yearly: {
          price: "90",
        },
      },
      // advance plan
      advance: {
        title: "Advance",
        monthly: {
          price: "12",
        },
        yearly: {
          price: "120",
        },
      },
      //pro plan
      pro: {
        title: "Pro",
        monthly: {
          price: "12",
        },
        yearly: {
          price: "120",
        },
      },
    },
    addOns: {
      first: {
        title: "Online service",
        benefit: "Access to multiplayer games",
        priceMonthly: "1",
        priceYearly: "10",
      },
      second: {
        title: "Larger storage",
        benefit: "Extra 1TB of cloud save",
        priceMonthly: "2",
        priceYearly: "20",
      },
      third: {
        title: "Customizable Profile",
        benefit: "Custom theme on your profile",
        priceMonthly: "2",
        priceYearly: "20",
      },
    },
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedPlan: "arcade", /// by default
    subscriptionPlanMonthly: true, // by default
    selectedAddOns: {
      onlineService: false, //byDefault
      largeStorage: false, // byDefaul
      customizableProfile: false, // byDefault
    },
  }); //complete filled data of the form

  // setting the error state
  const [errors, setErrors] = useState({});

  // whether the card is clicked or not
  const [isCardClicked, setCardCardClicked] = useState(false);
  //   tracking the selected plan
  const [isPlanMonthly, setPlanMonthly] = useState(true); // by default

  // handling form change
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type == "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedAddOns: {
          ...prevFormData.selectedAddOns,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // form validation for step 1
  const handleFormValidation = (e) => {
    e.preventDefault();

    const newError = {};
    // iff the field is empty
    if (!formData.name.trim()) {
      newError.name = "This Field is required";
    }
    // if the email field is empty/invalid
    if (!formData.email.trim()) {
      newError.email = "This Field is required";
    } else if (!isValidEmail(formData.email)) {
      newError.email = "Email is not valid";
    }
    // if the phone field is empty/invalid
    if (!formData.phone.trim()) {
      newError.phone = "This Field is required";
    } else if (!isValidPhone(formData.phone)) {
      newError.phone = "Phone number is not valid";
    }

    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }

    // iff there is no error
    setErrors({});
    handleStepIncre();
  };

  const isValidEmail = (email) => {
    let isEmailValid = false;
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isEmailValid = regEmail.test(email);
    return isEmailValid;
  };
  const isValidPhone = (phone) => {
    let isPhoneValid = false;
    const regPhone = /^\+?\d{1,4}?\s?\d{1,10}$/;
    isPhoneValid = regPhone.test(phone);
    return isPhoneValid;
  };

  //   when user click on given plan
  const handleCardClick = (planName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedPlan: planName,
    }));
  };

  //   subscription toggle between monthly and yearly
  const handleSubscriptionClick = () => {
    setPlanMonthly(!isPlanMonthly);
    updateSubscriptionDuration();
  };
  // updating the subscript plan in separate function
  const updateSubscriptionDuration = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subscriptionPlanMonthly: isPlanMonthly,
    }));
  };
  const handleTotalPrice = () => {
    let totalPrice = 0;
    if (isPlanMonthly) {
      if (formData.selectedPlan == "arcade") {
        totalPrice += parseInt(formInfo.plan.arcade.monthly.price);
      }
      if (formData.selectedPlan == "advance") {
        totalPrice += parseInt(formInfo.plan.advance.monthly.price);
      }
      if (formData.selectedPlan == "pro") {
        totalPrice += parseInt(formInfo.plan.pro.monthly.price);
      }

      // adds-ons
      if (formData.selectedAddOns.onlineService) {
        totalPrice += parseInt(formInfo.addOns.first.priceMonthly);
      }
      if (formData.selectedAddOns.largeStorage) {
        totalPrice += parseInt(formInfo.addOns.second.priceMonthly);
      }
      if (formData.selectedAddOns.customizableProfile) {
        totalPrice += parseInt(formInfo.addOns.third.priceMonthly);
      }
    } else {
      if (formData.selectedPlan == "arcade") {
        totalPrice += parseInt(formInfo.plan.arcade.yearly.price);
      }
      if (formData.selectedPlan == "advance") {
        totalPrice += parseInt(formInfo.plan.advance.yearly.price);
      }
      if (formData.selectedPlan == "pro") {
        totalPrice += parseInt(formInfo.plan.pro.yearly.price);
      }

      // adds-ons
      if (formData.selectedAddOns.onlineService) {
        totalPrice += parseInt(formInfo.addOns.first.priceYearly);
      }
      if (formData.selectedAddOns.largeStorage) {
        totalPrice += parseInt(formInfo.addOns.second.priceYearly);
      }
      if (formData.selectedAddOns.customizableProfile) {
        totalPrice += parseInt(formInfo.addOns.third.priceYearly);
      }
    }
    return totalPrice;
  };
  const generateSelectedPlanPrice = () => {
    if (formData.selectedPlan == "arcade") {
      if (isPlanMonthly) {
        return "$9/mo";
      } else {
        return "$90/yr";
      }
    } else {
      if (isPlanMonthly) {
        return "$12/mo";
      } else {
        return "$120/yr";
      }
    }
  };
  return (
    <div id="description">
      {/* level 1 */}
      {step == 1 && (
        <div className="level-1 " data-aos="fade-up">
          <h1>Personal info</h1>
          <p>Please provide your name, email address, and phone number.</p>
          <form action="#">
            <div className="name-field">
              <label htmlFor="userName">Name</label>
              {errors.name && <span className="formError">{errors.name}</span>}
              <input
                type="text"
                name="name"
                id="userName"
                placeholder="e.g. Stephen King"
                onChange={handleFormChange}
                value={formData.name}
              />
            </div>

            <div className="email-field">
              <label htmlFor="userEmail">Email Address</label>
              {errors.email && (
                <span className="formError">{errors.email}</span>
              )}
              <input
                type="email"
                name="email"
                id="userEmail"
                placeholder="e.g. stephenking@lorem.com"
                onChange={handleFormChange}
                value={formData.email}
              />
            </div>

            <div className="phone-field">
              <label htmlFor="userPhone">Phone Number</label>
              {errors.phone && (
                <span className="formError">{errors.phone}</span>
              )}
              <input
                type="tel"
                name="phone"
                id="userPhone"
                placeholder="e.g. +1 234 567 890"
                onChange={handleFormChange}
                value={formData.phone}
              />
            </div>
          </form>
          <div className="navigation-buttons">
            <button
              type="button"
              className="forward"
              onClick={handleFormValidation}
            >
              next step
            </button>
          </div>
        </div>
      )}

      {/* level2 */}

      {step == 2 && (
        <div className="level-2" data-aos="fade-up">
          <h1>Select your plan</h1>
          <p>You have the option of monthly or yearly billing.</p>
          {/* Subscription plan card */}

          <div className="plan-cards">
            {/* arcade plan */}
            <div
              className={
                formData.selectedPlan == "arcade"
                  ? "card-arcade card-list card-focus"
                  : "card-arcade card-list"
              }
              onClick={() => {
                handleCardClick("arcade");
              }}
            >
              <img src={arcadeImg} alt="ArcadeImg" />
              {/* if the selected plan is monthly */}
              {isPlanMonthly && (
                <div className="card-description">
                  <h1>{formInfo.plan.arcade.title}</h1>
                  <span>${formInfo.plan.arcade.monthly.price}/mo</span>
                </div>
              )}

              {/* if the selected plan is yearly */}
              {!isPlanMonthly && (
                <div className="card-description">
                  <h1>{formInfo.plan.arcade.title}</h1>
                  <span>${formInfo.plan.arcade.yearly.price}/yr</span>
                  <p>2 months free</p>
                </div>
              )}
            </div>

            {/* advance plan */}
            <div
              className={
                formData.selectedPlan == "advance"
                  ? "card-advance card-list card-focus"
                  : "card-advance card-list"
              }
              onClick={() => {
                handleCardClick("advance");
              }}
            >
              <img src={advanceImg} alt="advanceImg" />
              {/* if the selected plan is monthly */}
              {isPlanMonthly && (
                <div className="card-description">
                  <h1>{formInfo.plan.advance.title}</h1>
                  <span>${formInfo.plan.advance.monthly.price}/mo</span>
                </div>
              )}

              {/* if the selected plan is yearly */}
              {!isPlanMonthly && (
                <div className="card-description">
                  <h1>{formInfo.plan.advance.title}</h1>
                  <span>${formInfo.plan.advance.yearly.price}/yr</span>
                  <p>2 months free</p>
                </div>
              )}
            </div>

            {/* pro plan */}
            <div
              className={
                formData.selectedPlan == "pro"
                  ? "card-pro card-list card-focus"
                  : "card-pro card-list"
              }
              onClick={() => {
                handleCardClick("pro");
              }}
            >
              <img src={proImg} alt="ProImg" />
              {/* if the selected plan is monthly */}
              {isPlanMonthly && (
                <div className="card-description">
                  <h1>{formInfo.plan.pro.title}</h1>
                  <span>${formInfo.plan.pro.monthly.price}/mo</span>
                </div>
              )}

              {/* if the selected plan is yearly */}
              {!isPlanMonthly && (
                <div className="card-description">
                  <h1>{formInfo.plan.pro.title}</h1>
                  <span>${formInfo.plan.pro.yearly.price}/yr</span>
                  <p>2 months free</p>
                </div>
              )}
            </div>
          </div>
          {/* setting the subscription duraton button */}
          <div className="subscription-duration">
            <span className={isPlanMonthly ? "selected-duration" : " "}>
              monthly
            </span>
            <button type="button" onClick={handleSubscriptionClick}>
              {isPlanMonthly ? <MdToggleOff size={42} /> : <MdToggleOn />}
            </button>
            <span className={!isPlanMonthly ? "selected-duration" : " "}>
              yearly
            </span>
          </div>

          <div className="navigation-buttons">
            <button
              type="button"
              className="backward"
              onClick={handleStepDecre}
            >
              go back
            </button>
            <button type="button" className="forward" onClick={handleStepIncre}>
              next step
            </button>
          </div>
        </div>
      )}

      {/* level3 */}
      {step == 3 && (
        <div className="level-3" data-aos="fade-up">
          <h1>Pick add-ons</h1>
          <p>Add-ons help enhance your gaming experience.</p>

          {/* list of add-ons */}
          <div className="add-ons">
            {/* first feature */}
            <div
              className={
                formData.selectedAddOns.onlineService
                  ? "add-on add-on-1 selected-add-on"
                  : "add-on add-on-1"
              }
            >
              <input
                type="checkbox"
                name="onlineService"
                id="addOn1"
                checked={formData.selectedAddOns.onlineService}
                onChange={handleFormChange}
              />
              <div className="add-on-text">
                <h1>{formInfo.addOns.first.title}</h1>
                <p>{formInfo.addOns.first.benefit}</p>
              </div>
              <span className="price">
                {isPlanMonthly
                  ? `+$${formInfo.addOns.first.priceMonthly}/mo`
                  : `+$${formInfo.addOns.first.priceYearly}/yr`}
              </span>
            </div>

            {/* second feature */}
            <div
              className={
                formData.selectedAddOns.largeStorage
                  ? "add-on add-on-2 selected-add-on"
                  : "add-on add-on-2"
              }
            >
              <input
                type="checkbox"
                name="largeStorage"
                id="addOn2"
                checked={formData.selectedAddOns.largeStorage}
                onChange={handleFormChange}
              />
              <div className="add-on-text">
                <h1>{formInfo.addOns.second.title}</h1>
                <p>{formInfo.addOns.second.benefit}</p>
              </div>
              <span className="price">
                {isPlanMonthly
                  ? `+$${formInfo.addOns.second.priceMonthly}/mo`
                  : `+$${formInfo.addOns.second.priceYearly}/yr`}
              </span>
            </div>

            {/* thirdfeature */}
            <div
              className={
                formData.selectedAddOns.customizableProfile
                  ? "add-on add-on-3 selected-add-on"
                  : "add-on add-on-3"
              }
            >
              <input
                type="checkbox"
                name="customizableProfile"
                id="addOn3"
                checked={formData.selectedAddOns.customizableProfile}
                onChange={handleFormChange}
              />
              <div className="add-on-text">
                <h1>{formInfo.addOns.third.title}</h1>
                <p>{formInfo.addOns.third.benefit}</p>
              </div>
              <span className="price">
                {isPlanMonthly
                  ? `+$${formInfo.addOns.third.priceMonthly}/mo`
                  : `+$${formInfo.addOns.third.priceYearly}/yr`}
              </span>
            </div>
          </div>
          <div className="navigation-buttons">
            <button
              type="button"
              className="backward"
              onClick={handleStepDecre}
            >
              go back
            </button>
            <button type="button" className="forward" onClick={handleStepIncre}>
              next step
            </button>
          </div>
        </div>
      )}

      {/* level 4 */}
      {step == 4 && (
        <div className="level-4" data-aos="fade-up">
          <h1>Finishing up</h1>
          <p>Double-check everything looks OK before confirming.</p>
          {/* selected subscript shows here */}
          <div className="selected-subscription">
            <div className="user-selected-list">
              <div className="selected-plan">
                <h1>
                  {formData.selectedPlan} (
                  {isPlanMonthly ? "Monthly" : "Yearly"})
                </h1>
                <div className="selected-plan-text">
                  <span
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    Change
                  </span>
                  <p className="plan-price">{generateSelectedPlanPrice()}</p>
                </div>
              </div>
              <div className="selected-add-ons">
                {formData.selectedAddOns.onlineService && (
                  <div className="selected-add-on-list">
                    <span>{formInfo.addOns.first.title}</span>
                    <p>
                      {isPlanMonthly
                        ? `+$${formInfo.addOns.first.priceMonthly}/mo`
                        : `+$${formInfo.addOns.first.priceYearly}/yr`}
                    </p>
                  </div>
                )}
                {/* if 2nd add ons is selected */}
                {formData.selectedAddOns.largeStorage && (
                  <div className="selected-add-on-list">
                    <span>{formInfo.addOns.second.title}</span>
                    <p>
                      {isPlanMonthly
                        ? `+$${formInfo.addOns.second.priceMonthly}/mo`
                        : `+$${formInfo.addOns.second.priceYearly}/yr`}
                    </p>
                  </div>
                )}

                {/* if 3rd add ons is selected */}
                {formData.selectedAddOns.customizableProfile && (
                  <div className="selected-add-on-list">
                    <span>{formInfo.addOns.third.title}</span>
                    <p>
                      {isPlanMonthly
                        ? `+$${formInfo.addOns.third.priceMonthly}/mo`
                        : `+$${formInfo.addOns.third.priceYearly}/yr`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="totalPrice">
              <span className="total-price-title">
                Total {isPlanMonthly ? "(per month)" : "(per year)"}
              </span>
              <b>
                +${handleTotalPrice()}
                {isPlanMonthly ? "/mo" : "/yr"}
              </b>
            </div>
          </div>
          <div className="navigation-buttons">
            <button
              type="button"
              className="backward"
              onClick={handleStepDecre}
            >
              go back
            </button>
            <button type="button" className="forward" onClick={handleStepIncre}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {step == 5 && <FormSubmittedMsg />}
    </div>
  );
};

export default Description;
