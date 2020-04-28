let familyContainer = document.getElementsByClassName('family-container')[0];
let personContainer = document.getElementsByClassName('person-container')[0];
let count = 0;

let openFamily = function (family_number) {
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

let closeFamily = function (family_number) {
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
