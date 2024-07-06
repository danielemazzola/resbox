const generateToken = () => {
  const token = Math.floor(1000 + Math.random() * 9999)
  return token
}

module.exports = { generateToken }
