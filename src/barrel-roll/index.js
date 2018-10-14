const barrelRollStyleTag = document.createElement("style");

barrelRollStyleTag.innerText = `
  @keyframes roll {
    from { -webkit-transform: rotate(0deg) }
    to   { -webkit-transform: rotate(360deg) }
  }
    
  body {
    animation: roll 4s 1;
  }
`;

document.head.appendChild(barrelRollStyleTag);

completion();
