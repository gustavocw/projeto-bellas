import ioredis from 'ioredis';

export const redis = new ioredis({
    host:'in_memory',
    port: 6379,
    password: 'admin',
});
