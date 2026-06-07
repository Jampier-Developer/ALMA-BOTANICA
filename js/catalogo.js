(function () {
  const params = new URLSearchParams(window.location.search);
  const name   = params.get('nombre') || '';
  const greet  = document.getElementById('greetingHi');

  if (name && greet) {
    const h = new Date().getHours();
    const prefix = h < 12 ? '¡Buenos días' : h < 18 ? '¡Buenas tardes' : '¡Buenas noches';
    greet.textContent = prefix + ', ' + name + '!';
  }
})();
