import { useParams } from "react-router-dom";
import style from "./City.module.scss";
import IWeather from "../../interfaces/IWeather";
import IForecast from "../../interfaces/IForecast";
// import { WiDaySunny } from "react-icons/wi";
import { HiArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function City() {
  const { place } = useParams();
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(false);
  const dayPeriod = [
    { time: "dawn", hour: 3 },
    { time: "morning", hour: 9 },
    { time: "afternoon", hour: 15 },
    { time: "night", hour: 21 }
  ];
  const [weather, setWeather] = useState<IWeather>();
  const [forecast, setForecast] = useState<IForecast>();
  const dayInfos = [
    { name: "wind speed", data: "wind_kph", unid: "m/s" },
    { name: "sunrise", data: "sunrise", unid: "" },
    { name: "sunset", data: "sunset", unid: "" },
    { name: "humidity", data: "humidity", unid: "%" }
  ];
  type ObjectKeyW = keyof typeof weather;
  type ObjectKeyF = keyof typeof forecast;
  useEffect(() => {
    // const allWithClass = Array.from(document.querySelectorAll("div"));
    // console.log(allWithClass);
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=985174c0cb244495a59223819221810&q=${place}`
      )
      .then((res) => {
        let newWeather = res.data.current;
        changeBackground(res.data.current.condition.text);
        newWeather.wind_kph = (newWeather.wind_kph * 0.277778).toFixed(2);
        setWeather(newWeather);
        setForecast(res.data.forecast.forecastday[0]);
        setLoading(true);
      });
  }, []);
  function changeBackground(conditionText: string) {
    if (contains(conditionText, ["sunny"])) {
      document.body.id = "sunny";
    } else if (contains(conditionText, ["snow", "ice", "sleet", "freezing"])) {
      document.body.id = "snow";
    } else {
      document.body.id = "rain";
      setColor(true);
    }
  }
  function contains(target: string, pattern: string[]): boolean {
    return pattern.some(function (word: string) {
      return target.toLowerCase().includes(word);
    });
  }
  if (loading) {
    return (
      <div className={style.page} style={color ? { color: "black" } : { color: "white" }}>
        <Link to="/" className={style.icon__back}>
          <HiArrowSmLeft />
        </Link>
        <h1> {place} </h1>
        <h3>{weather?.condition.text}</h3>
        <div className={style.City__temp}>
          <h2>{weather?.temp_c.toFixed(0)}</h2>
          <div>
            <h6>{forecast?.day.maxtemp_c.toFixed(0)}º</h6>
            <h6>{forecast?.day.mintemp_c.toFixed(0)}º</h6>
          </div>
        </div>
        <img
          src={weather?.condition.icon}
          alt={weather?.condition.text}
          className={style.icon__Center}
        />
        <div className={style.period__card}>
          {dayPeriod.map((period, ind) => {
            return (
              <div key={ind} className={style.period}>
                <h5>{period.time}</h5>
                <img
                  src={forecast?.hour[period.hour].condition.icon}
                  alt={forecast?.hour[period.hour].condition.text}
                />
                <h4>{forecast?.hour[period.hour].temp_c.toFixed(0) + "ºC"}</h4>
              </div>
            );
          })}
        </div>
        <div className={style.info__card}>
          {dayInfos.map((info, ind) => {
            return (
              <div
                id={style.infoAfter}
                key={ind}
                className={color ? style.info__black : style.info__white}
              >
                <h5>{info.name}</h5>
                <h4>
                  {weather?.[info.data as ObjectKeyW] || forecast?.astro[info.data as ObjectKeyF]}{" "}
                  {info.unid}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div className={style["lds-dual-ring"]}></div>;
  }
}
