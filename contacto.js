
document.getElementById('formContacto').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('mensajeConfirmacion').classList.remove('hidden');
  this.reset();
});
