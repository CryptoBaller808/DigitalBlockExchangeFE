"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.LOCAL_SOCKET_SERVER = exports.BASE_URL = exports.ENV_TYPE = void 0;

var envData = function envData(ENV, local, test, production) {
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

var ENV_TYPE = "production"; // local // test // production

exports.ENV_TYPE = ENV_TYPE;
var BASE_URL = envData(
  ENV_TYPE,
  "https://api.digitalblock.exchange/api/v1/",
  "https://api.digitalblock.exchange/api/v1/",
  "http://34.209.137.12/api/v1/",
);
exports.BASE_URL = BASE_URL;
var LOCAL_SOCKET_SERVER = envData(
  ENV_TYPE,
  "https://api.digitalblock.exchange",
  "https://api.digitalblock.exchange:4000",
  "https://api.digitalblock.exchange",
);
exports.LOCAL_SOCKET_SERVER = LOCAL_SOCKET_SERVER;
