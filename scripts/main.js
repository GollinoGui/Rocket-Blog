document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = +el.dataset.value;
    let count = 0;
    const step = Math.ceil(target / 120); // animação mais lenta

    const update = () => {
      count += step;
      if (count >= target) {
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = count.toLocaleString();
        requestAnimationFrame(update);
      }
    };

    update();
  });
});