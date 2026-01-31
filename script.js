document.addEventListener("DOMContentLoaded", function () {
  const maVideo = document.getElementById("bgVideo");
  const btnSon = document.getElementById("soundBtn");

  if (btnSon && maVideo) {
    btnSon.addEventListener("click", function () {
      const icone = btnSon.querySelector("i");

      if (maVideo.muted) {
        maVideo.muted = false;
        icone.classList.replace("fa-volume-xmark", "fa-volume-high");
      } else {
        maVideo.muted = true;
        icone.classList.replace("fa-volume-high", "fa-volume-xmark");
      }
    });
  }

  const carrousel = document.querySelector(".product-row");
  const btnGauche = document.querySelector(".nav-btn.prev");
  const btnDroite = document.querySelector(".nav-btn.next");
  let enTransition = false;

  if (carrousel) {
    btnDroite.addEventListener("click", function () {
      if (enTransition) return;
      enTransition = true;

      const largeurCarte = carrousel.querySelector(".card").offsetWidth + 30;
      carrousel.style.transition = "transform 0.5s ease-in-out";
      carrousel.style.transform = `translateX(-${largeurCarte}px)`;

      setTimeout(() => {
        carrousel.appendChild(carrousel.firstElementChild);
        carrousel.style.transition = "none";
        carrousel.style.transform = "translateX(0)";
        setTimeout(() => {
          enTransition = false;
        }, 50);
      }, 500);
    });

    btnGauche.addEventListener("click", function () {
      if (enTransition) return;
      enTransition = true;

      const largeurCarte = carrousel.querySelector(".card").offsetWidth + 30;

      carrousel.style.transition = "none";
      carrousel.prepend(carrousel.lastElementChild);
      carrousel.style.transform = `translateX(-${largeurCarte}px)`;

      setTimeout(() => {
        carrousel.style.transition = "transform 0.5s ease-in-out";
        carrousel.style.transform = "translateX(0)";
        setTimeout(() => {
          enTransition = false;
        }, 50);
      }, 50);
    });
  }

  const checkBoxes = document.querySelectorAll(".filter-checkbox");
  const produits = document.querySelectorAll(".product-item");
  const selectTri = document.getElementById("sort-select");
  const grid = document.getElementById("catalogue-grid");
  const btnReset = document.getElementById("reset-btn");

  if (grid) {
    function filtrer() {
      const themes = Array.from(checkBoxes)
        .filter((b) => b.checked && b.dataset.type === "category")
        .map((b) => b.value);
      const prix = Array.from(checkBoxes)
        .filter((b) => b.checked && b.dataset.type === "price")
        .map((b) => b.value);
      let compteur = 0;

      produits.forEach((prod) => {
        const catProd = prod.dataset.category;
        const prixProd = parseFloat(prod.dataset.price);

        const okTheme = themes.length === 0 || themes.includes(catProd);

        let okPrix = prix.length === 0;
        if (!okPrix) {
          if (prix.includes("small") && prixProd < 50) okPrix = true;
          if (prix.includes("medium") && prixProd >= 50 && prixProd <= 150)
            okPrix = true;
          if (prix.includes("large") && prixProd > 150) okPrix = true;
        }

        if (okTheme && okPrix) {
          prod.style.display = "flex";
          compteur++;
        } else {
          prod.style.display = "none";
        }
      });

      document.getElementById("product-count").innerHTML =
        `<strong>${compteur}</strong> produits trouvés`;
    }

    function trier() {
      const ordre = selectTri.value;
      const liste = Array.from(produits);

      liste.sort((a, b) => {
        const pa = parseFloat(a.dataset.price);
        const pb = parseFloat(b.dataset.price);
        if (ordre === "prix-croissant") return pa - pb;
        if (ordre === "prix-decroissant") return pb - pa;
        return 0;
      });

      liste.forEach((elt) => grid.appendChild(elt));
    }

    checkBoxes.forEach((box) => box.addEventListener("change", filtrer));
    if (selectTri) selectTri.addEventListener("change", trier);

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        checkBoxes.forEach((b) => (b.checked = false));
        selectTri.value = "defaut";
        filtrer();
      });
    }
  }

  const storeCards = document.querySelectorAll(".store-trigger");
  const listeVue = document.getElementById("boutique-list-view");
  const detailVue = document.getElementById("boutique-detail-view");
  const retourBtn = document.getElementById("back-btn");

  if (storeCards.length > 0) {
    storeCards.forEach((card) => {
      card.addEventListener("click", function () {
        const cible = document.getElementById(this.dataset.target);
        if (cible) {
          listeVue.style.display = "none";
          detailVue.style.display = "block";
          document
            .querySelectorAll(".single-store-detail")
            .forEach((d) => (d.style.display = "none"));
          cible.style.display = "block";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });

    if (retourBtn) {
      retourBtn.addEventListener("click", () => {
        detailVue.style.display = "none";
        listeVue.style.display = "flex";
      });
    }
  }

  const slides = document.querySelectorAll(".lego-slide");
  const points = document.querySelectorAll(".progress-pill");

  if (slides.length > 0) {
    let index = 0;

    setInterval(() => {
      slides[index].classList.remove("active");
      points[index].classList.remove("active");

      index = (index + 1) % slides.length;

      slides[index].classList.add("active");
      points[index].classList.add("active");
    }, 5000);
  }
});
