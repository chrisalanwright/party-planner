const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2507";
const API = BASE + COHORT;

let parties = [];
let chosenParty;

async function getParties() {
  try {
    let response = await fetch(API + "/events");
    let result = await response.json();
    parties = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

async function getParty(id) {
  try {
    let response = await fetch(API + "/events/" + id);
    let result = await response.json();
    chosenParty = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

function PartyListItem(party) {
  let $li = document.createElement("li");

  if (party.id === chosenParty?.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">${party.name}</a>`;

  $li.addEventListener("click", () => getParty(party.id));

  return $li;
}

function PartyList() {
  let $ul = document.createElement("ul");
  parties.forEach((party) => {
    $ul.appendChild(PartyListItem(party));
  });
  return $ul;
}

function ChosenParty() {
  if (!chosenParty) {
    return document
      .createElement("p")
      .appendChild(document.createTextNode("Select a party to see details"));
  }

  let $div = document.createElement("div");
  $div.innerHTML = `
    <h3>${chosenParty.name}</h3>
    <p>Date:${chosenParty.date}</p>
    <p>Time: ${chosenParty.time}</p>
    <p>Location: ${chosenParty.location}</p>
    <p>Description: ${chosenParty.description}</p>
  `;
  return $div;
}

function render() {
  let $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="chosen">
        <h2>Details</h2>
        <ChosenParty></ChosenParty>
      </section>
    </main>
    `;

  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("ChosenParty").replaceWith(ChosenParty());
}

async function init() {
  await getParties();
  render();
}
init();
