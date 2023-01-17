const envData = (ENV, local, test, production) => {
  if (ENV === "local") {
    return local;
  } else if (ENV === "test") {
    return test;
  } else if (ENV === "production") {
    return production;
  } else {
    console.log(new Error("Something went wrong with credentials"));
  }
};

export const ENV_TYPE = "production"; // local // test // production

export const BASE_URL = envData(
  ENV_TYPE,
  "https://api.digitalblock.exchange/api/v1/",
  "https://api.digitalblock.exchange/api/v1/",
  "https://api.digitalblock.exchange/api/v1/",
);

export const LOCAL_SOCKET_SERVER = envData(
  ENV_TYPE,
  "https://api.digitalblock.exchange",
  "https://api.digitalblock.exchange:4000/",
  "https://api.digitalblock.exchange",
);
