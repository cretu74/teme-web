let currentIndex = 0;
let intervalID;

  function showImage(index) {
    let images = document.getElementsByClassName(`slider-image`);
    
    if (index >= images.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = images.length - 1;
    } else {
      currentIndex = index;
    }

    for (let i = 0; i < images.length; i++) {
      images[i].style.display = 'none';
    }

    images[currentIndex].style.display = 'block';
  }

  function nextImage() {
    showImage(currentIndex + 1);
  }

  function prevImage() {
    showImage(currentIndex - 1);
  }

  function startslider(interval)
  {
    intervalID= setInterval(nextImage,interval);
  }
 
  startslider(2000);
  