import { useState } from "react";
import DynamicButton from "../../components/DynamicButton";
import DynamicInput from "../../components/DynamicInput";
import Stepper from "../../components/Stepper";
import { ButtonProps } from "../../enum/ButtonProps";
import { FormInputProps } from "../../interfaces/FormInputProps";
import { useLocation, useNavigate } from "react-router-dom";
import { InputIds } from "../../enum/InputIds";
import { useFormData } from "../../hooks/useFormData";

export default function Etapa3() {
  const { formData, setFormData } = useFormData();
  const [localInputValues, setLocalInputValues] = useState<{
    [key: string]: string;
  }>({});
  const [hasAlertMessage, setHasAlertMessage] = useState<{
    [key: string]: string;
  }>({});

  const navigate = useNavigate();

  const verifyAccountType = () => { 
    if (!formData.accountType) {
      navigate('/registration');
    } 
    return;
  }

  verifyAccountType();

  const location = useLocation();

  const etapa4Url = location.pathname.includes("pf")
    ? "etapa4-pf"
    : "etapa4-pj";

  const titleLabel = "Senha de acesso";

  const formInputProps: FormInputProps = {
    idInput: InputIds.password,
    labelInput: "Sua senha",
    inputType: "password",
    maxLenghtProp: 50,
  };
  const setDynamicAlertMessage = (id: string, message: string) => {
    setHasAlertMessage((prevMessages) => ({
      ...prevMessages,
      [id]: message,
    }));
  };

  const handleInputChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setLocalInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const disableButton = !Object.values(hasAlertMessage).some(
    (message) => message !== ""
  );

  return (
    <div>
      <Stepper activeStep="3" maxStep="4" labelStep={titleLabel} />
      <DynamicInput
        idInput={formInputProps.idInput}
        labelInput={formInputProps.labelInput}
        inputType={formInputProps.inputType}
        setDynamicAlertMessage={setDynamicAlertMessage}
        maxLenghtProp={formInputProps.maxLenghtProp}
        inputValue={localInputValues[formInputProps.idInput] || ""}
        onChangeInputValue={(e) => handleInputChange(formInputProps.idInput, e)}
      />

      <DynamicButton label="Voltar" buttonWidth={ButtonProps.voltarButton} />
      <DynamicButton
        label="Continuar"
        to={etapa4Url}
        buttonWidth={ButtonProps.continuarButton}
        disableButton={disableButton}
      />
    </div>
  );
}
