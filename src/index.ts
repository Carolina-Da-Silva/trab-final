import express, { RequestHandler } from 'express'
import { randomUUID } from 'crypto'
import { connect } from './database';

const port = 3000
const app = express()

const logged: any = {}

app.use(express.json())
app.use(express.static(__dirname + '/../public'))

//Página index 
app.post("/login", async (req, res) => {
    const { login, senha } = req.body
    const db = await connect()
    const user = await db.get(`SELECT * FROM users WHERE email = ? AND senha = ? LIMIT 1`, [login, senha])
    
    if (!user){
      res.status(401).json({ error: "Usuário ou senha inválidos" })
      return 
    }

    const token = randomUUID()
    logged[token] = user
    res.json({ token })
    return 
})

// página cadastro
app.get('/users', async (req, res) => {
  const db = await connect()
  const users = await db.all('SELECT * FROM users')
  res.json(users)
})

app.post('/users', async (req, res) => {
  const db = await connect()
  const { nome, email, senha } = req.body
  const result = await db.run('INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID])
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const db = await connect()
  const { name, email } = req.body
  const { id } = req.params
  await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id])
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id])
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM users WHERE id = ?', [id])
  res.json({ message: 'User deleted' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// Página livro
app.get('/livro', async (req, res) => {
  const db = await connect()
  const livros = await db.all('SELECT * FROM livro')
  res.json(livros)
})

app.post('/livro', async (req, res) => {
  const db = await connect()
  const { titulo, publicacao, genero, isbn } = req.body
  const result = await db.run('INSERT INTO livro (titulo, publicacao, genero, isbn) VALUES (?, ?, ?, ?)', [titulo, publicacao, genero, isbn])
  const livro = await db.get('SELECT * FROM livro WHERE id = ?', [result.lastID])
  res.json(livro)
})

app.put('/livro/:id', async (req, res) => {
  const db = await connect()
  const { titulo, publicacao, genero, isbn } = req.body
  const { id } = req.params
  await db.run('UPDATE livro SET titulo = ?, publicacao = ?, genero = ?, isbn = ? WHERE id = ?', [titulo, publicacao, genero, isbn, id])
  const livro = await db.get('SELECT * FROM livro WHERE id = ?', [id])
  res.json(livro)
})

app.delete('/livro/:id', async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM livro WHERE id = ?', [id])
  res.json({ message: 'livro deletado' })
})

//página autor

app.get('/livro', async (req, res) => {
  const db = await connect()
  const livros = await db.all('SELECT * FROM livro')
  res.json(livros)
})

app.post('/livro', async (req, res) => {
  const db = await connect()
  const { titulo, publicacao, genero, isbn } = req.body
  const result = await db.run('INSERT INTO livro (titulo, publicacao, genero, isbn) VALUES (?, ?, ?, ?)', [titulo, publicacao, genero, isbn])
  const livro = await db.get('SELECT * FROM livro WHERE id = ?', [result.lastID])
  res.json(livro)
})

app.put('/livro/:id', async (req, res) => {
  const db = await connect()
  const { titulo, publicacao, genero, isbn } = req.body
  const { id } = req.params
  await db.run('UPDATE livro SET titulo = ?, publicacao = ?, genero = ?, isbn = ? WHERE id = ?', [titulo, publicacao, genero, isbn, id])
  const livro = await db.get('SELECT * FROM livro WHERE id = ?', [id])
  res.json(livro)
})

app.delete('/livro/:id', async (req, res) => {
  const db = await connect()
  const { id } = req.params
  await db.run('DELETE FROM livro WHERE id = ?', [id])
  res.json({ message: 'livro deletado' })
})
