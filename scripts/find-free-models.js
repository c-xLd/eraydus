const fs = require('fs')

const content = fs.readFileSync(process.argv[2], 'utf8')
// Find the JSON part
const jsonStart = content.indexOf('{"data":[')
if (jsonStart !== -1) {
  const jsonStr = content.substring(jsonStart).trim()
  try {
    const data = JSON.parse(jsonStr)
    const freeModels = data.data.filter(m => m.id.endsWith(':free') || m.pricing?.prompt === '0' || m.pricing?.prompt === 0)
    console.log(freeModels.map(m => m.id).join(','))
  } catch (e) {
    console.error("JSON parse error")
  }
}
