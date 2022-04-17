const URL = process.env.NEXT_PUBLIC_API;
const LoginAPI = async (body) => {
  return new Promise(async (resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
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

const SignupAPI = (body) => {
  return new Promise(async (resolve, reject) => {
    fetch(process.env.NEXT_PUBLIC_API + "/auth/register", {
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

export { LoginAPI, SignupAPI };
