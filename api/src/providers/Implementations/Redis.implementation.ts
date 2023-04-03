import { redis } from "src/configs/redis.config";
import { ARedisProvider } from "../IRedis.implementation";

export class RedisProvider implements ARedisProvider{
    async findIsCacheAndResponse(data: Object[]): Promise<Object[]> {
        const cached = await redis.get("Escort");
        if(cached){
            return JSON.parse(cached);
        };
        const saveNewData = await redis.set("Escort", JSON.stringify(data), "EX", 300);
        return data;
    };
};
