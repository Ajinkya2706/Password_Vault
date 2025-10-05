import clientPromise from '../lib/mongodb';
import { User } from '../types';

export const UserModel = {
  async create(email: string, hashedPassword: string, masterKey: string): Promise<User> {
    const client = await clientPromise;
    const db = client.db('password_vault');
    
    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      masterKey,
      createdAt: new Date()
    });

    return {
      _id: result.insertedId.toString(),
      email,
      password: hashedPassword,
      masterKey,
      createdAt: new Date()
    };
  },

  async findByEmail(email: string): Promise<User | null> {
    const client = await clientPromise;
    const db = client.db('password_vault');
    
    const user = await db.collection('users').findOne({ email });
    if (!user) return null;

    return {
      _id: user._id.toString(),
      email: user.email,
      password: user.password,
      masterKey: user.masterKey,
      createdAt: user.createdAt
    };
  },

  async findById(id: string): Promise<User | null> {
    const client = await clientPromise;
    const db = client.db('password_vault');
    const { ObjectId } = require('mongodb');
    
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) return null;

    return {
      _id: user._id.toString(),
      email: user.email,
      password: user.password,
      masterKey: user.masterKey,
      createdAt: user.createdAt
    };
  }
};