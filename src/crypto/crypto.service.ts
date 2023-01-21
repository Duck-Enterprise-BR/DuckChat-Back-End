import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
    private salt = 10;

    async hash(keyword: string): Promise<string>{
        return await bcrypt.hash(keyword, this.salt);
    }

    async compare(keyword: string, hash: string){
        return await bcrypt.compare(keyword, hash);
    }
}
