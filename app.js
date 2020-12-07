const cafeList = document.getElementById("cafe-list");
function renderData(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  li.setAttribute("data-id", doc.id);

  li.appendChild(name);
  li.appendChild(city);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cafeList.appendChild(li);
}

db.collection("cafes")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      renderData(doc);
    });
    // console.log(snapshot.docs);
  });
