import { registerAs } from '@nestjs/config';

import { GrpcConfig } from '@/config/interfaces/grpc.interface';
import { GrpcValidator } from '@/config/validators';
import { validateEnv } from '@/shared/utils';

export const grpcEnv = registerAs<GrpcConfig>('grpc', () => {
	const validated = validateEnv(process.env, GrpcValidator);

	return {
		host: validated.GRPC_HOST,
		port: validated.GRPC_PORT
	};
});
