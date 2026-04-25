export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, model } = req.body;

    const response = await fetch('https://api.x.ai/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: model || "grok-4.20-reasoning",
        input: prompt,
        max_output_tokens: 600
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: data.error?.message || 'Grok API error'
      });
    }

    return res.status(200).json({
      text: data.output?.[0]?.content?.[0]?.text || ''
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, model } = req.body;

    res.status(200).json({
      text: "API is connected but Grok key not implemented yet"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
