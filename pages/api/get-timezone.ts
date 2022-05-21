import { NextApiRequest, NextApiResponse } from 'next'

export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 's-maxage=3600')

  const { lat, lng } = req.query
  if (!lat || !lng) {
    res.status(400).json({ error: 'Missing coordinates' })
    return
  }

  const timestamp = new Date().getTime()
  const milliseconds = timestamp % 1000

  console.log(`${timestamp} - ${lat}, ${lng}`)

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${
      milliseconds + 1000
    }&key=${process.env.GOOGLE_MAPS_KEY}`
  )
  const data = await response.json()

  res.json(data)
}

type CityData = {
  country: string
  name: string
  lat: string
  lng: string
}

type ComponentResponse = {
  types: string[]
  short_name: string
  long_name: string
}
