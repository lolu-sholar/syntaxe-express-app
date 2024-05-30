const express = require('express')
const SyntaxeIO = require('syntaxe-express')
const router = require('./app/router')

const app = express()

// Add syntaxe middleware
SyntaxeIO.init({
	enabled: true,
	app
})

// Attach router to app
router.sync(app)

const port = 3000
app.listen(port, () => console.log(`Syntaxe enabled express app listening on ${port}`))

module.exports = app