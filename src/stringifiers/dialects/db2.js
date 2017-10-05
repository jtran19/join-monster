function quote(str) {
  return `"${str}"`
}

function recursiveConcat(keys) {
  if (keys.length <= 1) {
    return keys[0]
  }
  return recursiveConcat([ `CONCAT(${keys[0]}, ${keys[1]})`, ...keys.slice(2) ])
}


module.exports = {
  ...require('./mixins/pagination-not-supported'),

  name: 'db2',

  quote,

  compositeKey(parent, keys) {
    keys = keys.map(key => `${quote(parent)}.${quote(key)}`)
    // return `CONCAT(${keys.join(', ')})`
    return recursiveConcat(keys)
  }
}
