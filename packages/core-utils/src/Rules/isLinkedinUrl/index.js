export default ({ errorMessage }) => ({ value }) => {
  const linkedinUrlRegex = /(?:https?:)?\/\/(?:[\w]+\.)?linkedin\.com\/in\/([\w\-\\_À-ÿ%]+)\/?/g

  return value ? linkedinUrlRegex.test(value) || errorMessage : true
}
