const trafficLight = document.getElementById("trafficLight");
const goBtn = document.getElementById("goBtn");

const crosswalk = {
  modal: document.getElementById("modal"),
  closeBtn: document.getElementById("closeBtn"),
  directionForm: document.getElementById("directionForm"),
  stripes: document.querySelectorAll(".stripe.white"),
  zebra: document.querySelector(".zebra"),
  greenLight: document.querySelector("#green"),

  submitDirection(e) {
    e.preventDefault();
    const formData = new FormData(this.directionForm);
    const direction = formData.get("direction");
    this.stripes.forEach(stripe => {
      stripe.style.backgroundImage = `url('img/pagerr.png')`;
      stripe.style.backgroundSize = "contain";
      stripe.style.backgroundRepeat = "no-repeat";
      stripe.style.backgroundPosition = "center";
      stripe.style.transform = direction === "down" ? "rotate(180deg)" : "rotate(0deg)";
    });
    this.closeModal();
  },

  checkAccess() {
    if (this.greenLight.classList.contains("active")) {
      this.openModal();
    } else {
      let toggleInterval = setInterval(() => {
        this.zebra.classList.toggle("red");
      }, 300);
      setTimeout(() => {
        clearInterval(toggleInterval);
        this.zebra.classList.remove("red");
      }, 2000);
    }
  },

  openModal() {
    this.modal.style.display = "flex";
  },

  closeModal() {
    this.modal.style.display = "none";
  },
};

function changeTheLight(e) {
  const target = e.target;
  if (!target.classList.contains("light")) return;
  target.classList.add("active");
  if (target.previousElementSibling) {
    target.previousElementSibling.classList.remove("active");
  } else if (target.nextElementSibling) {
    target.nextElementSibling.classList.remove("active");
  }
}

trafficLight.addEventListener("click", changeTheLight);
goBtn.addEventListener("click", () => crosswalk.checkAccess());
crosswalk.closeBtn.addEventListener("click", () => crosswalk.closeModal());
crosswalk.directionForm.addEventListener("submit", (e) => crosswalk.submitDirection(e));
window.addEventListener("click", (e) => {
  if (e.target === crosswalk.modal) crosswalk.closeModal();
});
