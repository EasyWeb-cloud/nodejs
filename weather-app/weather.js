#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printError,
  printSuccess,
  printHelp,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";
import { getWeather, getIcon } from "./services/api.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Токен не передан");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен успешно сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Город не передан");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("Город успешно сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const saveLanguage = async (lng) => {
  if (!innerHeight.length) {
    printError("Не передан язык");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.language, lng);
    printSuccess("Язык не передан");
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const weathers = await getWeather(city);
    weathers.forEach((el) => {
      printWeather(el, getIcon(el.weather[0].icon));
    });
  } catch (e) {
    if (e?.response?.status === 404) {
      printError("Неверно указан город");
    } else if (e?.response?.status === 401) {
      printError("Неверно указан токен");
    } else {
      printError(e.message);
    }
  }
};

const setDefaultLanguage = async () => {
  if (await getKeyValue(TOKEN_DICTIONARY.language)) {
    return (process.env.LANGUAGE = TOKEN_DICTIONARY.language);
  }

  await saveKeyValue(TOKEN_DICTIONARY.language, "eng");
  return (process.env.LANGUAGE = "eng");
};

const initCLI = () => {
  const args = getArgs(process.argv);
  setDefaultLanguage();
  console.log(args);
  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t[0]);
  }

  if (args.l) {
    return saveLanguage(args.l[0]);
  }
  return getForecast();
};

initCLI();
