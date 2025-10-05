export interface User {
  _id: string;
  email: string;
  password: string;
  masterKey: string;
  createdAt: Date;
}

export interface VaultItem {
  _id: string;
  userId: string;
  title: string;
  username: string;
  encryptedPassword: string;
  url?: string;
  notes?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VaultItemDecrypted extends Omit<VaultItem, 'encryptedPassword'> {
  password: string;
}

export interface GeneratorOptions {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUppercase: boolean;
  includeLowercase: boolean;
  excludeSimilar: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
}