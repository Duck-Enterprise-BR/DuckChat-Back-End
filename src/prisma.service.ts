import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect();
    };

    async enableShutdownHooks(app: INestApplication){
        this.$on("beforeExit", async () => {
            await app.close();
        });
    };

    async countCaseSensitive(table: string, field: string, value: string): Promise<number>{
        return await this.$queryRawUnsafe(`select COUNT(*) from "${table}" WHERE "${field}" ILIKE '${value}'` );
    }
};