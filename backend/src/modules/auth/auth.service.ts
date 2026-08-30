import { DatabaseContext, UserEntity, UserProfileEntity, OrganizationEntity } from '../../database/db';
import { PasswordUtils } from '../../utils/password';
import { JwtUtils, TokenPayload } from '../../utils/jwt';
import { BadRequestError, UnauthorizedError, ConflictError } from '../../utils/errors';
import { UserRole } from '../../config/constants';
import { LoginInput, RegisterInput } from './auth.dto';

export class AuthService {
  public async login(input: LoginInput) {
    const user = DatabaseContext.users.find((u) => u.email.toLowerCase() === input.email.toLowerCase());
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated. Contact organization admin.');
    }

    const isMatch = await PasswordUtils.compare(input.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    user.lastLoginAt = new Date().toISOString();
    const profile = DatabaseContext.userProfiles.find((p) => p.userId === user.id);
    const employee = DatabaseContext.employees.find((e) => e.userId === user.id);

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      orgId: user.orgId,
      employeeId: employee?.id
    };

    const accessToken = JwtUtils.generateAccessToken(payload);
    const refreshToken = JwtUtils.generateRefreshToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        orgId: user.orgId,
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        employeeId: employee?.id
      },
      accessToken,
      refreshToken
    };
  }

  public async register(input: RegisterInput) {
    const existing = DatabaseContext.users.find((u) => u.email.toLowerCase() === input.email.toLowerCase());
    if (existing) {
      throw new ConflictError('User email already registered');
    }

    let org = DatabaseContext.organizations.find((o) => o.code === input.orgCode);
    if (!org) {
      org = DatabaseContext.organizations[0]; // Default to global org
    }

    const hashedPassword = await PasswordUtils.hash(input.password);
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newUser: UserEntity = {
      id: userId,
      orgId: org.id,
      email: input.email,
      passwordHash: hashedPassword,
      role: input.role || UserRole.EMPLOYEE,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newProfile: UserProfileEntity = {
      id: `prof-${userId}`,
      userId: userId,
      firstName: input.firstName,
      lastName: input.lastName,
      timezone: 'UTC'
    };

    DatabaseContext.users.push(newUser);
    DatabaseContext.userProfiles.push(newProfile);

    const payload: TokenPayload = {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      orgId: newUser.orgId
    };

    const accessToken = JwtUtils.generateAccessToken(payload);
    const refreshToken = JwtUtils.generateRefreshToken(payload);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        orgId: newUser.orgId,
        firstName: newProfile.firstName,
        lastName: newProfile.lastName
      },
      accessToken,
      refreshToken
    };
  }

  public async getProfile(userId: string) {
    const user = DatabaseContext.users.find((u) => u.id === userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    const profile = DatabaseContext.userProfiles.find((p) => p.userId === user.id);
    const employee = DatabaseContext.employees.find((e) => e.userId === user.id);
    const org = DatabaseContext.organizations.find((o) => o.id === user.orgId);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      orgId: user.orgId,
      organizationName: org?.name || 'Default Organization',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      phone: profile?.phone,
      bio: profile?.bio,
      avatarUrl: profile?.avatarUrl,
      employeeId: employee?.id,
      employeeCode: employee?.employeeCode,
      designation: employee?.designation,
      createdAt: user.createdAt
    };
  }
}
