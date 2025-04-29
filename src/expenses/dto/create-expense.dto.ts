import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { PaymentStatus, PaymentStatusList } from '../enum/paymentStatus.enum';

export class CreateExpenseDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  type: string;

  @IsNumber()
  @IsPositive()
  import: number;

  @IsEnum(PaymentStatusList, {
    message: `status must be one of the following values: ${PaymentStatusList}`,
  })
  @IsOptional()
  status?: PaymentStatus;
}
