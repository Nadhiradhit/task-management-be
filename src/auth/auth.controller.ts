import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    return this.authService.validateUser(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req) {
    return this.authService.logout(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    return this.authService.getUserData(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("users")
  async getAllUsers(@Request() req) {
    return this.authService.getAllUsers(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("delete")
  async deleteUser(@Request() req) {
    return this.authService.deleteUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("update")
  async updateUser(@Request() req, @Body() data: any) {
    return this.authService.updateUser(req.user.id, data);
  }
}
