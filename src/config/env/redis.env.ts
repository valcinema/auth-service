import { registerAs } from '@nestjs/config';

import { RedisConfig } from '@/config/interfaces/redis.interface';
import { RedisValidator } from '@/config/validators';
import { validateEnv } from '@/shared/utils';

export const redisEnv = registerAs<RedisConfig>('redis', () => {
	const validated = validateEnv(process.env, RedisValidator);

	return {
		user: validated.REDIS_USER,
		password: validated.REDIS_PASSWORD,
		host: validated.REDIS_HOST,
		port: validated.REDIS_PORT
	};
});
