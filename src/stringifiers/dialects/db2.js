function quote(str) {
  return `"${str}"`
}


module.exports = {
  ...require('./mixins/pagination-not-supported'),

  name: 'db2',

  quote,

  compositeKey(parent, keys) {
    keys = keys.map(key => `${quote(parent)}.${quote(key)}`)
    return `CONCAT(${keys.join(', ')})`
  }
}
