const WA_NUMBER = '601118837488';
const CHANNEL_URLS = { '1': '', '2': '' }; // Masukkan pautan saluran WhatsApp sebenar.
const $ = (s, root = document) => root.querySelector(s);
const nav = $('#mainNav');
$('#menuToggle')?.addEventListener('click', () => { const open = nav.classList.toggle('open'); $('#menuToggle').setAttribute('aria-expanded', String(open)); });
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); $('#menuToggle')?.setAttribute('aria-expanded', 'false'); }));
$('#year').textContent = new Date().getFullYear();
document.querySelectorAll('.choose').forEach(link => link.addEventListener('click', () => { $('#service').value = link.dataset.service; }));
document.querySelectorAll('.channel-link').forEach(link => { const url = CHANNEL_URLS[link.dataset.channel]; if (url && /^https:\/\/whatsapp\.com\/channel\//i.test(url)) { link.href = url; link.textContent = 'Buka saluran ↗'; link.target = '_blank'; link.rel = 'noopener noreferrer'; } else { link.addEventListener('click', e => { e.preventDefault(); alert('Pautan saluran belum disediakan. Edit CHANNEL_URLS dalam src/script.js.'); }); } });
const form = $('#bookingForm');
form?.addEventListener('submit', async event => {
  event.preventDefault(); const status = $('#formStatus');
  if ($('#website').value.trim()) { status.textContent = 'Permintaan tidak dapat diproses.'; return; }
  if (!form.reportValidity()) return;
  const payload = { name: $('#customerName').value.trim(), contact: $('#customerContact').value.trim(), service: $('#service').value, problem: $('#problem').value.trim(), budget: $('#budget').value };
  if (payload.name.length < 2 || payload.problem.length < 8) { status.textContent = 'Sila masukkan nama dan penerangan masalah yang lebih lengkap.'; return; }
  status.textContent = 'Menyediakan mesej WhatsApp…';
  // Cuba simpan ke backend jika Supabase telah dikonfigurasi. WhatsApp kekal sebagai pilihan penghantaran manual.
  try { const r = await fetch('/api/bookings', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...payload, website: $('#website').value}) }); if (r.ok) status.textContent = 'Permintaan direkodkan. WhatsApp akan dibuka untuk anda menghantar mesej.'; else status.textContent = 'WhatsApp akan dibuka. Simpanan dashboard belum dikonfigurasi atau tidak tersedia.'; } catch { status.textContent = 'WhatsApp akan dibuka untuk anda menyemak dan menghantar permintaan.'; }
  const message = ['Hi KAIZAS FIX BUG, saya nak tempah servis.','Nama: ' + payload.name, payload.contact ? 'Cara dihubungi: ' + payload.contact : '', 'Servis: ' + payload.service, 'Penerangan: ' + payload.problem, 'Bajet: ' + payload.budget].filter(Boolean).join('\n');
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
});
const motionBtn = $('#motionToggle'), video = $('#heroMotion');
motionBtn?.addEventListener('click', async () => { if (video.paused) { if (!video.src) video.src = video.dataset.src; try { await video.play(); document.body.classList.add('motion-on'); motionBtn.textContent = 'Ⅱ Hentikan visual motion'; } catch { motionBtn.textContent = 'Video tidak dapat dimainkan pada peranti ini'; } } else { video.pause(); video.removeAttribute('src'); video.load(); document.body.classList.remove('motion-on'); motionBtn.textContent = '▶ Aktifkan visual motion (pilihan)'; } });
