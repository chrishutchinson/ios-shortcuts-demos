import domtoimage from "dom-to-image";

const handlers = {
  trigger: () => {
    const selection = window.getSelection();
    const text = selection.toString();

    if (!text) return;

    const container = createOverlayContainer();

    drawImage(container, text);
  }
};

document
  .querySelectorAll("[data-onclick]")
  .forEach(t => t.addEventListener("click", handlers[t.dataset.onclick]));

const createOverlayContainer = () => {
  const container = document.createElement("div");

  container.style.cssText = `
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    z-index: 1000000;
  `;

  document.body.appendChild(container);

  return container;
};

const drawImage = (
  container,
  text,
  { width = 600, height = 300, padding = 20 } = {}
) => {
  const imageWrapper = document.createElement("div");
  imageWrapper.style.cssText = `
      width: ${width}px;
      min-height: ${height}px;
      margin: auto;
    `;
  container.appendChild(imageWrapper);

  const image = document.createElement("image");
  image.style.cssText = `
      width: 100%;
      height: 100%;
      background: #F8f8f8;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;
  imageWrapper.appendChild(image);

  const createElementWithTextAndStyles = (type, text, cssText) => {
    const element = document.createElement(type);
    element.innerText = text;
    element.style.cssText = cssText;

    return element;
  };

  // Header
  const header = createElementWithTextAndStyles(
    "header",
    null,
    `
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    `
  );

  // Quote mark
  const quoteMark = createElementWithTextAndStyles(
    "aside",
    "“",
    `
        font-size: 50px;
        margin: 0;
        color: red;
      `
  );
  header.appendChild(quoteMark);

  // Page title
  const pageTitle = createElementWithTextAndStyles(
    "aside",
    document.title,
    `
        font-size: 20px;
      `
  );
  header.appendChild(pageTitle);
  image.appendChild(header);

  // Text
  const quoteText = createElementWithTextAndStyles(
    "p",
    text,
    `
        margin: 0 0 10px;
        padding: 0;
        font-size: 16px;
        line-height: 22px;
      `
  );
  image.appendChild(quoteText);

  // Source
  const source = createElementWithTextAndStyles(
    "cite",
    `Via: ${window.location.href}`,
    `
      color: #6a6a6a;
      font-size: 12px;
    `
  );
  image.appendChild(source);

  domtoimage
    .toPng(image)
    .then(dataUrl => {
      const generatedImage = new Image();
      generatedImage.src = dataUrl;
      generatedImage.style.cssText = `
        margin: auto;
        height: auto;
      `;

      imageWrapper.remove();

      container.appendChild(generatedImage);
    })
    .catch(e => {
      alert(e.message);
    });
};

handlers.trigger();
