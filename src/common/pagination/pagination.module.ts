import { Module } from '@nestjs/common';
import { PaginationsProvider } from './providers/paginations.provider.ts/paginations.provider.ts';

@Module({
  providers: [PaginationsProvider],
exports:[PaginationsProvider]
})
export class PaginationModule {}
