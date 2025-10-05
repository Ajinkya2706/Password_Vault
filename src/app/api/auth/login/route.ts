import { NextRequest, NextResponse } from 'next/server';
import { UserModel } from '../../../../models/User';
import { verifyPassword } from '../../../../lib/encryption';
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

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = createToken(user._id);
    await setAuthCookie(token); // Add await

    return NextResponse.json({
      success: true,
      token,
      user: { id: user._id, email: user.email }
    });
  } catch  {
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}