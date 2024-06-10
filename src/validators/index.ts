import { InputIds } from "../enum/InputIds";
import { validateCpf } from "./validateCPF";
import { validateCnpj } from "./validateCnpj";
import { validateDataAbertura } from "./validateDataAbertura";
import { validateDataNascimento } from "./validateDataNascimento";
import { validateEmail } from "./validateEmail";
import { validateNome } from "./validateNome";
import { validatePassword } from "./validatePassword";
import { validateRazaoSocial } from "./validateRazaoSocial";
import { validateTelefone } from "./validateTelefone";

export function validators(idInput: string, value: string): string | undefined {
  switch (idInput) {
    case InputIds.email:
      return validateEmail(value);
    case InputIds.password:
      return validatePassword(value);
    case InputIds.cpf:
      return validateCpf(value);
    case InputIds.nome:
      return validateNome(value);
    case InputIds.dataNascimento:
      return validateDataNascimento(value);
    case InputIds.telefone:
      return validateTelefone(value);
    case InputIds.razaoSocial:
      return validateRazaoSocial(value);
    case InputIds.cnpj:
      return validateCnpj(value);
    case InputIds.dataAbertura:
      return validateDataAbertura(value);
    default:
      return undefined;
  }
}
