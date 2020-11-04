module.exports.isValidFile = (data, isFile = false) => {
  if (isFile) {
    const extensions = ['image/jpeg', 'image/png', 'image/webp']
    if (!extensions.includes(data.mimetype)) return false
    return true
  } else {
    const fileExtensions = ['jpg', 'jpeg', 'webp', 'png']
    const [extension] = data.split('.').slice(-1)
    if (!fileExtensions.includes(extension)) return false
    return true
  }
}
