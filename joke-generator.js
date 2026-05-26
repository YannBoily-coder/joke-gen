const axios = require('axios');
joke-generator.js
// 🐰💙 Random Joke Generator - Lapin Bleu Edition

const jokeApis = [
  {
    name: 'JokeAPI',
    url: 'https://v2.jokeapi.dev/joke/Any?safe-mode',
    parser: (data) => data.joke || `${data.setup} ${data.delivery}`
  },
  {
    name: 'Official Joke API',
    url: 'https://official-joke-api.appspot.com/random_joke',
    parser: (data) => `${data.setup} ${data.punchline}`
  },
  {
    name: 'Jokes by API Ninjas',
    url: 'https://api.api-ninjas.com/v1/jokes',
    parser: (data) => data[0].joke,
    headers: { 'X-Api-Key': process.env.JOKES_API_KEY || 'demo' }
  }
];

/**
 * Fetches a random joke from a random API
 * @returns {Promise<string>} A joke string
 */
async function getRandomJoke() {
  try {
    // Pick a random API
    const randomApi = jokeApis[Math.floor(Math.random() * jokeApis.length)];
    
    console.log(`🐰 Fetching from ${randomApi.name}...`);
    
    const response = await axios.get(randomApi.url, {
      headers: randomApi.headers || {},
      timeout: 5000
    });
    
    const joke = randomApi.parser(response.data);
    return joke;
  } catch (error) {
    console.error('❌ Error fetching joke:', error.message);
    return 'Why did the blue rabbit fail to get a joke? Because the API was hopping mad! 🐰💙';
  }
}

/**
 * Displays a joke with fancy formatting
 */
async function displayJoke() {
  console.log('\n🐰💙 ==================== LAPIN BLEU JOKES 🐰💙 ====================\n');
  
  const joke = await getRandomJoke();
  
  console.log(`😂 ${joke}\n`);
  console.log('================================================================\n');
}

// Run the generator
if (require.main === module) {
  displayJoke();
}

module.exports = { getRandomJoke, displayJoke };
