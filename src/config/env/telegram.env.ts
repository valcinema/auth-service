import { registerAs } from '@nestjs/config';

import { TelegramConfig } from '@/config/interfaces/telegram.interface';
import { TelegramValidator } from '@/config/validators';
import { validateEnv } from '@/shared/utils';

export const telegramEnv = registerAs<TelegramConfig>('telegram', () => {
	const validated = validateEnv(process.env, TelegramValidator);

	return {
		botId: validated.TELEGRAM_BOT_ID,
		botToken: validated.TELEGRAM_BOT_TOKEN,
		botUsername: validated.TELEGRAM_BOT_USERNAME,
		redirectOrigin: validated.TELEGRAM_REDIRECT_ORIGIN
	};
});
