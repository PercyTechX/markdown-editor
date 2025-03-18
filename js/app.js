/**
 * Variables para obtener elementos HTML
 */
const generateHtml = document.querySelector("#generate-html");
const markdownInput = document.querySelector("#markdown-input");
const previewSection = document.querySelector("#preview-section");

/**
 * Función para obtener el texto del textarea
 */
function getTextFromTextArea() {
  return markdownInput.value;
}

/**
 * Función para convertir encabezados Markdown a HTML
 */
function convertHeadings(html) {
  // # Título -> <h1>Título</h1>
  html = html.replace(/^# (.+)$/gm, "<h1 class='text-4xl font-bold mb-4'>$1</h1>");
  // ## Título -> <h2>Título</h2>
  html = html.replace(/^## (.+)$/gm, "<h2 class='text-3xl font-bold mb-4'>$1</h2>");
  // ### Título -> <h3>Título</h3>
  html = html.replace(/^### (.+)$/gm, "<h3 class='text-2xl font-bold mb-4'>$1</h3>");
  // #### Título -> <h4>Título</h4>
  html = html.replace(/^#### (.+)$/gm, "<h4 class='text-xl font-bold mb-4'>$1</h4>");
  // ##### Título -> <h5>Título</h5>
  html = html.replace(/^##### (.+)$/gm, "<h5 class='text-lg font-bold mb-4'>$1</h5>");
  // ###### Título -> <h6>Título</h6>
  html = html.replace(/^###### (.+)$/gm, "<h6 class='text-base font-bold mb-4'>$1</h6>");

  return html;
}

/**
 * Función para convertir listas Markdown a HTML
 */
function convertLists(html) {
  // Listas no ordenadas (con - o *)
  html = html.replace(/^-\s(.+)$/gm, "<li class='ml-4'>$1</li>");
  html = html.replace(/^\*\s(.+)$/gm, "<li class='ml-4'>$1</li>");

  // Agrupar elementos de lista dentro de <ul>
  html = html.replace(/(<li class='ml-4'>.+<\/li>)/g, "<ul class='list-disc ml-8 mb-4'>$1</ul>");

  return html;
}

/**
 * Función para convertir texto Markdown a HTML
 */
function convertToHtml(text) {
  let html = text;

  // Convertir encabezados
  html = convertHeadings(html);

  // Convertir listas
  html = convertLists(html);

  return html;
}

/**
 * Función para renderizar el HTML en la sección de vista previa
 */
function renderPreview(html) {
  previewSection.innerHTML = html;
}

/**
 * Evento para generar la vista previa al hacer clic en el botón
 */
generateHtml.addEventListener("click", function () {
  // Obtener el texto del textarea
  const text = getTextFromTextArea();

  // Convertir el texto Markdown a HTML
  const html = convertToHtml(text);

  // Mostrar el HTML en la sección de vista previa
  renderPreview(html);
});