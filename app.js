const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const deleteBtn = document.querySelector("#delete-btn");
const savetabBtn = document.querySelector('#savetab-btn');
const ulEl = document.querySelector("#ul-el");

let myLeads = [];
if (localStorage.getItem("savedLeads") !== null) {
    myLeads = JSON.parse(localStorage.getItem("savedLeads"));
    renderLeads();
}

deleteBtn.addEventListener("dblclick", () => {
    myLeads = [];
    localStorage.clear();
    renderLeads();
});

inputBtn.addEventListener("click", addLead);
inputEl.addEventListener("keydown", (e) => {
    if (e.code === "Enter") addLead();
});

savetabBtn.addEventListener('click', function() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        inputEl.value = tabs[0].url.split('://')[1];
        console.log(inputEl.value);
        addLead();
    });
});

function addLead() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("savedLeads", JSON.stringify(myLeads));
    renderLeads();
}

function renderLeads() {
    let newLi = "";
    for (let lead of myLeads) {
        // ulEl.innerHTML += "<li>" + lead + "</li";

        // let newLi = document.createElement('li');
        // newLi.textContent = lead;
        // ulEl.appendChild(newLi);

        newLi += `
                    <li>
                        <a href='http://${lead}' target='_blank' rel='noopener noreferrer'>
                            ${lead}
                        </a>
                    </li>
                `;
    }

    ulEl.innerHTML = newLi;
}
