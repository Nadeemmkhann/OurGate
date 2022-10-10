var test = await Test();
async function Test() {
  let user = {
    name: "John",
    surname: "Smith",
  };

  let response = await fetch("http://localhost:5000/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });

  let result = await response.json();
  alert(result.message);
}
