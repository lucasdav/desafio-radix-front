import { useState } from "react";
import DynamicButton from "../../components/DynamicButton";
import DynamicInput from "../../components/DynamicInput";
import Stepper from "../../components/Stepper";
import RadioButton from "../../components/RadioButton";
import { FormInputProps } from "../../interfaces/FormInputProps";
import { InputIds } from "../../enum/InputIds";
import { useFormData } from "../../hooks/useFormData";

export default function Etapa1() {
  const { setFormData } = useFormData();
  const [localInputValues, setLocalInputValues] = useState<{
    [key: string]: string;
  }>({});
  const [hasAlertMessage, setHasAlertMessage] = useState<{
    [key: string]: string;
  }>({});
  const [selectedPersonType, setSelectedPersonType] = useState<string>("");

  const titleLabel = "Seja bem vindo(a)";

  const radioOptions = [
    { label: "Pessoa física", value: "pf" },
    { label: "Pessoa jurídica", value: "pj" },
  ];

  const formInputProps: FormInputProps = {
    idInput: InputIds.email,
    labelInput: "Endereço de e-mail",
    inputType: "email",
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

  const handlePersonTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedPersonType(value);
    setFormData((prevData) => ({
      ...prevData,
      accountType: value,
    }));
  };

  const disableButton =
    !Object.values(hasAlertMessage).some((message) => message !== "") &&
    selectedPersonType !== "";

  return (
    <div>
      <Stepper activeStep="1" maxStep="4" labelStep={titleLabel} />
      <DynamicInput
        idInput={formInputProps.idInput}
        labelInput={formInputProps.labelInput}
        inputType={formInputProps.inputType}
        setDynamicAlertMessage={setDynamicAlertMessage}
        maxLenghtProp={formInputProps.maxLenghtProp}
        inputValue={localInputValues[formInputProps.idInput] || ""}
        onChangeInputValue={(e) => handleInputChange(formInputProps.idInput, e)}
      />

      <RadioButton
        options={radioOptions}
        name="example"
        selectedPersonType={selectedPersonType}
        onChange={handlePersonTypeChange}
      />

      <DynamicButton
        label="Continuar"
        to={`etapa2-${selectedPersonType}`}
        disableButton={disableButton}
      />
    </div>
  );
}
