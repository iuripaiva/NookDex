function show(shown, hidden) {
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
}

const villagerId = document.querySelector('.villager__id');
const villagerName = document.querySelector('.villager__name');
const villagerIcon = document.querySelector('.villager__icon');
const villagerPhoto = document.querySelector('.villager__image');
const villagerSaying = document.querySelector('.villager__saying');
const villagerPersonality = document.querySelector('.villager__personality');
const villagerHobby = document.querySelector('.villager__hobby');
const villagerBirthday = document.querySelector('.villager__birthday');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const fetchVillager = async () => {
    const APIResponse = await fetch(`https://acnhapi.com/v1a/villagers/`);
    
    const data = await APIResponse.json();

    for (let i = 0; i < data.length; i++){
        if (isNaN(input.value)){
            if (data[i]['name']['name-USen'] == input.value || data[i]['name']['name-USen'].toLowerCase() == input.value || data[i]['name']['name-USen'].toUpperCase() == input.value){
                return data[i];
            }
        } else {
            if (data[i].id == input.value){
                return data[i];
            }
        }
    }
}

const renderVillager = async function() {

    const data = await fetchVillager();

    villagerId.innerHTML = data.id;
    villagerName.innerHTML = data['name']['name-USen'];
    villagerIcon.src = data.icon_uri;
    villagerPhoto.src = data.image_uri;
    villagerSaying.innerHTML = data.saying;
    document.getElementById("villager__text").style.color = data['text-color'];
    document.getElementById("villager__text").style.backgroundColor = data['bubble-color'];
    villagerPersonality.innerHTML = data.personality;
    villagerHobby.innerHTML = data.hobby;
    villagerBirthday.innerHTML = data['birthday-string'];

}

input.onkeypress = function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        renderVillager(input.value);
        if (isNaN(input.value) || input.value != '' && input.value <= 391 && input.value >= 1 ){
            return show('Page2','Page1');
        } else {
            alert('You must fill the text field with a valid ID or villager name.');
        }
        
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderVillager(input.value);
    input.value = '';
    return show('Page2','Page1');
});