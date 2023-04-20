import axios from 'axios'


export default async (req, res) => {
  try {
    const { keyword } = req.body
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-001/completions', {
      prompt: `Tell me a technical joke related to ${keyword}`,
      max_tokens: 60,
      temperature: 0.7,
      n: 1,
      stop: '.'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    })
    const joke = response.data.choices[0].text.trim()
    res.status(200).json(joke)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'An error occurred while fetching the joke' })
  }
}
