import IDay from "./IDay";
import IHour from "./IHour";

export default interface Forecast {
  astro: {
    sunrise: string;
    sunset: string;
  };
  date: string;
  day: IDay;
  hour: IHour[];
}
