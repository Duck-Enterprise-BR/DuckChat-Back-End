import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserService } from 'src/user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly cryptoService: CryptoService,
        private readonly jwtService: JwtService
    ) {}

    async login(props: AuthLoginDto){
        const checkProfile = await this.userService.findOne(props.email);
      
        if(!checkProfile){
            throw new NotFoundException("Login or Password not found");
        };
    
        const { password } = checkProfile;
    
        const checkPassword = await this.cryptoService.compare(props.password, password);
    
        if(!checkPassword){
            throw new NotFoundException("Login or Password not found");
        };
    
        delete checkProfile.password;

        const token = this.jwtService.sign({
            userId: checkProfile.id,
            email: checkProfile.email
        }, {
            secret: process.env.JWT_SECRET,
            expiresIn: "1d"
        })

        return {
            ...checkProfile,
            accessToken: token
        }
    }
}
