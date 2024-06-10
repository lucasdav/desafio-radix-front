import { useState } from "react";
import DynamicButton from "../../components/DynamicButton";
import DynamicInput from "../../components/DynamicInput";
import Stepper from "../../components/Stepper";
import { ButtonProps } from "../../enum/ButtonProps";
import { FormInputProps } from "../../interfaces/FormInputProps";
import { InputIds } from "../../enum/InputIds";
import { useFormData } from "../../hooks/useFormData";
import { UserRegistrationData } from "../../services/registerUser/type";
import { useMutation } from "react-query";
import registerUser from "../../services/registerUser";
import CustomAlert from "../../components/CustomAlert";
import LoadingComponent from "../../components/LoadingComponent";
import { useNavigate } from "react-router-dom";

export default function Etapa4PF() {
  const { formData, setFormData } = useFormData();

  const [showAlert, setShowAlert] = useState(false);

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

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      console.log("Registration successful", data);
      setShowAlert(true);
    },
    onError: (error) => {
      console.error("Registration failed", error);
      setShowAlert(true);
    },
  });

  const titleLabel = "Revise suas informações";

  const formInputProps: FormInputProps[] = [
    {
      idInput: InputIds.email,
      labelInput: "Endereço de e-mail",
      inputType: "email",
      maxLenghtProp: 50,
    },
    {
      idInput: InputIds.nome,
      labelInput: "Nome",
      inputType: "text",
      maxLenghtProp: 50,
    },
    {
      idInput: InputIds.cpf,
      labelInput: "CPF",
      inputType: "text",
      maxLenghtProp: 14,
    },
    {
      idInput: InputIds.dataNascimento,
      labelInput: "Data de Nascimento",
      inputType: "text",
      maxLenghtProp: 10,
    },
    {
      idInput: InputIds.telefone,
      labelInput: "Telefone",
      inputType: "text",
      maxLenghtProp: 15,
    },
    {
      idInput: InputIds.password,
      labelInput: "Sua senha",
      inputType: "password",
      maxLenghtProp: 50,
    },
  ];

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
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const disableButton = !Object.values(hasAlertMessage).some(
    (message) => message !== ""
  );

  const handleRegistration = () => {
    const userRegistrationData: UserRegistrationData = {
      nome: formData.nome,
      email: formData.email,
      cpf: formData.cpf,
      dataNascimento: formData.dataNascimento,
      telefone: formData.telefone,
      password: formData.password,
      accountType: formData.accountType,
    };

    mutation.mutate(userRegistrationData);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const errorResponse = mutation.error as
    | (Error & { response?: { status: number } })
    | undefined;
    
  const messageAlert =
    errorResponse?.response?.status === 400
      ? "Ops, todos os campos são obrigatórios"
      : mutation.isSuccess
      ? "Cadastro realizado com sucesso"
      : "Ocorreu um erro ao salvar o formulário";

  return (
    <div>
      <Stepper activeStep="4" maxStep="4" labelStep={titleLabel} />
      {formInputProps.map((form, index) => (
        <DynamicInput
          key={`form-pf-input-${form.idInput}-${index}`}
          idInput={form.idInput}
          labelInput={form.labelInput}
          inputType={form.inputType}
          setDynamicAlertMessage={setDynamicAlertMessage}
          maxLenghtProp={form.maxLenghtProp}
          inputValue={formData[form.idInput] || ""}
          onChangeInputValue={(e) => handleInputChange(form.idInput, e)}
        />
      ))}
      <DynamicButton label="Voltar" buttonWidth={ButtonProps.voltarButton} />
      <DynamicButton
        label="Cadastrar"
        to=""
        buttonWidth={ButtonProps.continuarButton}
        disableButton={disableButton}
        onClickRegistrarUsuario={handleRegistration}
      />
      { mutation.isLoading && <LoadingComponent />}
      { showAlert ? (
        <CustomAlert
          message={messageAlert}
          onClose={handleCloseAlert}
          onClickRegistrarUsuario={handleRegistration}
          tryAgainButton={!(errorResponse?.response?.status === 400 || mutation.isSuccess)}
        />
      ) : null}
    </div>
  );
}
