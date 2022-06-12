import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer, ButtonsContainer } from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [signInFields, setSignInFields] = useState(defaultFormFields);
  const { email, password } = signInFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setSignInFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password": 
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("incorrect account/password");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInFields({ ...signInFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <form onSubmit={handleSubmit}>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <FormInput
          label="email"
          type="text"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
