import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";
import localize from "../localize.js";

const ln = localize[process.env.LANGUAGE];

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
};

const weatherRequest = async (city, token, lang) => {
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang,
        units: "metric",
      },
    }
  );

  return data;
};

const getWeather = async (city) => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
  const lang =
    process.env.LNG ?? (await getKeyValue(TOKEN_DICTIONARY.language));
  if (!token) {
    throw new Error("Не задан ключ API");
  }
  const data = [];
  await Promise.allSettled(
    city.map((el) => weatherRequest(el, token, lang))
  ).then((res) => {
    res.forEach((a) => data.push(a.value));
  });
  return data;
};

export { getWeather, getIcon };
