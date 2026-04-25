type ContactPayload = {
  name: string
  email: string
  message: string
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'METHOD_NOT_ALLOWED' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL ?? 'contato@napse.app'
  const from = process.env.CONTACT_FROM_EMAIL ?? 'NAPSE <no_prely@mail.napse.app>'

  if (!apiKey) {
    return res.status(500).json({ ok: false, error: 'MISSING_RESEND_API_KEY' })
  }

  const body = (() => {
    if (!req.body) return {}
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body) as Partial<ContactPayload>
      } catch {
        return {}
      }
    }
    return req.body as Partial<ContactPayload>
  })()
  const name = (body.name ?? '').toString().trim()
  const email = (body.email ?? '').toString().trim()
  const message = (body.message ?? '').toString().trim()

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'MISSING_FIELDS' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'INVALID_EMAIL' })
  }
  if (message.length > 5000) {
    return res.status(400).json({ ok: false, error: 'MESSAGE_TOO_LONG' })
  }

  const subject = `Contato pelo site — ${name}`

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.4">
      <h2 style="margin: 0 0 12px">Novo contato pelo site</h2>
      <p style="margin: 0 0 6px"><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 6px"><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 12px 0 6px"><strong>Mensagem:</strong></p>
      <pre style="margin: 0; white-space: pre-wrap; background: #f6f7f9; padding: 12px; border-radius: 10px">${escapeHtml(message)}</pre>
    </div>
  `

  const payload = {
    from,
    to: [to],
    subject,
    reply_to: email,
    html,
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!resendRes.ok) {
      const text = await resendRes.text().catch(() => '')
      return res.status(502).json({
        ok: false,
        error: 'RESEND_ERROR',
        status: resendRes.status,
        details: text.slice(0, 1000),
      })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'UNEXPECTED_ERROR' })
  }
}

