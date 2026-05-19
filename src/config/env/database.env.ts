import { registerAs } from '@nestjs/config';

import { DatabaseConfig } from '@/config/interfaces/database.interface';
import { DatabaseValidator } from '@/config/validators';
import { validateEnv } from '@/shared/utils';

export const databaseEnv = registerAs<DatabaseConfig>('database', () => {
	const validated = validateEnv(process.env, DatabaseValidator);

	return {
		user: validated.DATABASE_USER,
		password: validated.DATABASE_PASSWORD,
		host: validated.DATABASE_HOST,
		port: validated.DATABASE_PORT,
		name: validated.DATABASE_NAME
	};
});
