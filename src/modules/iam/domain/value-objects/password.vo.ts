export class Password {
  private static readonly MIN_LENGTH = 8;

  private constructor(private readonly value: string) {}

  static create(raw: string): Password {
    if (raw.length < this.MIN_LENGTH) {
      throw new Error(`Password must be at least ${this.MIN_LENGTH} characters`);
    }
    if (!/[A-Z]/.test(raw)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[0-9]/.test(raw)) {
      throw new Error('Password must contain at least one number');
    }
    return new Password(raw);
  }

  static fromHash(hash: string): Password {
    return new Password(hash);
  }

  toString(): string {
    return this.value;
  }
}
