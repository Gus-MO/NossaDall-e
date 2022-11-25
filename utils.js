exports.standard_out_path = function standard_out_path(str) {
  return str.toLowerCase().replaceAll(" ", "_")
}

exports.get_current_out_date = function get_current_out_date(){
  const outDate = new Date();
  return outDate.toISOString();
}
