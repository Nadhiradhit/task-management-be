import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService ],
  exports: [ColumnService]
})
export class ColumnModule {}
