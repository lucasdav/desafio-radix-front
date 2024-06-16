import { InputIds } from "../enum/InputIds";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";
export function validators(idInput: string, value: string): string | undefined {
  switch (idInput) {
    case InputIds.email:
      return validateEmail(value);
    case InputIds.password:
      return validatePassword(value);
    default:
      return undefined;
  }
}
