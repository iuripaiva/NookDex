function show(shown, hidden) {
  document.getElementById(shown).style.display = "block";
  document.getElementById(hidden).style.display = "none";
  return false;
}

const villagerId = document.querySelector(".villager__id");
const villagerName = document.querySelector(".villager__name");
const villagerNameTag = document.querySelector(".villager__nametag");
const villagerIcon = document.querySelector(".villager__icon");
const villagerPhoto = document.querySelector(".villager__image");
const villagerSaying = document.querySelector(".villager__saying");
const villagerPersonality = document.querySelector(".villager__personality");
const villagerHobby = document.querySelector(".villager__hobby");
const villagerBirthday = document.querySelector(".villager__birthday");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const fetchVillager = async () => {
  const APIResponse = await fetch(`https://acnhapi.com/v1a/villagers/`);

  const data = await APIResponse.json();

  for (let i = 0; i < data.length; i++) {
    if (isNaN(input.value)) {
      if (
        data[i]["name"]["name-USen"] == input.value ||
        data[i]["name"]["name-USen"].toLowerCase() == input.value ||
        data[i]["name"]["name-USen"].toUpperCase() == input.value
      ) {
        return data[i];
      }
    } else {
      if (data[i].id == input.value) {
        return data[i];
      }
    }
  }
};

const renderVillager = async () => {
  const data = await fetchVillager();

  if (data === undefined) {
    alert(
      "Villager not found. You must fill the text field with a valid villager name or ID."
    );
    show("Page1", "Page2");
    input.value = "";
  }

  if ((isNaN(input.value) && input.value.toUpperCase() == data["name"]["name-USen"].toUpperCase()) || input.value == data.id){
    villagerId.innerHTML = data.id;
    villagerName.innerHTML = data["name"]["name-USen"];
    villagerNameTag.innerHTML = data["name"]["name-USen"];
    villagerIcon.src = data.icon_uri;
    villagerPhoto.src = data.image_uri;
    villagerSaying.innerHTML = data.saying;
    document.getElementById("villager__text").style.color = data["text-color"];
    document.getElementById("villager__text").style.backgroundColor =
      data["bubble-color"];
    if (data.personality == "Uchi") {
      villagerPersonality.innerHTML = "Sisterly";
    } else {
      villagerPersonality.innerHTML = data.personality;
    }
    villagerHobby.innerHTML = data.hobby;
    villagerBirthday.innerHTML = data["birthday-string"];
    show("Page2", "Page1");
    input.value = "";
  } else if (isNaN(input.value) && input.value == data.id) {
    alert(
      "Villager not found.. You must fill the text field with a valid villager name or ID."
    );
    show("Page1", "Page2");
    input.value = "";
  }
};

input.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();
    renderVillager(input.value);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderVillager(input.value);
});
