import { Module } from "@nestjs/common";
import { BoarduserService } from "./boarduser.service";
import { BoarduserController } from "./boarduser.controller";

@Module({
  controllers: [BoarduserController],
  providers: [BoarduserService],
  exports: [BoarduserService],
})
export class BoarduserModule {}
