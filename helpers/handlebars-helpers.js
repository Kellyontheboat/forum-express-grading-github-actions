const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)

const handlebarsHelpers = {
  currentYear: () => dayjs().year(),
  relativeTimeFromNow: a => dayjs(a).fromNow(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}

module.exports = handlebarsHelpers
