export const formatIndianRupee = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

export const formatIndianRupeeWithCommas = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })}`;
};