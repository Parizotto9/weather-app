import ICondition from "./ICondition";

export default interface IWeather {
  condition: ICondition;
  humidity: number;
  temp_c: number;
  wind_kph: number;
}
