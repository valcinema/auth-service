import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Account } from '@prisma/generated/client';
import { RpcStatus } from '@valcinema/common';
import {
	RefreshRequest,
	SendOtpRequest,
	VerifyOtpRequest
} from '@valcinema/contracts/gen/auth';
import { PassportService, TokenPayload } from '@valcinema/passport';

import type { AllConfigs } from '@/config';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { OtpService } from '@/modules/otp/otp.service';

@Injectable()
export class AuthService {
	private readonly ACCESS_TOKEN_TTL: number;
	private readonly REFRESH_TOKEN_TTL: number;

	public constructor(
		private readonly configService: ConfigService<AllConfigs>,
		private readonly authRepository: AuthRepository,
		private readonly otpService: OtpService,
		private readonly passportService: PassportService
	) {
		this.ACCESS_TOKEN_TTL = this.configService.getOrThrow(
			'passport.accessTtl',
			{
				infer: true
			}
		);
		this.REFRESH_TOKEN_TTL = this.configService.getOrThrow(
			'passport.refreshTtl',
			{
				infer: true
			}
		);
	}

	public async sendOtp(data: SendOtpRequest) {
		const { identifier, type } = data;
		let account: Account | null;

		if (type === 'phone') {
			account = await this.authRepository.findByPhone(identifier);
		} else {
			account = await this.authRepository.findByEmail(identifier);
		}

		if (!account) {
			await this.authRepository.create({
				phone: type === 'phone' ? identifier : undefined,
				email: type === 'email' ? identifier : undefined
			});
		}

		const code = await this.otpService.send(
			identifier,
			type as 'phone' | 'email'
		);

		console.debug('CODE:', code);

		return { ok: true };
	}

	public async verifyOtp(data: VerifyOtpRequest) {
		const { identifier, code, type } = data;

		await this.otpService.verify(
			identifier,
			code,
			type as 'phone' | 'email'
		);

		let account: Account | null;

		if (type === 'phone') {
			account = await this.authRepository.findByPhone(identifier);
		} else {
			account = await this.authRepository.findByEmail(identifier);
		}

		if (!account) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Account not found'
			});
		}

		if (type === 'phone' && !account.isPhoneVerified) {
			await this.authRepository.update(account.id, {
				isPhoneVerified: true
			});
		}

		if (type === 'email' && !account.isEmailVerified) {
			await this.authRepository.update(account.id, {
				isEmailVerified: true
			});
		}

		return this.generateToken(account.id);
	}

	public async refresh(data: RefreshRequest) {
		const { refreshToken } = data;
		const result = this.passportService.verify(refreshToken);

		if (!result.valid) {
			throw new RpcException({
				code: RpcStatus.UNAUTHENTICATED,
				details: result.reason
			});
		}

		return this.generateToken(result.userId!);
	}

	private generateToken(userId: string) {
		const payload: TokenPayload = { sub: userId };

		const accessToken = this.passportService.generate(
			String(payload.sub),
			this.ACCESS_TOKEN_TTL
		);
		const refreshToken = this.passportService.generate(
			String(payload.sub),
			this.REFRESH_TOKEN_TTL
		);

		return { accessToken, refreshToken };
	}
}
