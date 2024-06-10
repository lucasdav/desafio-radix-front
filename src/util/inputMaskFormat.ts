import { InputIds } from "../enum/InputIds";
import { cnpjMaskFormat } from "./cnpjMaskFormat";
import { cpfMaskFormat } from "./cpfMaskFormat";
import { dataMaskFormat } from "./dataMaskFormat";
import { telefoneMaskFormat } from "./telefoneMaskFormat";

export function inputMaskFormat(idInput: string, value: string): string {
  switch (idInput) {
    case InputIds.cpf:
      return cpfMaskFormat(value);
    case InputIds.dataNascimento:
      return dataMaskFormat(value);
    case InputIds.dataAbertura:
      return dataMaskFormat(value);
    case InputIds.telefone:
      return telefoneMaskFormat(value);
    case InputIds.cnpj:
      return cnpjMaskFormat(value);
    default:
      return value;
  }
}