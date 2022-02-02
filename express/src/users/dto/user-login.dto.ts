import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Неверно указан емайл' })
	email: string;

	@IsString()
	password: string;
}
