import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt';
import { AuthenticationError, AuthorizationError } from '../utils/errors';

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const requireUserType = (...allowedTypes: ('company' | 'student')[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthenticationError());
    }

    if (!allowedTypes.includes(req.user.userType)) {
      return next(
        new AuthorizationError(`Access restricted to ${allowedTypes.join(' or ')} accounts`)
      );
    }

    next();
  };
};
