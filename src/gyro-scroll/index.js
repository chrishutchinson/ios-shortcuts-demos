const handleOrientation = event => {
  const x = event.beta; // In degree in the range [-180,180]

  if (x < 40 && x > 20) return;

  if (x > 40 && x <= 60) {
    window.scrollBy(0, 1);
  } else if (x > 60) {
    window.scrollBy(0, 2);
  } else {
    window.scrollBy(0, -1);
  }
};

window.addEventListener("deviceorientation", handleOrientation);
