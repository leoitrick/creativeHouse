function onOff() {
  document.querySelector("#modal").classList.toggle("hide");
}

function checkFields(event) {
  const valuesToCheck = ["title", "category", "image", "description", "link"];

  const isEmpty = valuesToCheck.find(function (value) {
    const checkIfIsString = typeof event.target[value].value === "string";
    const checkIfIsEmpty = !event.target[value].value.trim(); //remove the spaces before and after the string

    if (checkIfIsEmpty && checkIfIsString) {
      return true;
    }
  });

  if (isEmpty) {
    event.preventDefault();
    alert("Please, fill up all the fields!!!");
  }
}
