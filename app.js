const cafeList = document.getElementById("cafe-list");
const form = document.getElementById("add-cafe-form");

function renderData(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  li.setAttribute("data-id", doc.id);
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });
}

// get data from firestore
db.collection("cafes")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      renderData(doc);
    });
    // console.log(snapshot.docs);
  });

// save data to firestore
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form["name-input"].value,
    city: form["city-input"].value,
  });
  form["name-input"].value = "";
  form["city-input"].value = "";
});
