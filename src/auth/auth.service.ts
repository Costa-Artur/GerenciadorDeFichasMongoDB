import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async loginWithEmail(email: string, password: string): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({where: {email: email}});

        if(!user) {
            throw new NotFoundException('No user found for this email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid Password');
        }

        return {
            accessToken: this.jwtService.sign({userId: user.id, username: user.username, email: user.email})
        };
    }

    async loginWithUsername(username: string, password: string): Promise<AuthEntity> {
        const user = await this.prisma.user.findUnique({where: {username: username}});

        if(!user) {
            throw new NotFoundException('No user found for this email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid Password');
        }

        return {
            accessToken: this.jwtService.sign({userId: user.id, username: user.username, email: user.email})
        };
    }
}
