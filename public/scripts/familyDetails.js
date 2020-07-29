const familyContainer = document.getElementsByClassName('family-container')[0];
const personContainer = document.getElementsByClassName('person-container')[0];
const topHeader = document.getElementsByClassName('top-header')[0];
const listByContainer = document.getElementsByClassName('list-form')[0];
let count = 0;

const topHeaderHeight = topHeader.offsetHeight;
listByContainer.style.top = `${topHeaderHeight}px`;

let openFamily = family_number => {
    if (count === 0) {
        count++;
        let family = document.getElementById(`family${family_number}`);

        if(screen.width < 1366) {
            family.style.width = "100vw";
        }
        else {
            familyContainer.style.flex = "1";
            familyContainer.style.transition = "0.5s";
            let personContainerWidth = (personContainer.offsetWidth)/2;
            family.style.width = `${personContainerWidth}px`;
        }
    }
}

let closeFamily = family_number => {
    if (count === 1) {
        count--;
        let family = document.getElementById(`family${family_number}`);

        if(screen.width < 1366) {
            family.style.width = "0vw";
        }
        else {
            let personContainerWidth = (personContainer.offsetWidth)*2;
            personContainer.style.width = `${personContainerWidth}px`;
            family.style.width = "0";
            familyContainer.style.flex = "0";
        }
    }
}
