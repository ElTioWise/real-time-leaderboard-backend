import { BaseException } from './base.exception';

export class DomainException extends BaseException {
  constructor(message: string, code: string, details?: any) {
    super(message, code, 400, details);
  }
}

export class EntityNotFoundException extends BaseException {
  constructor(entityName: string, identifier: string | number) {
    super(
      `${entityName} with identifier ${identifier} not found`,
      'ENTITY_NOT_FOUND',
      404,
      { entityName, identifier },
    );
  }
}

export class EntityAlreadyExistsException extends BaseException {
  constructor(entityName: string, field: string, value: string) {
    super(
      `${entityName} with ${field} '${value}' already exists`,
      'ENTITY_ALREADY_EXISTS',
      409,
      { entityName, field, value },
    );
  }
}

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super('Invalid credentials', 'INVALID_CREDENTIALS', 401);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'Unauthorized access') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class ForbiddenException extends BaseException {
  constructor(message: string = 'Access forbidden') {
    super(message, 'FORBIDDEN', 403);
  }
}

export class ValidationException extends BaseException {
  constructor(errors: Record<string, string[]>) {
    super('Validation failed', 'VALIDATION_ERROR', 422, { errors });
  }
}

export class BusinessRuleViolationException extends BaseException {
  constructor(message: string, details?: any) {
    super(message, 'BUSINESS_RULE_VIOLATION', 422, details);
  }
}
