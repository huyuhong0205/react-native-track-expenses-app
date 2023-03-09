/* eslint-disable import/prefer-default-export */

export const evaluate = (
  num1Str: string,
  num2Str: string,
  operation: string
): string => {
  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);

  if (Number.isNaN(num1) || Number.isNaN(num2)) return '0';

  switch (operation) {
    case '/':
      return String(num1 / num2);

    case '*':
      return String(num1 * num2);

    case '-':
      return String(num1 - num2);

    case '+':
      return String(num1 + num2);

    default:
      return String(num1 + num2);
  }
};
