// TODO: placeholder — wire to a real store/email service. Currently only logs.
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  if (!email || !/.+@.+\..+/.test(email)) return Response.json({ ok: false }, { status: 400 });
  console.log("waitlist signup (TODO persist):", email);
  return Response.json({ ok: true });
}
