var link = document.querySelector(".button-hotels-search");

var popup = document.querySelector(".modal-hotels-search");

var form = popup.querySelector("form");
var dateArrival = popup.querySelector("[name=arrival-date]");
var dateDeparture = popup.querySelector("[name=departure-date]");
var adultsNumber = popup.querySelector("[name=adults-number]");
var childrenNumber = popup.querySelector("[name=children-number]");

var isStorageSupport = true;
var storageAdultsNumber = "";
var storageChildrenNumber = "";

try {
    storageAdultsNumber = localStorage.getItem("adultsNumber");
    storageChildrenNumber = localStorage.getItem("childrenNumber");
  } catch (err) {
    isStorageSupport = false;
  }
  if (storageAdultsNumber || storageChildrenNumber) {
      adultsNumber.value = storageAdultsNumber;
      childrenNumber.value = storageChildrenNumber;
  }

link.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (popup.classList.contains("modal-error")) {
    popup.classList.remove("modal-error");
    }
    if (popup.classList.contains("modal-open")) {
        popup.classList.remove("modal-open");
        popup.classList.add("modal-close");
    } else if (popup.classList.contains("modal-close")) {
        popup.classList.remove("modal-close");
        popup.classList.add("modal-open");

    }
});

form.addEventListener("submit", function (evt) {
    if (!dateArrival.value || !dateDeparture.value || !adultsNumber.value || !childrenNumber.value) {
        evt.preventDefault();
        popup.classList.remove("modal-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("modal-error");
        } else {
            if (isStorageSupport) {
                localStorage.setItem("adultsNumber", adultsNumber.value);
                localStorage.setItem("childrenNumber", childrenNumber.value);
            }
        }
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        if (!popup.classList.contains("modal-open")) {
            popup.classList.remove("modal-open");
            popup.classList.add("modal-close");
            popup.classList.remove("modal-error");
        }
    }
});
