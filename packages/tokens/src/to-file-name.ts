import { toKebabCase } from "remeda";

export function toFileName(name: string) {
  const escapedPropertyName = name.replace(/\//g, "-");
  const fileName = toKebabCase(escapedPropertyName);

  return fileName;
}
