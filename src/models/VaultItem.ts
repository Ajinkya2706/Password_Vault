import clientPromise from '../lib/mongodb';
import { VaultItem } from '../types';
import { ObjectId } from 'mongodb';

export const VaultItemModel = {
  async create(data: Omit<VaultItem, '_id' | 'createdAt' | 'updatedAt'>): Promise<VaultItem> {
    const client = await clientPromise;
    const db = client.db('password_vault');
    
    const now = new Date();
    const result = await db.collection('vault_items').insertOne({
      ...data,
      createdAt: now,
      updatedAt: now
    });

    return {
      _id: result.insertedId.toString(),
      ...data,
      createdAt: now,
      updatedAt: now
    };
  },

  async findByUserId(userId: string): Promise<VaultItem[]> {
    const client = await clientPromise;
    const db = client.db('password_vault');
    
    const items = await db.collection('vault_items')
      .find({ userId })
      .sort({ updatedAt: -1 })
      .toArray();

    return items.map(item => ({
      _id: item._id.toString(),
      userId: item.userId,
      title: item.title,
      username: item.username,
      encryptedPassword: item.encryptedPassword,
      url: item.url,
      notes: item.notes,
      tags: item.tags,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));
  },

  async findById(id: string, userId: string): Promise<VaultItem | null> {
    const client = await clientPromise;
    const db = client.db('password_vault');
    
    const item = await db.collection('vault_items').findOne({
      _id: new ObjectId(id),
      userId
    });

    if (!item) return null;

    return {
      _id: item._id.toString(),
      userId: item.userId,
      title: item.title,
      username: item.username,
      encryptedPassword: item.encryptedPassword,
      url: item.url,
      notes: item.notes,
      tags: item.tags,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    };
  },

  async update(id: string, userId: string, data: Partial<Omit<VaultItem, '_id' | 'userId' | 'createdAt'>>): Promise<boolean> {
    const client = await clientPromise;
    const db = client.db('password_vault');
    
    const result = await db.collection('vault_items').updateOne(
      { _id: new ObjectId(id), userId },
      { $set: { ...data, updatedAt: new Date() } }
    );

    return result.modifiedCount > 0;
  },

  async delete(id: string, userId: string): Promise<boolean> {
    const client = await clientPromise;
    const db = client.db('password_vault');
    
    const result = await db.collection('vault_items').deleteOne({
      _id: new ObjectId(id),
      userId
    });

    return result.deletedCount > 0;
  }
};