import { IsDateString } from "class-validator";

export class DateFilterDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}