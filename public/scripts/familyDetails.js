let openFamily = function (family_number) {
    let family = document.getElementById(`family${family_number}`);
    family.style.width = "100vw";
}

let closeFamily = function (family_number) {
    let family = document.getElementById(`family${family_number}`);
    family.style.width = "0";
}
