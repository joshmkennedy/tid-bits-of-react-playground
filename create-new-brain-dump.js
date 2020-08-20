const fs = require('fs')

function createBrainDump() {
  let newBrainDump
  const title = process.argv[2]
  const date = new Date().toISOString()
  newBrainDump = fs.readFileSync('./MarkdownTemplates/brain-dump.txt', 'utf-8')

  newBrainDump = newBrainDump.replace('%TITLE%', title)
  newBrainDump = newBrainDump.replace('%DATE%', date)
  fs.mkdirSync(`./content/brain/${title}`)
  fs.writeFileSync(`./content/brain/${title}/index.md`, newBrainDump)
}
createBrainDump()
