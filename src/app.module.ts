import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { BoardModule } from "./board/board.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [AuthModule, BoardModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
