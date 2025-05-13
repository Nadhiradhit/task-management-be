import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
