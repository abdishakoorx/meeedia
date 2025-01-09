import { NextResponse } from 'next/server';
import { checkUserTokens, deductTokens } from '@/app/utils/token-management';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const result = await checkUserTokens(email);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed to check tokens' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const newBalance = await deductTokens(email);
    return NextResponse.json({ success: true, newBalance });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to deduct tokens';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}