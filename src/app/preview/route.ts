import config from '@payload-config';
import { draftMode } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

import { isSafePath } from '@/lib/safe-path';

/**
 * Entry point for the admin "Preview" button and Live Preview iframe.
 * Only signed-in CMS users can turn on draft mode.
 */
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') ?? '/';
  if (!isSafePath(path)) {
    return new NextResponse('Invalid path', { status: 400 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) return new NextResponse('Sign in to the CMS to preview drafts', { status: 403 });

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(path, request.url));
}
