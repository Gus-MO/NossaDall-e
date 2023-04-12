exports.standard_out_path = function standard_out_path(str) {
  return str.toLowerCase().replaceAll(" ", "_")
}

exports.get_current_out_date = function get_current_out_date(){
  const outDate = new Date();
  return outDate.toISOString();
}

exports.check_string = function check_string(str){
  /*
   * Checks if the input is only aA-zZ or number
   */
  // Letters and numbers
  const regexFull = RegExp('^[a-zA-Z0-9]+$');
  const regexLetter = RegExp('[a-zA-Z0-9]');

  var newStr = `${str}`;

  if (!regexFull.test(newStr)) {
    for (const letter of newStr) {
      if (!regexLetter.test(letter))
        newStr = newStr.replace(letter, ' ');
    }
  }

  return newStr;
}
