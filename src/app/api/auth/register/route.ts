import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '../../../../models/User';
import { hashPassword, generateMasterKey } from '../../../../lib/encryption';
import { createToken, setAuthCookie } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password required' },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const masterKey = generateMasterKey(email, password);
    
    const user = await UserModel.create(email, hashedPassword, masterKey);
    const token = createToken(user._id);
    
   await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      token,
      user: { id: user._id, email: user.email }
    });
  } catch  {
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    );
  }
}