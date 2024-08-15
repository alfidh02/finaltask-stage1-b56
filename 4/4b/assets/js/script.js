function getData(event) {
  event.preventDefault();
  let nameField = document.getElementById("nameInput").value;
  let emailField = document.getElementById("emailInput").value;
  let phoneField = document.getElementById("phoneInput").value;
  let subjectField = document.getElementById("subject").value;
  let messageField = document.getElementById("message").value;

  if (nameField == "") {
    return alert("Tolong diisikan nama kamu");
  } else if (emailField == "") {
    return alert("Tolong diisikan email kamu");
  }

  console.log(nameField);
  console.log(emailField);
  console.log(phoneField);
  console.log(subjectField);
  console.log(messageField);

  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("phoneInput").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";

  let myEmail = "alfidarmawan79@gmail.com";
  let subject = `Introduction - ${nameField}`;
  let a = document.createElement("a");
  a.href = `mailto:${myEmail}?subject=${subject}&body=Halo bang, nama saya ${nameField}, saya dari jurusan ${subjectField}, saya mau bilang ${messageField}`;
  a.click();
}
