import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");


form.addEventListener("submit", onFormSubmit);


function makePromise(delay, state) {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function onFormSubmit(event) {
    event.preventDefault();

    const { delay, state } = event.target.elements;
    const delayVal = Number(delay.value);

    makePromise(delayVal, state.value)
        .then((delay) => {
        iziToast.show({
      message: `✅ Fulfilled promise in ${delay}ms`,
    });
        })
        .catch((delay) => {
         iziToast.show({
      message: `❌ Rejected promise in ${delay}ms`,
    });
        })
};

