const express = require('express')
const app = express()
const port = 3000

app.get('/api/list', (req, res) => {
  res.send({
    success: true,
    data: [
      { name: 'vue', value: 1 },
      { name: 'react', value: 2 },
      { name: 'ng', value: 3 },
      { name: 'express', value: 4 },
      { name: 'nestjs', value: 5 },
    ],
    msg: '',
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
