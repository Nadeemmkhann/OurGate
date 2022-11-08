async function onSignup(user) {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var wing = document.getElementById("wing").value;
  var flat = document.getElementById("flat").value;
  var address = document.getElementById("address").value;
  var female = document.getElementById("femaleGender");
  var male = document.getElementById("maleGender");
  var other = document.getElementById("otherGender");
  var gender;
  if (female.checked) {
    gender = female.value;
  } else if (male.checked) {
    gender = male.value;
  } else {
    gender = other.vlaue;
  }
  console.log(gender);
  var password = document.getElementById("password").value;
  var email = document.getElementById("emailAddress").value;
  var phoneNumber = document.getElementById("phoneNumber").value;

  var user = new User(
    firstName,
    lastName,
    wing,
    flat,
    address,
    email,
    password,
    phoneNumber,
    gender
  );

  //Service call
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/receiver");

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    console.log(xhr.responseText);
  };
  xhr.send(user);
  // Get the receiver endpoint from Python using fetch:
  fetch("http://127.0.0.1:5000/receiver", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    // Strigify the payload into JSON:
    body: JSON.stringify(user),
  })
    .then((res) => {
      res.json().then((fuser) => {
        alert(JSON.stringify(fuser));
      });
      if (res.ok) {
        if (
          firstName != "" ||
          lastName != "" ||
          email != "" ||
          password != ""
        ) {
          location.assign("user.html");
        } else {
          alert(" all fieFillld");
        }
      } else {
        alert("something is wrong");
      }
    })
    .then((jsonResponse) => {
      // Iterate through the data with Map and write your rendering logic:
    })
    .catch((err) => console.error(err));

  // Get the reciever endpoint from Python using fetch:
  //   fetch("http://127.0.0.1:5000/receiver", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Accept: "application/json",
  //     },
  //     // Strigify the payload into JSON:
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         console.log(res.json());
  //       } else {
  //         alert("something is wrong");
  //       }
  //     })
  //     .then((jsonResponse) => {
  //       // Log the response data in the console
  //       console.log(jsonResponse);
  //     })
  //     .catch((err) => console.error(err));
}
