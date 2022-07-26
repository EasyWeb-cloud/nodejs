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
import ln from "./localize.js";

const saveToken = async (token) => {
  const currentLanguage = process.env.LANGUAGE;
  const language = ln[currentLanguage];

  if (!token.length) {
    printError(language["token_not_saved"]);
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess(ln["token_saved"]);
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  const currentLanguage = process.env.LANGUAGE;
  const language = ln[currentLanguage];

  if (!city.length) {
    printError(language["city_not_saved"]);
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess(language["city_saved"]);
  } catch (e) {
    printError(e.message);
  }
};

const saveLanguage = async (lng) => {
  const currentLanguage = process.env.LANGUAGE;
  const language = ln[currentLanguage];

  if (!lng) {
    printError(language["no_language"]);
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.language, lng);
    printSuccess(ln[lng]["language_saved"]);
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  const currentLanguage = process.env.LANGUAGE;
  const language = ln[currentLanguage];

  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const weathers = await getWeather(city);
    weathers.forEach((el) => {
      printWeather(el, getIcon(el.weather[0].icon));
    });
  } catch (e) {
    if (e?.response?.status === 404) {
      printError(language["city_validation"]);
    } else if (e?.response?.status === 401) {
      printError(language["token_invalid"]);
    } else {
      printError(e.message);
    }
  }
};

const setDefaultLanguage = async () => {
  const settedLang = await getKeyValue(TOKEN_DICTIONARY.language);
  if (settedLang) {
    return (process.env.LANGUAGE = settedLang);
  }

  await saveKeyValue(TOKEN_DICTIONARY.language, "eng");
  return (process.env.LANGUAGE = "eng");
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  await setDefaultLanguage();

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
