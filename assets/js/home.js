function fecthApi() {
    try {
        let events = data.eventos

        createCheckBoxes(events)
        printCards(events)

        /*document.getElementById('buttonSearch').addEventListener('click', (event) => {
            event.preventDefault()
            filterData()
        })
        document.querySelectorAll('.class_checks').forEach((each) =>each.addEventListener('click', filterData))*/

    } catch (error) {
        console.log(error)
    }
}

fecthApi()

function filterData() {
    try {
        let texto = document.getElementById('searchInTitle').value.toLowerCase();
        let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value);
        //
        if (events.length == 0) {
        printEmpty()
        } else {
        printCards(events)
        }
    } catch (error) {
        console.log(error)
    }
}

/* FUNCTION: Retorna UN div para cada evento
 * Recibe un id que será el identificador del evento
 * y un objeto que corresponde al evento */
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

/* FUNCTION: Pinta las cards según el arreglo de eventos
* que ingrese por parámetro */
function printCards(array) {
    const containerCategory = document.getElementById('cards');
    containerCategory.innerHTML = '';

    for (let i = 0; i < array.length; i++) {

        let id = `card${i + 1}`
        let div = createEventCard(id, array[i]);
        document.getElementById('cards').appendChild(div)

    }
}

/* FUNCTION: Creación de Checkboxes */
function createCheckBoxes(arrayEventos) {
    let categories = [... new Set(arrayEventos.map(evento => evento.category))]
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

/* FUNCTION: Pinta mensaje de eventos vacíos */
function printEmpty() {
    const containerCards = document.getElementById('section');
    containerCards.innerHTML = '';

    containerCards.innerHTML = `
        <div class="alert alert-danger" role="alert" style="display:flex; justify-content:center; padding:20px; margin:5px 20px 0px 20px font-family: 'Secular One', sans-serif;" >
        <img  src="./images/logo-warning-message.png" alt="">
        THE ENTERED TITLE DOES NOT HAVE CHARACTERISTICS TO DISPLAY, ENTER ANOTHER TEXT FIELD</div>`;
}
