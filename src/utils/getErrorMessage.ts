import { ValidationError } from "class-validator";

export const getErrorMessage = (errors: ValidationError[]) => {
  return errors.map(e => Object.values(e.constraints)).join(",");
};
