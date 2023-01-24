import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly prismaService: PrismaService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async login(props: AuthLoginDto){
        const checkProfile = await this.prismaService.user.findFirst({
            where: {
              email: props.email
            },
            select: {
              id: true,
              email: true,
              name: true,
              avatar: true,
              password: true
            }
        });
      
        if(!checkProfile){
            throw new NotFoundException("Login or Password not found");
        };
    
        const { password } = checkProfile;
    
        const checkPassword = await this.cryptoService.compare(props.password, password);
    
        if(!checkPassword){
            throw new NotFoundException("Login or Password not found");
        };
    
        delete checkProfile.password;

        const token = this.jwtService.sign(
            {
                id: checkProfile.id,
                email: checkProfile.email
            },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return {
            ...checkProfile,
            accessToken: token
        }
    }
}
