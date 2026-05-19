import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	SendOtpRequest,
	SendOtpResponse,
	VerifyOtpRequest,
	VerifyOtpResponse
} from '@valcinema/contracts/gen/auth';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@GrpcMethod('AuthService', 'SendOtp')
	public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
		return this.authService.sendOtp(data);
	}

	@GrpcMethod('AuthService', 'VerifyOtp')
	public async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
		return this.authService.verifyOtp(data);
	}
}
