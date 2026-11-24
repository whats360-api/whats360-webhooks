// Minimal receiver for a Whats360 outgoing webhook. No dependencies.
// Run: node receiver.js   then point the webhook URL (over HTTPS, via a tunnel or your server) here.
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') { res.writeHead(405); return res.end(); }
  let body = '';
  req.on('data', (c) => { body += c; if (body.length > 1e6) req.destroy(); });
  req.on('end', () => {
    try {
      const e = JSON.parse(body);
      // Documented fields: phone, sender_name, message, message_id, chat_jid, timestamp, media_url, instance_id
      console.log('whatsapp event', { phone: e.phone, message_id: e.message_id, message: e.message });
    } catch (err) {
      console.log('non-JSON body ignored');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"status":"ok"}'); // respond 200 quickly
  });
});
server.listen(process.env.PORT || 3000);
