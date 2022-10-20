import ICondition from "./ICondition";

export default interface IHour {
  condition: ICondition;
  temp_c: number;
  time: string;
}
