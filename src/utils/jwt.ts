"/src/utils/jwt.ts"
import jwt from 'jsonwebtoken';

export interface JwtPayload {
    userId: number;
}

export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
};