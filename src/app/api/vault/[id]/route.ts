import { NextRequest, NextResponse } from 'next/server';
import { VaultItemModel } from '../../../../models/VaultItem';
import { UserModel } from '../../../../models/User';
import { getAuthToken, verifyToken } from '../../../../lib/auth';
import { encryptData, decryptData } from '../../../../lib/encryption';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { id } = await params;
    const item = await VaultItemModel.findById(id, payload.userId);
    if (!item) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const user = await UserModel.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const decryptedPassword = decryptData(item.encryptedPassword, user.masterKey);

    return NextResponse.json({
      success: true,
      item: { ...item, password: decryptedPassword }
    });
  } catch  {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { title, username, password, url, notes, tags } = await req.json();
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const { id } = await params;
    const updateData: any = { title, username, url, notes, tags };
    if (password) {
      updateData.encryptedPassword = encryptData(password, user.masterKey);
    }

    const success = await VaultItemModel.update(id, payload.userId, updateData);
    return NextResponse.json({ success });
  } catch  {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { id } = await params;
    const success = await VaultItemModel.delete(id, payload.userId);
    return NextResponse.json({ success });
  } catch{
    return NextResponse.json({ success: false }, { status: 500 });
  }
}