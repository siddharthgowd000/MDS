document.querySelector('.navbar-toggler').addEventListener('click', function() {
  document.querySelector('.collapse').classList.toggle('active');
});

function toggleNavbar() {
  var navbarContent = document.getElementById("navbarToggleExternalContent");
  navbarContent.classList.toggle("show");
}

window.addEventListener('scroll', function() {
  var navbarContent = document.getElementById("navbarToggleExternalContent");
  if (navbarContent.classList.contains("show")) {
      navbarContent.classList.remove("show");
  }
});

// Dynamically set the width of the collapsed content
function setCollapseWidth() {
  var toggleWidth = document.querySelector('.navbar-toggler').offsetWidth;
  document.querySelector('.collapse').style.width = toggleWidth * 4 + 'px'; // Assuming 25% of the page width
}

window.addEventListener('resize', function() {
  if (document.querySelector('.collapse').classList.contains('active')) {
      setCollapseWidth();
  }
});

// Initially set the width when the page loads
window.addEventListener('load', function() {
  setCollapseWidth();
});

document.getElementById('selectOption').addEventListener('change', function() {
  var selectedOption = this.value;
  var imageUploadBox = document.querySelector('.image-upload-box');
  var comingSoon = document.getElementById('comingSoon');
  
  if (selectedOption !== 'option1') {
      imageUploadBox.style.display = 'none';
      comingSoon.style.display = 'block';
  } else {
      imageUploadBox.style.display = 'block';
      comingSoon.style.display = 'none';
  }
});

const imageInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('imageContainer');

imageInput.addEventListener('change', function() {
  const file = imageInput.files[0];
  
  imageContainer.innerHTML = '';

  const uploadedImage = document.createElement('img');
  uploadedImage.alt = 'Uploaded Image';
  if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
          uploadedImage.src = e.target.result;
      }

      reader.readAsDataURL(file);
  } else {
      uploadedImage.src = 'placeholder.jpg'; 
  }
  imageContainer.appendChild(uploadedImage);
});

// Back to top function
function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show back to top button when not at the top of the page
window.addEventListener('scroll', function() {
  var backToTopButton = document.querySelector('.back-to-top');
  if (window.pageYOffset > 0) {
      backToTopButton.style.display = 'block';
  } else {
      backToTopButton.style.display = 'none';
  }
});
//