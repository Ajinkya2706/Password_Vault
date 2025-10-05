import { NextRequest, NextResponse } from 'next/server';
import { VaultItemModel } from '../../../models/VaultItem';
import { UserModel } from '../../../models/User';
import { getAuthToken, verifyToken } from '../../../lib/auth';
import { encryptData } from '../../../lib/encryption';

async function authenticate(req: NextRequest) {
  // Try to get token from cookies or Authorization header
  let token = await getAuthToken();
  if (!token) {
    token = req.headers.get("authorization")?.replace("Bearer ", "");
  }

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
}


export async function GET() {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const items = await VaultItemModel.findByUserId(payload.userId);
    return NextResponse.json({ success: true, items });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const { title, username, password, url, notes, tags } = await req.json();

    const user = await UserModel.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const encryptedPassword = encryptData(password, user.masterKey);

    const item = await VaultItemModel.create({
      userId: payload.userId,
      title,
      username,
      encryptedPassword,
      url,
      notes,
      tags
    });

    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to create item' }, { status: 500 });
  }
}