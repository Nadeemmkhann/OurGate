function onLogin() {
  var supervisorCheckbox = document.getElementById("supervisorCheckbox");
  if (supervisorCheckbox.checked) {
    console.log("Authentication......");
    //authnecatte API
    location.assign = "http://127.0.0.1:5500/admin.admin.html?";
    location.reload();
  } else {
    console.log("Npt Checked");
  }
}
