import '@babel/polyfill/noConflict'
import server from './server'

const port = process.env.PORT || 4000

server.start({ port }, () => {
  console.log(`The server is up on port ${port}`)
})
