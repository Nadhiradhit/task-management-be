import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { BoardModule } from "./board/board.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { BoarduserController } from "./boarduser/boarduser.controller";
import { BoarduserModule } from "./boarduser/boarduser.module";
import { ColumnController } from './column/column.controller';
import { ColumnModule } from './column/column.module';

@Module({
  imports: [AuthModule, BoardModule, PrismaModule, BoarduserModule, ColumnModule],
  controllers: [AppController, BoarduserController, ColumnController],
  providers: [AppService],
})
export class AppModule {}
