const json = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) });
const env = () => ({ url: (process.env.SUPABASE_URL || '').replace(/\/$/, ''), key: process.env.SUPABASE_SERVICE_ROLE_KEY || '', token: process.env.ADMIN_TOKEN || '' });
export default async function handler(req, res) {
  const { url, key, token } = env();
  if (!url || !key || !token) return res.status(503).json({ error: 'Booking API belum dikonfigurasi. Rujuk README.' });
  if (req.method === 'POST') {
    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (b.website) return res.status(200).json({ ok: true });
    const name = String(b.name || '').trim().slice(0, 80), contact = String(b.contact || '').trim().slice(0, 120), service = String(b.service || '').trim().slice(0, 100), problem = String(b.problem || '').trim().slice(0, 1200), budget = String(b.budget || '').trim().slice(0, 80);
    if (name.length < 2 || service.length < 2 || problem.length < 8) return res.status(400).json({ error: 'Sila semak nama, servis dan penerangan masalah.' });
    const r = await fetch(`${url}/rest/v1/bookings`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ name, contact, service, problem, budget, status: 'Baharu' }) });
    if (!r.ok) return res.status(502).json({ error: 'Tidak dapat menyimpan tempahan.' });
    return res.status(201).json({ ok: true });
  }
  if (req.method === 'GET') {
    const auth = req.headers.authorization || '';
    if (auth !== `Bearer ${token}`) return res.status(401).json({ error: 'Tidak dibenarkan.' });
    const r = await fetch(`${url}/rest/v1/bookings?select=id,created_at,name,contact,service,problem,budget,status&order=created_at.desc&limit=200`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    if (!r.ok) return res.status(502).json({ error: 'Tidak dapat membaca tempahan.' });
    return res.status(200).json(await r.json());
  }
  if (req.method === 'PATCH') {
    const auth = req.headers.authorization || '';
    if (auth !== `Bearer ${token}`) return res.status(401).json({ error: 'Tidak dibenarkan.' });
    const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (!Number.isInteger(Number(b.id)) || !['Baharu','Dalam proses','Selesai','Ditolak'].includes(b.status)) return res.status(400).json({ error: 'ID atau status tidak sah.' });
    const r = await fetch(`${url}/rest/v1/bookings?id=eq.${Number(b.id)}`, { method: 'PATCH', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ status: b.status }) });
    if (!r.ok) return res.status(502).json({ error: 'Tidak dapat mengemas kini status.' });
    return res.status(200).json({ ok: true });
  }
  res.setHeader('Allow', 'GET, POST, PATCH'); return res.status(405).json({ error: 'Method tidak disokong.' });
}
