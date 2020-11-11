import { useState, useEffect } from "react";
import * as yup from "yup";

import Input from "./components/Input";

import "./App.css";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.string().required(),
});

const initState = {
  firstName: "",
  lastName: "",
  birthDate: "",
};

function App() {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState(initState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { firstName, lastName, birthDate } = state;

  useEffect(() => {
    let mount = true;
    if (isSubmitted) {
      console.log("object");
      schema
        .validate(state, { abortEarly: false })
        .then(() => {
          if (mount) {
            setErrors({ firstName: "", lastName: "", birthDate: "" });
          }
        })
        .catch((err) => {
          const newErrors = {};

          err.inner.forEach(({ path, message }) => {
            newErrors[path] = message;
          });

          if (mount) {
            setErrors({ ...initState, ...newErrors });
          }
        });
    }
    return () => {
      mount = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, firstName, lastName, birthDate]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setState({ ...state, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    console.log("submit the form ");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} action="#" className="form">
        <Input
          id="firstName"
          handleChange={handleChange}
          type="text"
          value={firstName}
          error={errors.firstName}
          TexLabel="firstName"
        />
        <Input
          id="lastName"
          handleChange={handleChange}
          type="text"
          value={lastName}
          error={errors.lastName}
          TexLabel="lastName"
        />
        <Input
          id="birthDate"
          handleChange={handleChange}
          type="date"
          value={birthDate}
          error={errors.birthDate}
          TexLabel="birthDate"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
