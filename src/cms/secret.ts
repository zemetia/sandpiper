// Shared by payload.config.ts and the middleware (which verifies the session cookie without Payload).
export const payloadSecret =
  process.env['PAYLOAD_SECRET'] || 'super-secret-payload-key-change-in-production';
