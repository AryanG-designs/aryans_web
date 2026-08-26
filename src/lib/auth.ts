export const SESSION_COOKIE = "admin_session";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function expectedSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD || "";
  return sha256Hex(`admin-session:${secret}`);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const expected = await expectedSessionToken();
  return timingSafeEqual(token, expected);
}
