const URL = process.env.NEXT_PUBLIC_API;

const getProductsByCategoryID = (body) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/category/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
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

const getProductsByproductLink = (body) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/product/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": body,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
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

const pincodeData = (pincode) => {
  return new Promise(async (resolve, reject) => {
    const pincode_details = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    ).then((res) => res.json());
    resolve(pincode_details[0]);
  });
};

const getServiceDetails = (body) => {
  return new Promise(async (resolve, reject) => {
    const pincode_details = await fetch(
      `https://api.postalpincode.in/pincode/${body.pincode}`
    ).then((res) => res.json());

    fetch(URL + "/product/pincode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": body.token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.error) {
          return reject({ ...response, pincode_details });
        } else {
          console.log(response);
          return resolve({ ...response, pincode_details });
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
        return reject({ ...error, pincode_details });
      });
  });
};

const getProductsInCart = (token) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/cart/get", {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((res) => {
        return res.json();
      })
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

const addProductToCart = (token, body) => {
  return new Promise(async (resolve, reject) => {
    const pincode_details = await fetch(
      `https://api.postalpincode.in/pincode/${body.pincode}`
    ).then((res) => res.json());

    fetch(URL + "/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.error) {
          return reject({ response, pincode_details });
        } else {
          return resolve({ cart: response, pincode_details });
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
        return reject({ ...error, pincode_details });
      });
  });
};

const removeProductFromCart = (token, body) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.error) {
          return reject({ ...response });
        } else {
          return resolve({ ...response });
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
        return reject({ ...error });
      });
  });
};

const onPayment = (token, body) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/user/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.error) {
          return reject({ ...response });
        } else {
          return resolve({ ...response });
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
        return reject({ ...error });
      });
  });
};

export {
  getProductsByCategoryID,
  getProductsByproductLink,
  getServiceDetails,
  getProductsInCart,
  addProductToCart,
  removeProductFromCart,
  onPayment,
  pincodeData,
};
