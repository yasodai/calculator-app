export const format = (number) => {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 12,
  }).format(number);
};

export const findLast = (calculation) => {
  return calculation[calculation.length - 1];
};

export const findLastOperator = (calculation) => {
  return calculation.reduce((acc, cur) => (isOperator(cur) ? cur : acc), "");
};

export const isOperator = (token) => {
  return ["+", "-", "x", "/"].includes(token);
};

function PEMDAS(calculation) {
  const index = calculation.findIndex((operator) =>
    ["x", "/"].includes(operator)
  );
  return index !== -1
    ? index
    : calculation.findIndex((operator) => ["+", "-"].includes(operator));
}

function merge([left, operator, right]) {
  return {
    "/": (a, b) => a / b,
    x: (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  }[operator](Number(left), Number(right));
}

export const calculate = (calculation) => {
  if (calculation.length < 3) return calculation;

  const index = PEMDAS(calculation);

  if (index === -1) return calculation;

  return calculate([
    ...calculation.slice(0, index - 1),
    merge(calculation.slice(index - 1, index + 2)),
    ...calculation.slice(index + 2),
  ]);
};
