export const env = {
  port: process.env.PORT ?? 8080,
  salt: Number(process.env.SALT) ?? 12,
  secret: process.env.SECRET ?? 'great_dangerous_SECRET',
};
