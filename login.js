function onLogin() {
  var supervisorCheckbox = document.getElementById("supervisorCheckbox");
  // window.location.assign("http://127.0.0.1:5500/index.html");
  if (supervisorCheckbox.checked) {
    console.log("Authentication......");
    document.getElementById("loginlink").setAttribute("href", "admin.html");
    //authnecatte API
    // "https://www.w3schools.com"
    // location.reload();
  } else {
    console.log("Not Checked");
  }
}
