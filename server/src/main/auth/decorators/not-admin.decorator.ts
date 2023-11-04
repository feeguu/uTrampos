import { SetMetadata } from '@nestjs/common';

export const NOT_ADMIN_KEY = 'notAdmin';
export const NotAdmin = () => SetMetadata(NOT_ADMIN_KEY, true);
