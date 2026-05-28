import type { DatabaseConfig } from '@/config/interfaces/database.interface';
import type { GrpcConfig } from '@/config/interfaces/grpc.interface';
import type { PassportConfig } from '@/config/interfaces/passport.interface';
import type { RedisConfig } from '@/config/interfaces/redis.interface';
import type { TelegramConfig } from '@/config/interfaces/telegram.interface';

export interface AllConfigs {
	grpc: GrpcConfig;
	database: DatabaseConfig;
	redis: RedisConfig;
	passport: PassportConfig;
	telegram: TelegramConfig;
}
