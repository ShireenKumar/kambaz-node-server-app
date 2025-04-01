export default function Hello(app) {
    app.get('/hello', (req, res) => {
      res.send('MEOW')
    })
    app.get('/', (req, res) => {
      res.send('Welcome to Full Stack Development!')
    })
  }
  