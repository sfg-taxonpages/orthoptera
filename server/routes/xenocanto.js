export default function ({ env, router }) {
  const r = router()

  r.get('/recordings', async (req, res) => {
    const { query, ...rest } = req.query

    if (!query) {
      return res.status(400).json({ error: 'Missing query parameter' })
    }

    const params = new URLSearchParams({
      query,
      ...rest,
      key: env.TAXONPAGES_XENO_CANTO_API_KEY
    })

    console.log(decodeURIComponent(params.toString()))

    const response = await fetch(
      `https://xeno-canto.org/api/3/recordings?${decodeURIComponent(params.toString())}`
    )

    res.status(response.status).json(await response.json())
  })

  return r
}
