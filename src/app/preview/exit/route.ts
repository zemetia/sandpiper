import { draftMode } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { isSafePath } from '@/lib/safe-path';

export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  const path = request.nextUrl.searchParams.get('path') ?? '/';
  return NextResponse.redirect(new URL(isSafePath(path) ? path : '/', request.url));
}
