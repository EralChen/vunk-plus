import { ApiReturnType, NormalObject } from '@vunk/core'
import { Movie } from '../types'

export { data }
 
export type Data = ApiReturnType<typeof data>

async function data () {
  const response = await fetch('https://star-wars.brillout.com/api/films.json')



  const { results: movies } = await response.json().then(res => {
    res.results.forEach((v: NormalObject) => {
      v.id = v.episode_id
    })
    return res
  }) as { results: Movie[] }

  /* Or with an ORM:
  let movies = await Movie.findAll() */
  /* Or with SQL:
  let movies = await sql.run('SELECT * FROM movies;') */
 
  // `movies` is serialized and passed to the client. Therefore, we pick only the
  // data the client needs in order to minimize what is sent over the network.
  // movies = movies.map(({ title, release_date }) => ({ title, release_date }))

  // console.log('movies', movies)

  return {
    movies,
  }
}