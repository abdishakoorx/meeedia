import { db } from '@/db';
import { USER_TABLE } from '@/db/schema';
import { eq } from 'drizzle-orm';

const TOKENS_PER_VIDEO = 3;

export interface TokenCheckResult {
  hasEnoughTokens: boolean;
  currentTokens: number;
  requiredTokens: number;
}

export async function checkUserTokens(email: string): Promise<TokenCheckResult> {
  const user = await db.select({
    credits: USER_TABLE.credits
  })
  .from(USER_TABLE)
  .where(eq(USER_TABLE.email, email))
  .limit(1);

  if (!user || user.length === 0) {
    throw new Error('User not found');
  }

  const currentTokens = user[0].credits ?? 0;
  return {
    hasEnoughTokens: currentTokens >= TOKENS_PER_VIDEO,
    currentTokens,
    requiredTokens: TOKENS_PER_VIDEO
  };
}

export async function deductTokens(email: string): Promise<number> {
  const currentTokens = await checkUserTokens(email);
  
  if (!currentTokens.hasEnoughTokens) {
    throw new Error(`Insufficient tokens. Required: ${TOKENS_PER_VIDEO}, Available: ${currentTokens.currentTokens}`);
  }

  const result = await db
    .update(USER_TABLE)
    .set({
      credits: currentTokens.currentTokens - TOKENS_PER_VIDEO
    })
    .where(eq(USER_TABLE.email, email))
    .returning({ newBalance: USER_TABLE.credits });

  if (!result || result.length === 0) {
    throw new Error('Failed to update tokens');
  }

  return result[0].newBalance ?? 0;
}