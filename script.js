// script.js - Carousel com loop infinito + autoplay suave

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".btn.prev");
  const nextBtn = document.querySelector(".btn.next");

  if (!track || !prevBtn || !nextBtn) return;

  let images = Array.from(track.children);
  let isTransitioning = false;

  // Duplica as imagens no início e no final para criar o loop infinito
  function duplicateImages() {
    const firstClone = images.map((img) => img.cloneNode(true));
    const lastClone = images.map((img) => img.cloneNode(true));

    // Adiciona clones no final
    firstClone.forEach((clone) => track.appendChild(clone));

    // Adiciona clones no início (reverso para ficar correto)
    lastClone.reverse().forEach((clone) => track.prepend(clone));
  }

  duplicateImages();

  // Atualiza a lista de imagens após duplicar
  images = Array.from(track.children);

  const slideWidth = images[0].getBoundingClientRect().width + 25; // 25px = gap
  let currentIndex = images.length / 3; // Começa depois dos clones iniciais

  // Posiciona no início real (depois dos clones)
  track.style.transition = "none";
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Função para ir para o próximo slide
  function goToNext() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex++;
    track.style.transition = "transform 0.7s cubic-bezier(0.32, 0.72, 0, 1)";
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Função para ir para o slide anterior
  function goToPrev() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex--;
    track.style.transition = "transform 0.7s cubic-bezier(0.32, 0.72, 0, 1)";
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Reset infinito quando chega no clone
  track.addEventListener("transitionend", () => {
    isTransitioning = false;

    // Se chegou no final (clones do início)
    if (currentIndex >= images.length - images.length / 3) {
      currentIndex = images.length / 3;
      track.style.transition = "none";
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Se chegou no começo (clones do final)
    if (currentIndex < images.length / 3) {
      currentIndex = images.length - images.length / 3 - 1;
      track.style.transition = "none";
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  });

  // Botões
  nextBtn.addEventListener("click", goToNext);
  prevBtn.addEventListener("click", goToPrev);

  // Autoplay (muda a cada 4 segundos)
  let autoplay = setInterval(goToNext, 4000);

  // Pausa o autoplay quando o mouse estiver em cima
  const carousel = document.querySelector(".carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoplay));
  carousel.addEventListener("mouseleave", () => {
    autoplay = setInterval(goToNext, 4000);
  });

  // Suporte a teclado (setas esquerda/direita)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
  });
});
