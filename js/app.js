/* Search Button */
document.getElementById('search-button').addEventListener('click', function() {
    showSpinner();
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
        .then(data => displayPhones(data.data.slice(0, 20), searchInputValue))
};

/* Display phones */
const displayPhones = (phones, searchInputValue) => {
    const phonesContainer = document.getElementById('phones-container');
    const notFoundContainer = document.getElementById('not-found-container');
    if (phones.length === 0 || searchInputValue.length === 0) {
        phonesContainer.textContent = ''
        notFoundContainer.textContent = ''
        document.getElementById('details-container').textContent = '';

        const div = document.createElement('div');
        div.innerHTML = `
            <h2 class="text-center">No Phones Found</h2>
        `;
        notFoundContainer.appendChild(div);
    } else {
        phonesContainer.textContent = ''
        document.getElementById('details-container').textContent = ''
        for (const phone of phones) {
            // console.log(phone)
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `
            <img src="${phone.image}" class="card-img-top w-50  mx-auto" alt="...">
            <div class="card-body ">
                <h5 class="card-title">${phone.brand}</h5>
                <h6 class="card-title">${phone.phone_name}</h6>
        
                <a href="#" class="btn btn-primary mb-0" onclick="loadPhoneDetails('${phone.slug}')">Details</a>
            </div>
        `;
            phonesContainer.appendChild(div);
        }
        notFoundContainer.textContent = ''
    }
    hideSpinner();
}

/* Fetch Phone Details */
const loadPhoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
};

/* Display Phone Details */
const displayPhoneDetails = phoneDetails => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = ''
    const sensors = phoneDetails.mainFeatures.sensors;
    const sensorDiv = document.createElement('div');
    for (const sensor of sensors) {
        var li = document.createElement('li');
        li.innerText = sensor;
        sensorDiv.appendChild(li);
    };
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details')
    detailsDiv.innerHTML = `
        <div class="card mb-3 ">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${phoneDetails.image}" class="w-100 rounded-start pictures" alt="...">
                </div>
                <div class="col-md-8 ">
                    <div class="card-body text-start">
                        <div class="brand-details rounded-3 ps-3  py-2">
                            <h2 class="card-title">${phoneDetails.brand}</h2>
                            <h3 class="card-title">${phoneDetails.name}</h3>
                        </div>
                        <br>

                        <!-- Main Feature -->
                        <div class="border features text-black rounded-3 ps-3  py-2">
                            <h4 class="fw-bold">Main Features</h3>
                            <p><span class="fw-bold">Storage:</span> ${phoneDetails.mainFeatures.storage}</p>
                            <p><span class="fw-bold">Display Size:</span> ${phoneDetails.mainFeatures.displaySize}</p>
                            <p><span class="fw-bold">Chipset:</span> ${phoneDetails.mainFeatures.chipSet}</p>
                            <p><span class="fw-bold">Memory:</span> ${phoneDetails.mainFeatures.memory}</p>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Sensors
                                </button>
                                <ul class="dropdown-menu p-4">
                                    ${sensorDiv.innerHTML}   
                                </ul>
                            </div>
                        </div>
                        <br>
                        
                        <h4>${phoneDetails.releaseDate ? phoneDetails.releaseDate: "NO Release Date Given"}</h4>
                        <br>
                        
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            Others
                            </button>
                            <ul class="dropdown-menu  p-4 text-start">
                                <li><span class="fw-bold">WLAN:</span> ${phoneDetails.hasOwnProperty('others') ? phoneDetails.others.WLAN : "Not Found" }</li>
                                <li><span class="fw-bold">Bluetooth:</span> ${phoneDetails.hasOwnProperty('others') ? phoneDetails.others.Bluetooth : "Not Found" }</li>
                                <li><span class="fw-bold">GPS:</span> ${phoneDetails.hasOwnProperty('others') ? phoneDetails.others.GPS : "Not Found" }</li>
                                <li><span class="fw-bold">NFC:</span> ${phoneDetails.hasOwnProperty('others') ? phoneDetails.others.NFC : "Not Found" }</li>
                                <li><span class="fw-bold">Radio:</span> ${phoneDetails.hasOwnProperty('others') ? phoneDetails.others.Radio : "Not Found" }</li>
                                <li><span class="fw-bold">USB:</span> ${phoneDetails.hasOwnProperty('others') ? phoneDetails.others.USB : "Not Found" }</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     `;
    detailsContainer.appendChild(detailsDiv);
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('phones-container').textContent = ''
}
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}