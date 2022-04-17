const amount_commas = (cash) => {
  let amount = parseFloat(cash).toFixed(2).toString();
  if (amount.includes(".")) {
    let result = amount.split(".");
    result[0] = result[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    result = result[0] + "." + result[1];
    return result;
  } else {
    return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

module.exports = { amount_commas };
