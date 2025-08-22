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
