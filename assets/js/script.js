document.querySelectorAll(".links a").forEach((anchor) => {
     anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
               smoothScroll(targetElement);
          }
     });
});

function smoothScroll(target) {
     const targetPosition = target.getBoundingClientRect().top;
     const startPosition = window.pageYOffset;
     const distance = targetPosition - startPosition;
     const duration = 1000; // Durasi animasi dalam milidetik
     let start = null;

     function animationScroll(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animationScroll);
     }

     function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
     }

     requestAnimationFrame(animationScroll);
}

document.querySelectorAll(".left .item").forEach((item, index) => {
     item.addEventListener("click", () => {
          // Remove active class from all items
          document.querySelectorAll(".left .item .work-info h5").forEach((h5) => h5.classList.remove("active"));
          // Add active class to the clicked item
          item.querySelector(".work-info h5").classList.add("active");

          // Hide all details
          document.querySelectorAll(".right .item").forEach((detail) => (detail.style.display = "none"));
          // Show the details that correspond to the clicked item
          const matchingDetails = document.querySelectorAll('.right .item[id^="detail-' + index + '"]');
          matchingDetails.forEach((detail, i) => {
               detail.style.display = "block";
               if (i === 0) {
                    detail.style.gridColumn = "span 2";
               } else {
                    detail.style.gridColumn = "span 1";
               }
          });
     });
});

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

document.querySelector(".next").addEventListener("click", () => {
     slideIndex = (slideIndex + 1) % totalSlides;
     updateSlidePosition();
});

document.querySelector(".prev").addEventListener("click", () => {
     slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
     updateSlidePosition();
});

function updateSlidePosition() {
     const slider = document.querySelector(".slider");
     slider.style.transform = `translateX(-${slideIndex * 70}%)`;
}

// Get the button
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
     scrollFunction();
};

function scrollFunction() {
     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollToTopBtn.style.display = "block";
     } else {
          scrollToTopBtn.style.display = "none";
     }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", function () {
     smoothScrollToTop();
});

function smoothScrollToTop() {
     const duration = 1000;
     const startPosition = window.pageYOffset;
     const distance = -startPosition;
     let start = null;

     function animationScroll(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animationScroll);
     }

     function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
     }

     requestAnimationFrame(animationScroll);
}
