import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@valcinema/passport';

import { getPassportConfig } from '@/config';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { OtpService } from '@/modules/otp/otp.service';
import { UserRepository } from '@/shared/repositories';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, UserRepository, OtpService]
})
export class AuthModule {}
