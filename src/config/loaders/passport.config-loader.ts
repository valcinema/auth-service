import { ConfigService } from '@nestjs/config';
import { PassportOptions } from '@valcinema/passport';

import type { AllConfigs } from '@/config';

export function getPassportConfig(
	configService: ConfigService<AllConfigs>
): PassportOptions {
	return {
		secretKey: configService.getOrThrow('passport.secretKey', {
			infer: true
		})
	};
}
