import Handlebars from 'handlebars'
const compiled = {}

export default $ => {
  $.fn.compile = function (template, data) {
    if(compiled[template] == undefined) {
      compiled[template] = Handlebars.compile(template)
    }
    return $(compiled[template](data))
  }
}