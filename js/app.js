/* Search Button */
document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input');
    const searchInputValue = searchInput.value;
    searchInput.value = ''
    loadPhones(searchInputValue);
});

/* Fetch Phones from API */
const loadPhones = searchInputValue => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data.slice(0, 20)))
};

/* Display phones */
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ''
    for (const phone of phones) {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <img src="${phone.image}" class="card-img-top w-50  mx-auto" alt="...">
            <div class="card-body ">
                <h5 class="card-title">${phone.brand}</h5>
                <h6 class="card-title">${phone.phone_name}</h6>
        
                <a href="#" class="btn btn-primary mb-0" onclick="loadDetails()">Details</a>
            </div>
        `;
        phonesContainer.appendChild(div);
    }
}

/* Details Button */
const loadDetails = () => {
    console.log("hello")
}