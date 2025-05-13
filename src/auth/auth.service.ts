import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(data: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          id: `USR-${Math.floor(100000 + Math.random() * 900000)}`,
          role: data.role || "USER",
        },
      });
      const { password, ...result } = user;
      return {
        data: result,
        message: "User registered successfully",
        status: "Success",
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Email already exists");
        }
      }
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    const { password: _, ...userData } = user;
    return {
      data: {
        ...userData,
      },
      message: "User logged in successfully",
      status: "Success",
    };
  }

  async logout(userId: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { token: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        is_active: true,
        token: true,
      },
    });
    return {
      data: user,
      message: "User logged out successfully",
      status: "Success",
    };
  }

  async getUserData(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        is_active: true,
      },
    });
    return {
      data: user,
      message: "Success get user data",
      status: "Success",
    }
  }

  async getAllUsers(userId: string) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser || currentUser.role !== "ADMIN") {
      throw new ForbiddenException("Only admin can access this endpoint");
    }

    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });

    return {
      data: users,
      message: "Success get all users",
      status: "Success",
    };
  }

  async deleteUser(userId: string) {
    const user = await this.prisma.user.delete({
      where: { id: userId },
    });
    return {
      data: user,
      message: "User deleted successfully",
      status: "Success",
    };
  }

  async updateUser(userId: string, data: any) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    return {
      data: user,
      message: "User updated successfully",
      status: "Success",
    };
  }
}
