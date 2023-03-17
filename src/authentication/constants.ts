export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY || "secrect",
  expired: process.env.JWT_EXPIRED_TOKEN || "15d",
};
