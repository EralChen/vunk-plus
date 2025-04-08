import OpenAI from 'openai'

export function createClient () {
  const client = new OpenAI({
    apiKey: 'sk-txvqlzzezwS2jDDU2d2a6eBf14Ef47789f2a4974A519D503',
    baseURL: '"https://aihubmix.com/v1',
    dangerouslyAllowBrowser: true,
  })

  return client
}
