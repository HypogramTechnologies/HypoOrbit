 export const validateCoordinates = (valor: string) => {
    const regex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/; // número, vírgula, número
    return regex.test(valor);
  };
