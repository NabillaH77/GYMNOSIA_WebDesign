document.addEventListener('DOMContentLoaded', function() {
    // Service box animation
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.querySelector('.service-content').style.height = '200px';
            this.querySelector('p').style.display = 'block';
        });

        box.addEventListener('mouseleave', function() {
            this.querySelector('.service-content').style.height = '100px';
            this.querySelector('p').style.display = 'none';
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Check if it's an internal link (starts with '#')
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

let currentSlide = 0;
let slideWidth; // Deklarasi slideWidth secara global
const slides = document.querySelectorAll('.carousel-slide img'); // Select all images in the carousel
const totalSlides = slides.length;

function showSlide(index) {
    const carouselSlide = document.querySelector('.carousel-slide');
    // Move the slide container to show the appropriate slide by translating it
    carouselSlide.style.transform = `translateX(${-index * slideWidth}px)`;
}

function nextSlide() {
    // Increment slide index, and loop back to the first slide if it's the last slide
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Set initial slide width based on current viewport size
function updateSlideWidth() {
    slideWidth = slides[0].clientWidth;
}

// Ensure the carousel resizes properly if the window is resized
window.addEventListener('resize', () => {
    updateSlideWidth(); // Update slide width dynamically if window is resized
    showSlide(currentSlide); // Ensure current slide is correctly displayed
});

// Initially set slide width and show the first slide
updateSlideWidth();
showSlide(currentSlide);

// Automatically change the slide every 3 seconds
setInterval(nextSlide, 3000);

window.addEventListener('load', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    
    // Add the 'active' class to trigger the fade-in animation
    setTimeout(() => {
        carouselContainer.classList.add('active');
    }, 500); // Optional delay of 0.5 seconds before showing the carousel
});

// Get the modal
var modal = document.getElementById("bookingModal");

// Get the button that opens the modal
var moreInfoButtons = document.querySelectorAll(".more-info");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Add event listeners to all "More info" buttons
moreInfoButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    var type = this.innerText; // Get the text of the button as booking type
    document.getElementById("type").value = type; // Set booking type in the form

    modal.style.display = "block"; // Show modal
  });
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
    const hoursSelect = document.getElementById("hours");
    const facilitiesCheckboxes = document.querySelectorAll("#facilities input[type=checkbox]");
    const totalPriceElement = document.getElementById("totalPrice");

    // Set harga per jam
    const pricePerHour = 75000; // Harga per jam adalah IDR 75.000

    // Set harga untuk fasilitas tambahan (dalam IDR)
    const facilityPrices = {
      WiFi: 10000,
      Locker: 5000,
      Refreshments: 20000
    };

    // Fungsi untuk memformat harga dalam IDR
    function formatIDR(number) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    }

    // Fungsi untuk menghitung total harga
    function calculateTotalPrice() {
      let hours = parseInt(hoursSelect.value);
      let facilitiesPrice = 0;

      // Hitung total harga fasilitas yang dipilih
      facilitiesCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          facilitiesPrice += facilityPrices[checkbox.value];
        }
      });

      // Total harga = harga per jam * jumlah jam + harga fasilitas tambahan
      const totalPrice = (hours * pricePerHour) + facilitiesPrice;

      // Tampilkan total harga dalam format IDR
      totalPriceElement.textContent = formatIDR(totalPrice);
    }

    // Tambahkan event listener untuk perubahan di dropdown "hours" dan checkbox "facilities"
    hoursSelect.addEventListener("change", calculateTotalPrice);
    facilitiesCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", calculateTotalPrice);
    });

    // Inisialisasi dengan perhitungan awal
    calculateTotalPrice();
});

// Logic for booking form submission and popup behavior
document.addEventListener("DOMContentLoaded", function() {
  const bookingForm = document.getElementById("bookingForm");
  const successPopup = document.getElementById("successPopup");
  const receiptPopup = document.getElementById("receiptPopup");
  const showReceiptBtn = document.getElementById("showReceiptBtn");
  const closeReceiptBtn = document.getElementById("closeReceiptBtn");
  const receiptDetails = document.getElementById("receiptDetails");

  // Function to handle form submission
  bookingForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Hide the booking form modal
    modal.style.display = "none"; // Ensure the modal is hidden

    // Show success popup
    successPopup.style.display = "flex";
  });

  // Show receipt popup after clicking "Show Receipt"
  showReceiptBtn.addEventListener("click", function() {
    successPopup.style.display = "none"; // Hide success popup
    receiptPopup.style.display = "flex"; // Show receipt popup

    // Generate receipt details from form inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const hours = document.getElementById("hours").value;
    const payment = document.getElementById("payment").value;
    let facilities = [];
    document.querySelectorAll("#facilities input[type=checkbox]:checked").forEach(function(checkbox) {
      facilities.push(checkbox.value);
    });
    const totalPrice = document.getElementById("totalPrice").textContent;

    // Create receipt list items, ensure totalPrice is displayed in IDR format
    receiptDetails.innerHTML = `
      <strong>Name:</strong> ${name}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Phone:</strong> ${phone}<br>
      <strong>Hours:</strong> ${hours}<br>
      <strong>Payment:</strong> ${payment}<br>
      <strong>Facilities:</strong> ${facilities.join(", ")}<br>
      <strong>Total Price:</strong> ${totalPrice} <!-- Already formatted in IDR -->
    `;
  });

  // Close receipt popup
  closeReceiptBtn.addEventListener("click", function() {
    receiptPopup.style.display = "none";
  });
});

