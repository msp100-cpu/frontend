const URL = process.env.NEXT_PUBLIC_API;
const HomepageAPI = (body) => {
  return new Promise(async (resolve, reject) => {
    fetch(URL + "/product/home", {
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

export { HomepageAPI };
