
  var mySwiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      centeredSlides: !0,
      pagination: ".swiper-pagination",
      paginationClickable: !0
    }),
    swiperWrap = document.getElementById("swiper-wrapper");
  swiperWrap.style.height = swiperWrap.offsetHeight + "px";
