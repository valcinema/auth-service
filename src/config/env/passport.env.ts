import { registerAs } from '@nestjs/config';

import { PassportConfig } from '@/config/interfaces/passport.interface';
import { PassportValidator } from '@/config/validators';
import { validateEnv } from '@/shared/utils';

export const passportEnv = registerAs<PassportConfig>('passport', () => {
	const validated = validateEnv(process.env, PassportValidator);

	return {
		secretKey: validated.PASSPORT_SECRET_KEY,
		accessTtl: validated.PASSPORT_ACCESS_TTL,
		refreshTtl: validated.PASSPORT_REFRESH_TTL
	};
});
