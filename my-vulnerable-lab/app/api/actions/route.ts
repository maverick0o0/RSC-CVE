import { NextResponse } from 'next/server';

type ActionPayload = {
  message?: string;
};

export async function POST(request: Request) {
  let body: ActionPayload = {};

  try {
    body = await request.json();
  } catch (error) {
    console.error('Failed to parse JSON payload for action demo', error);
  }

  return NextResponse.json({
    received: body.message ?? 'No message provided',
    processedAt: new Date().toISOString(),
  });
}
