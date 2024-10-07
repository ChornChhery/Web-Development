const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

// let i = 0;
// let fuck = 2;
// for (i = 0; i < fuck; i++) {
//   // use an existing variable
//   alert(
//     "You can do but please don't copy respect I spent my time a lot to create this"
//   );
//   alert("You can ask me what you want to know");
// }

// alert(i);
