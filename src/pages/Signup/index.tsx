import { useState } from "react";
import DynamicButton from "../../components/DynamicButton";
import DynamicInput from "../../components/DynamicInput";
import { ButtonProps } from "../../enum/ButtonProps";
import { FormInputProps } from "../../interfaces/FormInputProps";
import { InputIds } from "../../enum/InputIds";
import { useFormData } from "../../hooks/useFormData";
import { UserRegistrationData } from "../../services/registerUser/type";
import { useMutation } from "react-query";
import registerUser from "../../services/registerUser";
import CustomAlert from "../../components/CustomAlert";
import LoadingComponent from "../../components/LoadingComponent";
import styles from '../../styles/styles.module.scss';

export default function Signup() {
  const { formData, setFormData } = useFormData();

  const [showAlert, setShowAlert] = useState(false);

  const [hasAlertMessage, setHasAlertMessage] = useState<{
    [key: string]: string;
  }>({});

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      setShowAlert(true);
    },
    onError: () => {
      setShowAlert(true);
    },
  });

  const formInputProps: FormInputProps[] = [
    {
      idInput: InputIds.email,
      labelInput: "Endereço de e-mail",
      inputType: "email",
      maxLenghtProp: 50,
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
      email: formData.email,
      password: formData.password,
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
      ? "Ops, Usuário já cadastrado"
      : mutation.isSuccess
      ? "Cadastro realizado com sucesso"
      : "Ocorreu um erro ao salvar o formulário";

  return (
    <div>
      <header>
        <h1 className={styles.h1Styled}>Criar conta</h1>
      </header>
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
      required
        label="Cadastrar"
        to=""
        buttonWidth={ButtonProps.continuarButton}
        disableButton={disableButton}
        onClickRegistrarUsuario={handleRegistration}
      />
      {mutation.isLoading && <LoadingComponent />}
      {showAlert ? (
        <CustomAlert
          message={messageAlert}
          onClose={handleCloseAlert}
          onClickRegistrarUsuario={handleRegistration}
          tryAgainButton={
            !(errorResponse?.response?.status === 400 || mutation.isSuccess)
          }
        />
      ) : null}
    </div>
  );
}
