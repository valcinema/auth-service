import type { GrpcOptions } from '@nestjs/microservices';
import { PROTO_PATH } from '@valcinema/contracts';

export const grpcPackages = ['auth.v1', 'account.v1'];

export const grpcProtoPaths = [PROTO_PATH.AUTH, PROTO_PATH.ACCOUNT];

export const grpcLoader: NonNullable<GrpcOptions['options']['loader']> = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
};
