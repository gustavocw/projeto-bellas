export abstract class ARedisProvider {
    abstract findIsCacheAndResponse(data:Object): Promise<Object[]>;
};
