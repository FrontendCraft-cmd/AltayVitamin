$(document).ready(function () {
  const body = $("body");

  // Header fixed
  const header = $(".header");

  let headerHeight = header.outerHeight();
  let heightWindow = $(window).height();
  let topPosition = $(window).scrollTop();
  function fixedHeader(top, heightWindow, headerHeight) {
    if (top > heightWindow) {
      header.addClass("fixed");
      body.css({
        "padding-top": headerHeight,
      });
    } else {
      header.removeClass("fixed");
      body.css({
        "padding-top": 0,
      });
    }
  }
  fixedHeader(topPosition, heightWindow, headerHeight);

  // Search
  const search = $(".header-search");
  const searchInput = $(".header-search__input");
  const searchOpenBtn = $(".header-search__open");
  const searchClose = $(".header-search__close");
  const searchClear = $(".header-search__clear");

  searchOpenBtn.click(function (e) {
    if (search.length > 0) {
      search.addClass("open");
    }
    e.preventDefault();
    e.stopPropagation();
  });

  searchClose.click(function (e) {
    if (searchInput.length > 0) {
      searchInput.val("");
      search.removeClass("open");
    }
  });

  searchClear.click(function (e) {
    if (searchInput.length > 0) {
      searchInput.val("");
      searchClear.removeClass("show");
    }
  });

  searchInput.on("input", function (e) {
    searchClear.addClass("show");
  });

  search.click(function (e) {
    e.stopPropagation();
  });

  // Catalog menu
  const headerNav = $(".header__nav");
  const catalogBtnOpen = $(".header-catalog__btn");
  const catalogBtnClose = $(".header-catalog__close");
  const catalogContent = $(".header-catalog__content");
  const catalogMenu = $(".header-catalog__menu");
  const catalogBottomList = $(".header-catalog__item");

  catalogBtnOpen.click(function (e) {
    if (catalogContent.length > 0 && headerNav.length > 0) {
      catalogContent.addClass("open");
      headerNav.addClass("hide");
      body.addClass("lock");
    }
    e.preventDefault();
    e.stopPropagation();
  });

  catalogBtnClose.click(function (e) {
    catalogContent.removeClass("open");
    headerNav.removeClass("hide");
    body.removeClass("lock");
    e.preventDefault();
  });

  catalogContent.click(function (e) {
    e.stopPropagation();
  });

  if (catalogMenu.length > 0) {
    catalogMenu.each(function (e) {
      const thisItem = $(this);
      const elementList = thisItem.find("ul li a");
      elementList.each(function () {
        const thisElement = $(this);
        const elementId = thisElement.attr("id");
        thisElement.hover(
          function () {
            catalogBottomList.removeClass("show");
            $("[data-id='" + elementId + "']").addClass("show");
          },
          function () {}
        );
      });
    });
  }

  // Header menu
  const burger = $(".header-burger");
  const headerMenu = $(".header-mobile");

  burger.click(function (e) {
    if (headerMenu.length > 0) {
      burger.toggleClass("active");
      headerMenu.toggleClass("open");
      body.toggleClass("lock");
    }
    e.preventDefault();
    e.stopPropagation();
  });

  // Footer logo
  const footerLogo = $(".footer-info__logo.first a");
  footerLogo.click(function (e) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
  });

  const clouds = $(".main-block__cloud .cloud");

  clouds.each(function (e) {
    const cloud = $(this);
    const direction = cloud.data("direction");

    gsap.to(cloud, {
      x: () => 200 * direction,
      y: () => -200,
      scrollTrigger: {
        trigger: cloud,
        start: "top bottom",
        scrub: true,
      },
    });
  });

  function showElementsInTop() {
    let thresholdSets = [];
    if ($(window).width() > 980) {
      var visibleDistance = "-100px";
    } else {
      var visibleDistance = "-50px";
    }
    for (let i = 0; i <= 1.0; i += 0.01) {
      thresholdSets.push(i);
    }
    let intersectionOptions = {
      root: null,
      rootMargin: visibleDistance,
      threshold: 0,
    };
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let el = entry.target;
          if (el.classList.contains("active-animation")) {
            return false;
          }
          el.classList.add("active-animation");

          let delay = $(el).index() + 1;
          if (delay % 3 == 0) {
            delay = 2;
          } else if (delay % 2 == 0) {
            delay = 1;
          } else {
            delay = 0;
          }
          if ($(window).width() < 660) {
            delay = 0;
          }
          gsap.fromTo(
            el,
            0.6,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              delay: 0.1 * delay,
            }
          );
        }
      });
    }, intersectionOptions);
    let containers = document.querySelectorAll(".animated-top");
    containers.forEach((container) => {
      observer.observe(container);
    });
  }

  showElementsInTop();

  // Tabs
  const pickingTabs = $(".picking__tabs li a");
  const pickingItems = $(".picking__item");

  pickingTabs.click(function (e) {
    e.preventDefault();

    const thisItem = $(this);
    const id = thisItem.attr("href").replace("#", "");
    const item = pickingItems.filter(`#${id}`);

    pickingTabs.removeClass("active");
    pickingItems.removeClass("active");
    thisItem.addClass("active");
    item.addClass("active");
  });

  const productDetailTabs = $(".product-detail-tabs__item");
  const productDetailItems = $(".product-detail__tab");

  productDetailTabs.click(function (e) {
    e.preventDefault();

    const thisItem = $(this);
    const id = thisItem.attr("href").replace("#", "");
    const item = productDetailItems.filter(`#${id}`);

    productDetailTabs.removeClass("active");
    productDetailItems.removeClass("active");
    thisItem.addClass("active");
    item.addClass("active");
  });

  const contactsTabs = $(".contacts__tab");
  const contactsItems = $(".contacts__item");

  contactsTabs.click(function (e) {
    e.preventDefault();

    const thisItem = $(this);
    const id = thisItem.attr("href").replace("#", "");
    const item = contactsItems.filter(`#${id}`);

    contactsTabs.removeClass("active");
    contactsItems.removeClass("active");
    thisItem.addClass("active");
    item.addClass("active");
  });

  // Picking height
  const pickingItem = $(".picking__item");
  const pickingRow = $(".picking__items");

  function setHeightPicking() {
    let pickingHeight = 0;

    pickingItem.css("display", "grid");
    pickingItem.each(function () {
      const thisItem = $(this);
      const height = thisItem.outerHeight();

      if (height > pickingHeight) {
        pickingHeight = height;
      }
    });
    pickingItem.css("display", "none");

    pickingRow.css({ "min-height": pickingHeight + 40 });
  }
  if (pickingItem.length > 0) {
    setHeightPicking();
    $(window).resize(setHeightPicking);
  }

  // Where-buy
  const whereBuyTypeOne = $(".where-buy.type-1");

  if (whereBuyTypeOne.length > 0) {
    const items = whereBuyTypeOne.find(".where-buy__item");
    const btn = $(".where-buy__btn a");
    const btnText = btn.text();
    const btnTextNew = "Скрыть";

    let isItemMoved = false;

    if (items.length > 5) {
      items
        .slice(0, 5)
        .wrapAll(
          '<div class="where-buy__top"><div class="grid-box"></div></div>'
        );
      items
        .slice(5)
        .wrapAll(
          '<div class="where-buy__body"><div class="grid-box"></div></div>'
        );

      btn.click(function (e) {
        whereBuyTypeOne.find(".where-buy__body").slideToggle();
        btn.text(btn.text() === btnText ? btnTextNew : btnText);
        e.preventDefault();
      });

      function rearrangeItems() {
        if ($(window).width() <= 991.98 && !isItemMoved) {
          $(
            ".where-buy.type-1 .where-buy__top .grid-box .where-buy__item:nth-child(5)"
          ).appendTo(".where-buy.type-1 .where-buy__body .grid-box");
          isItemMoved = true;
        } else if ($(window).width() > 991.98 && isItemMoved) {
          $(
            ".where-buy.type-1 .where-buy__body .grid-box .where-buy__item:nth-child(1)"
          ).prependTo(".where-buy.type-1 .where-buy__top .grid-box");
          isItemMoved = false;
        }
      }

      rearrangeItems();

      $(window).resize(function () {
        rearrangeItems();
      });
    } else {
      whereBuyTypeOne.find(".where-buy__row").addClass("row-one");
      btn.hide();
    }
  }

  const whereBuyTypeTwo = $(".where-buy.type-2");

  if (whereBuyTypeTwo.length > 0) {
    const items = whereBuyTypeTwo.find(".where-buy__item");
    const btn = $(".where-buy__btn a");
    const btnText = btn.text();
    const btnTextNew = "Скрыть";

    let isItemMoved = false;

    if (items.length > 3) {
      items
        .slice(0, 3)
        .wrapAll(
          '<div class="where-buy__top"><div class="grid-box"></div></div>'
        );
      items
        .slice(3)
        .wrapAll(
          '<div class="where-buy__body"><div class="grid-box"></div></div>'
        );

      btn.click(function (e) {
        whereBuyTypeTwo.find(".where-buy__body").slideToggle();
        btn.text(btn.text() === btnText ? btnTextNew : btnText);
        e.preventDefault();
      });

      function rearrangeItems() {
        if ($(window).width() <= 767.98 && !isItemMoved) {
          $(
            ".where-buy.type-2 .where-buy__body .grid-box .where-buy__item:nth-child(1)"
          ).prependTo(".where-buy.type-2 .where-buy__top .grid-box");
          isItemMoved = true;
        } else if ($(window).width() > 767.98 && isItemMoved) {
          $(
            ".where-buy.type-2 .where-buy__top .grid-box .where-buy__item:nth-child(4)"
          ).appendTo(".where-buy.type-2 .where-buy__body .grid-box");
          isItemMoved = false;
        }
      }

      rearrangeItems();

      $(window).resize(function () {
        rearrangeItems();
      });
    } else {
      whereBuyTypeTwo.find(".where-buy__row").addClass("row-one");
      btn.hide();
    }
  }

  // Filter
  const filterTitle = $(".bx-filter-parameters-box-title");

  filterTitle.click(function (e) {
    const thisItem = $(this);
    const parent = thisItem.parent(".bx-filter-parameters-box");

    parent.toggleClass("bx-active");
    thisItem.next().slideToggle();
  });

  const catalogTitle = $(".catalog__top .catalog__title");
  catalogTitle.click(function (e) {
    $("body").addClass("lock");
    $(".catalog__filter").addClass("open");
    e.stopPropagation();
  });
  $(".catalog__close").click(function (e) {
    $("body").removeClass("lock");
    $(".catalog__filter").removeClass("open");
    e.preventDefault();
    e.stopPropagation();
  });
  $(".catalog__filter").click(function (e) {
    e.stopPropagation();
  });

  function setFilterHeight() {
    const filteBlock = $(".bx-filter-block");

    $(".show-more-button").remove();
    filteBlock.css({ "max-height": "" });

    if (filteBlock.length > 0 && $(window).width() <= 991.98) {
      filteBlock.each(function () {
        const thisItem = $(this);
        const elements = thisItem.find(".filter-checkbox");

        if (elements.length > 3) {
          const showMoreButton = $(
            "<div class='show-more-button'>Показать ещё</div>"
          );
          let maxHeight = 0;
          let height = 0;
          elements.each(function (e) {
            const thisElement = $(this);
            maxHeight += thisElement.outerHeight();
            if (e < 3) {
              height += thisElement.outerHeight();
            }
          });
          thisItem.css({ "max-height": height });
          thisItem.after(showMoreButton);

          showMoreButton.click(function () {
            $(this).toggleClass("active");
            $(this).text(
              $(this).text() === "Показать ещё" ? "Скрыть" : "Показать ещё"
            );
            thisItem.css({
              "max-height": $(this).hasClass("active") ? maxHeight : height,
            });
          });
        }
      });
    }
  }
  setFilterHeight();
  $(window).resize(setFilterHeight);

  // Sort
  const catalogSortTitle = $(".catalog-sort__title");
  const catalogBg = $(".catalog-bg");

  catalogSortTitle.click(function (e) {
    $(this).addClass("active");
    $(".catalog-sort__list").addClass("active");
    catalogBg.addClass("active");
    $("body").addClass("lock");
    e.stopPropagation();
  });

  catalogBg.click(function (e) {
    $(this).removeClass("active");
    catalogSortTitle.removeClass("active");
    $(".catalog-sort__list").removeClass("active");
    $("body").removeClass("lock");
    e.stopPropagation();
  });

  $(".catalog-sort__list").click(function (e) {
    e.stopPropagation();
  });

  // Product-detail
  $(".product-detail-tabs__buy").click(function (e) {
    const whereBuy = $(".where-buy.type-2");
    const headerHeight = $(".header").outerHeight();
    $("body,html").animate(
      { scrollTop: whereBuy.offset().top - headerHeight },
      500,
      function () {}
    );
    e.preventDefault();
  });

  $(".product-detail__buttons .button-gold").click(function (e) {
    const whereBuy = $(".where-buy.type-2");
    const headerHeight = $(".header").outerHeight();
    $("body,html").animate(
      { scrollTop: whereBuy.offset().top - headerHeight },
      500,
      function () {}
    );
    e.preventDefault();
  });

  const productDetailReviewsItem = $(".product-detail-reviews__item");
  const productDetailReviewsBtn = $(".product-detail-reviews__btn");

  if (productDetailReviewsItem.length > 2) {
    productDetailReviewsItem
      .slice(0, 2)
      .wrapAll('<div class="product-detail-reviews__head"></div>');
    productDetailReviewsItem
      .slice(2)
      .wrapAll('<div class="product-detail-reviews__body"></div>');
    productDetailReviewsBtn.find("a").click(function (e) {
      const text = $(this).text();
      const newText = "Скрыть";
      $(".product-detail-reviews__body").slideToggle();
      $(this).text($(this).text() === text ? newText : text);
      e.preventDefault();
    });
  } else {
    productDetailReviewsBtn.hide();
  }

  productDetailReviewsItem.each(function () {
    const thisItem = $(this);
    const blockText = thisItem.find(".product-detail-reviews__text");
    const text = blockText.text();
    const btn = thisItem.find(".product-detail-reviews__more");
    const btnText = btn.text();
    const btnTextNew = "Скрыть";

    let newText = text;
    let maxLength = 850;

    if (text.length > maxLength) {
      newText = text.substring(0, maxLength).trim() + "...";
      blockText.text(newText);
      btn.click(function () {
        blockText.text(blockText.text() === newText ? text : newText);
        btn.text(btn.text() === btnText ? btnTextNew : btnText);
      });
    } else {
      btn.hide();
    }
  });

  // Modal
  const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
  });

  // Rating
  $('.stars-review input[type="radio"]').on("change", function () {
    let rating = $(this).val();
    $(".stars-review-info .stars-review-item").fadeOut();
    $(
      '.stars-review-info .stars-review-item[data-rating="' + rating + '"]'
    ).fadeIn();
  });

  // Spoiler
  $(".faq__title").click(function (event) {
    const parent = $(this).closest(".faq__item");

    if (!$(".faq").hasClass("no-one")) {
      $(".faq__body").not($(this).next()).slideUp(300);
    }
    $(this).next().slideToggle(300);
    parent.find(".faq__btn").toggleClass("active");
  });

  $(".faq__btn").click(function (event) {
    const parent = $(this).closest(".faq__item");
    const body = parent.find(".faq__body");

    if (!$(".faq").hasClass("no-one")) {
      $(".faq__btn").not($(this)).removeClass("active");
      $(".faq__body").not(body).slideUp(300);
    }

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      body.slideUp(300);
    } else {
      $(this).addClass("active");
      body.slideDown(300);
    }
  });

  // Slider
  $(".main-block__slider").slick({
    fade: true,
    cssEase: "linear",
  });

  const mainBlock = $(".main-block");
  const marginBottom = 150;
  const marginBottomMobile = 60;
  let mainBlockContentHeight = $(".main-block__content").outerHeight();

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  function setScoopMainBlock() {
    if (
      mainBlock.length > 0 &&
      mainBlockContentHeight > 0 &&
      $(window).width() <= 767.98
    ) {
      mainBlockContentHeight = $(".main-block__content").outerHeight();
      mainBlock.css({
        "margin-bottom": mainBlockContentHeight + marginBottomMobile + 44,
      });
    } else {
      mainBlock.css({
        "margin-bottom": marginBottom,
      });
    }
  }

  const debouncedSetScoopMainBlock = debounce(setScoopMainBlock, 100);

  setScoopMainBlock();
  $(window).resize(debouncedSetScoopMainBlock);

  const instructionsSlider = $(".instructions-slider");
  instructionsSlider.on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      $(".instructions__cloud").toggleClass("active");
      $(".instructions__branch").toggleClass("active");
    }
  );
  instructionsSlider.slick({
    fade: true,
    cssEase: "linear",
    arrows: false,
    asNavFor: ".instructions-slider-small",
    responsive: [
      {
        breakpoint: 991.98,
        settings: {
          infinite: false,
        },
      },
    ],
  });
  $(".instructions-slider-small").slick({
    asNavFor: ".instructions-slider",
    variableWidth: true,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 991.98,
        settings: {
          infinite: false,
        },
      },
    ],
  });

  $(".story-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    asNavFor: ".story-slider-small",
    responsive: [
      {
        breakpoint: 900,
        settings: {
          variableWidth: false,
        },
      },
    ],
  });
  $(".story-slider-small").slick({
    asNavFor: ".story-slider",
    variableWidth: true,
    arrows: false,
    focusOnSelect: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          infinite: true,
        },
      },
    ],
  });

  $(".product-detail-slider").slick({
    asNavFor: ".product-detail-slider-small",
    responsive: [
      {
        breakpoint: 767.98,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });
  $(".product-detail-slider-small").slick({
    asNavFor: ".product-detail-slider",
    variableWidth: true,
    arrows: false,
    focusOnSelect: true,
  });

  $(".news-detail__slider").slick({
    slidesToShow: $(".news-detail__slide").length < 2 ? 1 : 2,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".news-other__slider").slick({
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          variableWidth: true,
        },
      },
    ],
  });

  body.click(function (e) {
    if (e.target != search || e.target != searchOpenBtn) {
      search.removeClass("open");
    }
    if (
      e.target != catalogContent ||
      e.target != catalogBtnOpen ||
      e.target != burger ||
      e.target != catalogSortTitle ||
      e.target != catalogBg
    ) {
      catalogContent.removeClass("open");
      headerNav.removeClass("hide");
      body.removeClass("lock");
    }
  });

  $(window).scroll(function () {
    headerHeight = header.outerHeight();
    heightWindow = $(window).height();
    topPosition = $(window).scrollTop();
    fixedHeader(topPosition, heightWindow, headerHeight);
  });

  let productDetailInfo = $(".product-detail-info__wpapper");
  if (productDetailInfo.length) {
    let stickyEl = new Sticksy(".product-detail-info__wpapper", {
      topSpacing: 170,
    });
  }

  $(".product-detail-tabs__item").click(function (e) {
    e.preventDefault();
    const $target = $(this);
    $(".product-detail-tabs").animate(
      {
        scrollLeft:
          $target.position().left + $(".product-detail-tabs").scrollLeft() - 10,
      },
      600
    );
  });
  $(".contacts__tab").click(function (e) {
    e.preventDefault();
    const $target = $(this);
    $(".contacts__header").animate(
      {
        scrollLeft:
          $target.position().left + $(".contacts__header").scrollLeft() - 10,
      },
      600
    );
  });

  // Gsap
  gsap.fromTo(
    "#footerDecor",
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: "#footerDecor",
        start: "top 100%",
        end: "top 50%",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    "#hitsNewDecor",
    {
      opacity: 0,
      x: 50,
    },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: "#hitsNewDecor",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    }
  );
});
