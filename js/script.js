let myLeads = [];
let oldLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.getElementById("input-btn");
const display = document.getElementById("display");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.getElementById("save-btn");


tabBtn.addEventListener("click", () => { 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    } );
});

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

inputBtn.addEventListener("click", () => {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

function render(leads) {
  let listItem = " ";
  for (let i = 0; i < leads.length; i++) {
    // listItem +=  "<li> <a  tagret ='_blank' href='" +leads[i]+ "'>" + leads[i]+"</a> </li>"
    // representing above code in template strings to make it look simpler
    listItem += `
            <li> 
                <a  tagret ='_blank' href='${leads[i]}'>  
                ${leads[i]}
                </a> 
            </li>
        `;
  }
  display.innerHTML = listItem;
}
