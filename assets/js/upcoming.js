let date = '';
let arrayPast = [];

function fecthApi() {
  try {
    date = data.fechaActual;
    arrayPast = data.eventos.filter((item) => item.date > date);
    console.log(arrayPast)

    createCheckBoxes(arrayPast)
    printCards(arrayPast)

    //document.getElementById('buttonSearch').addEventListener('click', filterData)
    //document.querySelectorAll('.class_checks').forEach((each) => each.addEventListener('click', filterData))

  } catch (error) {
    console.log(error);
  }
}

fecthApi()

function filterData() {
  try {
    let texto = document.getElementById('searchText').value.toLowerCase();
    let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value);
    //console.log(checks);

    if (arrayPast.length == 0) {
      printEmptyPast()
    } else {
      printCards(arrayPast)
    }
  } catch (error) {
    console.log(error)
  }

}

function createEventCard(id, objetoEvento) {

    let div = document.createElement('div');
    div.id = id;
    div.className = 'card'

    div.innerHTML = `
    <img src="${objetoEvento.image}" class="img-fluid" alt="${objetoEvento.name}">
    <div class="card-body">
        <h5 class="card-title">${objetoEvento.name}</h5>
        <p class="card-text">${objetoEvento.description}</p>
        <div class="d-flex justify-content-between">
            <span>Price $${objetoEvento.price}</span>
            <a href="./pages/details.html?id=${objetoEvento.id}" class="btn btn-ae">+</a>
        </div>
    </div>`
    return div
}

/*----- filter text search-------- */
const searchButton = document.getElementById('buttonSearch');
const searchInput = document.getElementById('searchText')

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(searchInput.value);
  filterByText(arrayUpcomingEvents)
})

/*----------------- filter by text and category too, if one  category check the search only filter this category ----------- */
function filterByText(arrayUpcomingEvents) {
  const text = searchInput.value.toLowerCase();

  //Filtrar eventos por categoría seleccionada
  let filteredEvents = arrayUpcomingEvents;
  if (selectedCategories.length > 0) {
    filteredEvents = filteredEvents.filter(event => {
      return selectedCategories.some(category => event.category.toLowerCase().includes(category.toLowerCase()));
    });
  }

  // Filtrar eventos por texto
  filteredEvents = filteredEvents.filter(event => event.name.toLowerCase().includes(text));

  console.log(filteredEvents);
  printCards(filteredEvents);

}

function printEmptyPast() {
  const messageCard = document.getElementById('section');
  messageCard.innerHTML = `
    <div class="alert alert-danger" role="alert" style="display:flex; justify-content:center; padding:20px; margin:5px 20px 0px 20px font-family: 'Secular One', sans-serif;" >
    <img  src="../images/logo-warning-message.png" alt="">
    THE ENTERED TITLE DOES NOT HAVE CHARACTERISTICS TO DISPLAY, ENTER ANOTHER TEXT FIELD</div>`;
  return;
}

/*----function card filter view search------*/
function printCards(arrayUpcomingEvents) {
  const section = document.getElementById('cards');
  section.innerHTML = '';

  for (let i = 0; i < arrayUpcomingEvents.length; i++) {
    let id = `card${i + 1}`
    let div = createEventCard(id, arrayUpcomingEvents[i]);
    document.getElementById('cards').appendChild(div)
  }
}

/* FUNCTION: Creación de Checkboxes */
function createCheckBoxes(arrayUpcomingEvents) {
    let categories = [... new Set(arrayUpcomingEvents.map(evento => evento.category))]
    let categories_check = categories.map(category => { return { id: category.toLowerCase().replaceAll(" ", ""), label: category } })
    const containerCategories = document.getElementById('categories');

    categories_check.forEach(category => {
        // create input type check
        const input_check = document.createElement('input');
        input_check.classList.add("class_checks");
        input_check.classList.add("form-check-input");
        input_check.classList.add("mt-0");
        input_check.setAttribute('type', 'checkbox');
        input_check.setAttribute('id', category.id);
        input_check.setAttribute('name', category.label);
        input_check.setAttribute('value', category.label);
        // create label
        const label = document.createElement('label');
        label.classList.add("label-spform");
        label.setAttribute('for', category.id);
        label.textContent = category.label;
        // create div
        const div = document.createElement('div');
        div.classList.add("input-group-text");
        div.classList.add("d-flex");
        div.classList.add("gap-1");
        div.appendChild(input_check);
        div.appendChild(label);
        containerCategories.appendChild(div);
    })
}
