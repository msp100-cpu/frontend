const URL = process.env.NEXT_PUBLIC_API;

const DELIVERY_STATUS = [
  "DRAFT",
  "PAID",
  "IN-PROGRESS",
  "OUT-FOR-DELIVERY",
  "COMPLETED",
];

const createOrder = (token, body) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/payment/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          return reject(response);
        } else {
          return resolve(response);
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
};

const getOrderDetails = (token, body) => {
  return new Promise(async (resolve, reject) => {
    console.log("@@@", body);
    fetch(URL + "/user/order/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          return reject(response);
        } else {
          return resolve(response);
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
};

const confirmPayment = (token, body) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/product/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          return reject(response);
        } else {
          return resolve(response);
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
};

export { createOrder, confirmPayment, getOrderDetails };
