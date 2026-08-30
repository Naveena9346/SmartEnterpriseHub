import jwt from 'jsonwebtoken';
import { UserRole } from '../config/constants';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  orgId: string;
  employeeId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_enterprise_jwt_key_2026_smart_hub';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'super_secret_refresh_token_key_2026_smart_hub';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export class JwtUtils {
  public static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
  }

  public static generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN as any });
  }

  public static verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  }

  public static verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
  }
}
