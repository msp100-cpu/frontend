const URL = process.env.NEXT_PUBLIC_API;

const getUserCheckout = ({ token }) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/user/checkout", {
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
          console.log(response);
          return resolve(response);
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
};

const getUserAddresses = ({ token }) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/user/address", {
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
          console.log(response);
          return resolve(response);
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
};

const updateUserAddress = ({ token, body, url }) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + url, {
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
          return reject(response);
        } else {
          console.log(response);
          return resolve(response);
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
};

const removeUserAddress = ({ token, id }) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + `/user/remove/address/${id}`, {
      method: "DELETE",
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
          console.log(response);
          return resolve(response);
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
};

const updateUserDeliveryAddress = ({ token, body }) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/user/last-address", {
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
          return reject(response);
        } else {
          console.log(response);
          return resolve(response);
        }
      })
      .catch((error) => {
        console.log("err", error);
        reject(error);
      });
  });
};

export {
  getUserAddresses,
  getUserCheckout,
  updateUserAddress,
  updateUserDeliveryAddress,
  removeUserAddress,
};
