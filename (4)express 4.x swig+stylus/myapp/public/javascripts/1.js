
  ! function() {
    "use strict";
    var e, a = function(i, r) {
      function s(e) {
        return Math.floor(e)
      }

      function n() {
        y.autoplayTimeoutId = setTimeout(function() {
          y.params.loop ? (y.fixLoop(), y._slideNext(), y.emit("onAutoplay", y)) : y.isEnd ? r.autoplayStopOnLast ? y.stopAutoplay() : (y._slideTo(0), y.emit("onAutoplay", y)) : (y._slideNext(), y.emit("onAutoplay", y))
        }, y.params.autoplay)
      }

      function o(a, t) {
        var i = e(a.target);
        if(!i.is(t))
          if("string" == typeof t) i = i.parents(t);
          else if(t.nodeType) {
          var r;
          return i.parents().each(function(e, a) {
            a === t && (r = t)
          }), r ? t : void 0
        }
        if(0 !== i.length) return i[0]
      }

      function l(e, a) {
        a = a || {};
        var t = new(window.MutationObserver || window.WebkitMutationObserver)(function(e) {
          e.forEach(function(e) {
            y.onResize(!0), y.emit("onObserverUpdate", y, e)
          })
        });
        t.observe(e, {
          attributes: void 0 === a.attributes || a.attributes,
          childList: void 0 === a.childList || a.childList,
          characterData: void 0 === a.characterData || a.characterData
        }), y.observers.push(t)
      }

      function p(e) {
        e.originalEvent && (e = e.originalEvent);
        var a = e.keyCode || e.charCode;
        if(!y.params.allowSwipeToNext && (y.isHorizontal() && 39 === a || !y.isHorizontal() && 40 === a)) return !1;
        if(!y.params.allowSwipeToPrev && (y.isHorizontal() && 37 === a || !y.isHorizontal() && 38 === a)) return !1;
        if(!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
          if(37 === a || 39 === a || 38 === a || 40 === a) {
            var t = !1;
            if(y.container.parents(".swiper-slide").length > 0 && 0 === y.container.parents(".swiper-slide-active").length) return;
            var i = {
                left: window.pageXOffset,
                top: window.pageYOffset
              },
              r = window.innerWidth,
              s = window.innerHeight,
              n = y.container.offset();
            y.rtl && (n.left = n.left - y.container[0].scrollLeft);
            for(var o = [
                [n.left, n.top],
                [n.left + y.width, n.top],
                [n.left, n.top + y.height],
                [n.left + y.width, n.top + y.height]
              ], l = 0; l < o.length; l++) {
              var p = o[l];
              p[0] >= i.left && p[0] <= i.left + r && p[1] >= i.top && p[1] <= i.top + s && (t = !0)
            }
            if(!t) return
          }
          y.isHorizontal() ? ((37 === a || 39 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === a && !y.rtl || 37 === a && y.rtl) && y.slideNext(), (37 === a && !y.rtl || 39 === a && y.rtl) && y.slidePrev()) : ((38 === a || 40 === a) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === a && y.slideNext(), 38 === a && y.slidePrev())
        }
      }

      function d(e) {
        e.originalEvent && (e = e.originalEvent);
        var a = y.mousewheel.event,
          t = 0,
          i = y.rtl ? -1 : 1;
        if("mousewheel" === a)
          if(y.params.mousewheelForceToAxis)
            if(y.isHorizontal()) {
              if(!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
              t = e.wheelDeltaX * i
            } else {
              if(!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
              t = e.wheelDeltaY
            }
        else t = Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY) ? -e.wheelDeltaX * i : -e.wheelDeltaY;
        else if("DOMMouseScroll" === a) t = -e.detail;
        else if("wheel" === a)
          if(y.params.mousewheelForceToAxis)
            if(y.isHorizontal()) {
              if(!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
              t = -e.deltaX * i
            } else {
              if(!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
              t = -e.deltaY
            }
        else t = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX * i : -e.deltaY;
        if(0 !== t) {
          if(y.params.mousewheelInvert && (t = -t), y.params.freeMode) {
            var r = y.getWrapperTranslate() + t * y.params.mousewheelSensitivity,
              s = y.isBeginning,
              n = y.isEnd;
            if(r >= y.minTranslate() && (r = y.minTranslate()), r <= y.maxTranslate() && (r = y.maxTranslate()), y.setWrapperTransition(0), y.setWrapperTranslate(r), y.updateProgress(), y.updateActiveIndex(), (!s && y.isBeginning || !n && y.isEnd) && y.updateClasses(), y.params.freeModeSticky ? (clearTimeout(y.mousewheel.timeout), y.mousewheel.timeout = setTimeout(function() {
                y.slideReset()
              }, 300)) : y.params.lazyLoading && y.lazy && y.lazy.load(), 0 === r || r === y.maxTranslate()) return
          } else {
            if((new window.Date).getTime() - y.mousewheel.lastScrollTime > 60)
              if(0 > t)
                if(y.isEnd && !y.params.loop || y.animating) {
                  if(y.params.mousewheelReleaseOnEdges) return !0
                } else y.slideNext();
            else if(y.isBeginning && !y.params.loop || y.animating) {
              if(y.params.mousewheelReleaseOnEdges) return !0
            } else y.slidePrev();
            y.mousewheel.lastScrollTime = (new window.Date).getTime()
          }
          return y.params.autoplay && y.stopAutoplay(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }
      }

      function u(a, t) {
        a = e(a);
        var i, r, s, n = y.rtl ? -1 : 1;
        i = a.attr("data-swiper-parallax") || "0", r = a.attr("data-swiper-parallax-x"), s = a.attr("data-swiper-parallax-y"), r || s ? (r = r || "0", s = s || "0") : y.isHorizontal() ? (r = i, s = "0") : (s = i, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * t + "%" : s * t + "px", a.transform("translate3d(" + r + ", " + s + ",0px)")
      }

      function c(e) {
        return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
      }
      if(!(this instanceof a)) return new a(i, r);
      var m = {
          direction: "horizontal",
          touchEventsTarget: "container",
          initialSlide: 0,
          speed: 300,
          autoplay: !1,
          autoplayDisableOnInteraction: !0,
          autoplayStopOnLast: !1,
          iOSEdgeSwipeDetection: !1,
          iOSEdgeSwipeThreshold: 20,
          freeMode: !1,
          freeModeMomentum: !0,
          freeModeMomentumRatio: 1,
          freeModeMomentumBounce: !0,
          freeModeMomentumBounceRatio: 1,
          freeModeSticky: !1,
          freeModeMinimumVelocity: .02,
          autoHeight: !1,
          setWrapperSize: !1,
          virtualTranslate: !1,
          effect: "slide",
          coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0
          },
          flip: {
            slideShadows: !0,
            limitRotation: !0
          },
          cube: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: .94
          },
          fade: {
            crossFade: !1
          },
          parallax: !1,
          scrollbar: null,
          scrollbarHide: !0,
          scrollbarDraggable: !1,
          scrollbarSnapOnRelease: !1,
          keyboardControl: !1,
          mousewheelControl: !1,
          mousewheelReleaseOnEdges: !1,
          mousewheelInvert: !1,
          mousewheelForceToAxis: !1,
          mousewheelSensitivity: 1,
          hashnav: !1,
          breakpoints: void 0,
          spaceBetween: 0,
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerColumnFill: "column",
          slidesPerGroup: 1,
          centeredSlides: !1,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          roundLengths: !1,
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: !0,
          shortSwipes: !0,
          longSwipes: !0,
          longSwipesRatio: .5,
          longSwipesMs: 300,
          followFinger: !0,
          onlyExternal: !1,
          threshold: 0,
          touchMoveStopPropagation: !0,
          uniqueNavElements: !0,
          pagination: null,
          paginationElement: "span",
          paginationClickable: !1,
          paginationHide: !1,
          paginationBulletRender: null,
          paginationProgressRender: null,
          paginationFractionRender: null,
          paginationCustomRender: null,
          paginationType: "bullets",
          resistance: !0,
          resistanceRatio: .85,
          nextButton: null,
          prevButton: null,
          watchSlidesProgress: !1,
          watchSlidesVisibility: !1,
          grabCursor: !1,
          preventClicks: !0,
          preventClicksPropagation: !0,
          slideToClickedSlide: !1,
          lazyLoading: !1,
          lazyLoadingInPrevNext: !1,
          lazyLoadingInPrevNextAmount: 1,
          lazyLoadingOnTransitionStart: !1,
          preloadImages: !0,
          updateOnImagesReady: !0,
          loop: !1,
          loopAdditionalSlides: 0,
          loopedSlides: null,
          control: void 0,
          controlInverse: !1,
          controlBy: "slide",
          allowSwipeToPrev: !0,
          allowSwipeToNext: !0,
          swipeHandler: null,
          noSwiping: !0,
          noSwipingClass: "swiper-no-swiping",
          slideClass: "swiper-slide",
          slideActiveClass: "swiper-slide-active",
          slideVisibleClass: "swiper-slide-visible",
          slideDuplicateClass: "swiper-slide-duplicate",
          slideNextClass: "swiper-slide-next",
          slidePrevClass: "swiper-slide-prev",
          wrapperClass: "swiper-wrapper",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          buttonDisabledClass: "swiper-button-disabled",
          paginationCurrentClass: "swiper-pagination-current",
          paginationTotalClass: "swiper-pagination-total",
          paginationHiddenClass: "swiper-pagination-hidden",
          paginationProgressbarClass: "swiper-pagination-progressbar",
          observer: !1,
          observeParents: !1,
          a11y: !1,
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          runCallbacksOnInit: !0
        },
        h = r && r.virtualTranslate;
      r = r || {};
      var f = {};
      for(var g in r)
        if("object" != typeof r[g] || null === r[g] || r[g].nodeType || r[g] === window || r[g] === document || void 0 !== t && r[g] instanceof t || "undefined" != typeof jQuery && r[g] instanceof jQuery) f[g] = r[g];
        else {
          f[g] = {};
          for(var v in r[g]) f[g][v] = r[g][v]
        }
      for(var w in m)
        if(void 0 === r[w]) r[w] = m[w];
        else if("object" == typeof r[w])
        for(var b in m[w]) void 0 === r[w][b] && (r[w][b] = m[w][b]);
      var y = this;
      if(y.params = r, y.originalParams = f, y.classNames = [], void 0 !== e && void 0 !== t && (e = t), (void 0 !== e || (e = void 0 === t ? window.Dom7 || window.Zepto || window.jQuery : t)) && (y.$ = e, y.currentBreakpoint = void 0, y.getActiveBreakpoint = function() {
          if(!y.params.breakpoints) return !1;
          var e, a = !1,
            t = [];
          for(e in y.params.breakpoints) y.params.breakpoints.hasOwnProperty(e) && t.push(e);
          t.sort(function(e, a) {
            return parseInt(e, 10) > parseInt(a, 10)
          });
          for(var i = 0; i < t.length; i++)(e = t[i]) >= window.innerWidth && !a && (a = e);
          return a || "max"
        }, y.setBreakpoint = function() {
          var e = y.getActiveBreakpoint();
          if(e && y.currentBreakpoint !== e) {
            var a = e in y.params.breakpoints ? y.params.breakpoints[e] : y.originalParams,
              t = y.params.loop && a.slidesPerView !== y.params.slidesPerView;
            for(var i in a) y.params[i] = a[i];
            y.currentBreakpoint = e, t && y.destroyLoop && y.reLoop(!0)
          }
        }, y.params.breakpoints && y.setBreakpoint(), y.container = e(i), 0 !== y.container.length)) {
        if(y.container.length > 1) {
          var x = [];
          return y.container.each(function() {
            x.push(new a(this, r))
          }), x
        }
        y.container[0].swiper = y, y.container.data("swiper", y), y.classNames.push("swiper-container-" + y.params.direction), y.params.freeMode && y.classNames.push("swiper-container-free-mode"), y.support.flexbox || (y.classNames.push("swiper-container-no-flexbox"), y.params.slidesPerColumn = 1), y.params.autoHeight && y.classNames.push("swiper-container-autoheight"), (y.params.parallax || y.params.watchSlidesVisibility) && (y.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(y.params.effect) >= 0 && (y.support.transforms3d ? (y.params.watchSlidesProgress = !0, y.classNames.push("swiper-container-3d")) : y.params.effect = "slide"), "slide" !== y.params.effect && y.classNames.push("swiper-container-" + y.params.effect), "cube" === y.params.effect && (y.params.resistanceRatio = 0, y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.centeredSlides = !1, y.params.spaceBetween = 0, y.params.virtualTranslate = !0, y.params.setWrapperSize = !1), ("fade" === y.params.effect || "flip" === y.params.effect) && (y.params.slidesPerView = 1, y.params.slidesPerColumn = 1, y.params.slidesPerGroup = 1, y.params.watchSlidesProgress = !0, y.params.spaceBetween = 0, y.params.setWrapperSize = !1, void 0 === h && (y.params.virtualTranslate = !0)), y.params.grabCursor && y.support.touch && (y.params.grabCursor = !1), y.wrapper = y.container.children("." + y.params.wrapperClass), y.params.pagination && (y.paginationContainer = e(y.params.pagination), y.params.uniqueNavElements && "string" == typeof y.params.pagination && y.paginationContainer.length > 1 && 1 === y.container.find(y.params.pagination).length && (y.paginationContainer = y.container.find(y.params.pagination)), "bullets" === y.params.paginationType && y.params.paginationClickable ? y.paginationContainer.addClass("swiper-pagination-clickable") : y.params.paginationClickable = !1, y.paginationContainer.addClass("swiper-pagination-" + y.params.paginationType)), (y.params.nextButton || y.params.prevButton) && (y.params.nextButton && (y.nextButton = e(y.params.nextButton), y.params.uniqueNavElements && "string" == typeof y.params.nextButton && y.nextButton.length > 1 && 1 === y.container.find(y.params.nextButton).length && (y.nextButton = y.container.find(y.params.nextButton))), y.params.prevButton && (y.prevButton = e(y.params.prevButton), y.params.uniqueNavElements && "string" == typeof y.params.prevButton && y.prevButton.length > 1 && 1 === y.container.find(y.params.prevButton).length && (y.prevButton = y.container.find(y.params.prevButton)))), y.isHorizontal = function() {
          return "horizontal" === y.params.direction
        }, y.rtl = y.isHorizontal() && ("rtl" === y.container[0].dir.toLowerCase() || "rtl" === y.container.css("direction")), y.rtl && y.classNames.push("swiper-container-rtl"), y.rtl && (y.wrongRTL = "-webkit-box" === y.wrapper.css("display")), y.params.slidesPerColumn > 1 && y.classNames.push("swiper-container-multirow"), y.device.android && y.classNames.push("swiper-container-android"), y.container.addClass(y.classNames.join(" ")), y.translate = 0, y.progress = 0, y.velocity = 0, y.lockSwipeToNext = function() {
          y.params.allowSwipeToNext = !1
        }, y.lockSwipeToPrev = function() {
          y.params.allowSwipeToPrev = !1
        }, y.lockSwipes = function() {
          y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !1
        }, y.unlockSwipeToNext = function() {
          y.params.allowSwipeToNext = !0
        }, y.unlockSwipeToPrev = function() {
          y.params.allowSwipeToPrev = !0
        }, y.unlockSwipes = function() {
          y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !0
        }, y.params.grabCursor && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grab", y.container[0].style.cursor = "-moz-grab", y.container[0].style.cursor = "grab"), y.imagesToLoad = [], y.imagesLoaded = 0, y.loadImage = function(e, a, t, i, r) {
          function s() {
            r && r()
          }
          var n;
          e.complete && i ? s() : a ? (n = new window.Image, n.onload = s, n.onerror = s, t && (n.srcset = t), a && (n.src = a)) : s()
        }, y.preloadImages = function() {
          y.imagesToLoad = y.container.find("img");
          for(var e = 0; e < y.imagesToLoad.length; e++) y.loadImage(y.imagesToLoad[e], y.imagesToLoad[e].currentSrc || y.imagesToLoad[e].getAttribute("src"), y.imagesToLoad[e].srcset || y.imagesToLoad[e].getAttribute("srcset"), !0, function() {
            void 0 !== y && null !== y && (void 0 !== y.imagesLoaded && y.imagesLoaded++, y.imagesLoaded === y.imagesToLoad.length && (y.params.updateOnImagesReady && y.update(), y.emit("onImagesReady", y)))
          })
        }, y.autoplayTimeoutId = void 0, y.autoplaying = !1, y.autoplayPaused = !1, y.startAutoplay = function() {
          return void 0 === y.autoplayTimeoutId && (!!y.params.autoplay && (!y.autoplaying && (y.autoplaying = !0, y.emit("onAutoplayStart", y), void n())))
        }, y.stopAutoplay = function(e) {
          y.autoplayTimeoutId && (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplaying = !1, y.autoplayTimeoutId = void 0, y.emit("onAutoplayStop", y))
        }, y.pauseAutoplay = function(e) {
          y.autoplayPaused || (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId), y.autoplayPaused = !0, 0 === e ? (y.autoplayPaused = !1, n()) : y.wrapper.transitionEnd(function() {
            y && (y.autoplayPaused = !1, y.autoplaying ? n() : y.stopAutoplay())
          }))
        }, y.minTranslate = function() {
          return -y.snapGrid[0]
        }, y.maxTranslate = function() {
          return -y.snapGrid[y.snapGrid.length - 1]
        }, y.updateAutoHeight = function() {
          var e = y.slides.eq(y.activeIndex)[0];
          if(void 0 !== e) {
            var a = e.offsetHeight;
            a && y.wrapper.css("height", a + "px")
          }
        }, y.updateContainerSize = function() {
          var e, a;
          e = void 0 !== y.params.width ? y.params.width : y.container[0].clientWidth, a = void 0 !== y.params.height ? y.params.height : y.container[0].clientHeight, 0 === e && y.isHorizontal() || 0 === a && !y.isHorizontal() || (e = e - parseInt(y.container.css("padding-left"), 10) - parseInt(y.container.css("padding-right"), 10), a = a - parseInt(y.container.css("padding-top"), 10) - parseInt(y.container.css("padding-bottom"), 10), y.width = e, y.height = a, y.size = y.isHorizontal() ? y.width : y.height)
        }, y.updateSlidesSize = function() {
          y.slides = y.wrapper.children("." + y.params.slideClass), y.snapGrid = [], y.slidesGrid = [], y.slidesSizesGrid = [];
          var e, a = y.params.spaceBetween,
            t = -y.params.slidesOffsetBefore,
            i = 0,
            r = 0;
          if(void 0 !== y.size) {
            "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * y.size), y.virtualSize = -a, y.rtl ? y.slides.css({
              marginLeft: "",
              marginTop: ""
            }) : y.slides.css({
              marginRight: "",
              marginBottom: ""
            });
            var n;
            y.params.slidesPerColumn > 1 && (n = Math.floor(y.slides.length / y.params.slidesPerColumn) === y.slides.length / y.params.slidesPerColumn ? y.slides.length : Math.ceil(y.slides.length / y.params.slidesPerColumn) * y.params.slidesPerColumn, "auto" !== y.params.slidesPerView && "row" === y.params.slidesPerColumnFill && (n = Math.max(n, y.params.slidesPerView * y.params.slidesPerColumn)));
            var o, l = y.params.slidesPerColumn,
              p = n / l,
              d = p - (y.params.slidesPerColumn * p - y.slides.length);
            for(e = 0; e < y.slides.length; e++) {
              o = 0;
              var u = y.slides.eq(e);
              if(y.params.slidesPerColumn > 1) {
                var c, m, h;
                "column" === y.params.slidesPerColumnFill ? (m = Math.floor(e / l), h = e - m * l, (m > d || m === d && h === l - 1) && ++h >= l && (h = 0, m++), c = m + h * n / l, u.css({
                  "-webkit-box-ordinal-group": c,
                  "-moz-box-ordinal-group": c,
                  "-ms-flex-order": c,
                  "-webkit-order": c,
                  order: c
                })) : (h = Math.floor(e / p), m = e - h * p), u.css({
                  "margin-top": 0 !== h && y.params.spaceBetween && y.params.spaceBetween + "px"
                }).attr("data-swiper-column", m).attr("data-swiper-row", h)
              }
              "none" !== u.css("display") && ("auto" === y.params.slidesPerView ? (o = y.isHorizontal() ? u.outerWidth(!0) : u.outerHeight(!0), y.params.roundLengths && (o = s(o))) : (o = (y.size - (y.params.slidesPerView - 1) * a) / y.params.slidesPerView, y.params.roundLengths && (o = s(o)), y.isHorizontal() ? y.slides[e].style.width = o + "px" : y.slides[e].style.height = o + "px"), y.slides[e].swiperSlideSize = o, y.slidesSizesGrid.push(o), y.params.centeredSlides ? (t = t + o / 2 + i / 2 + a, 0 === e && (t = t - y.size / 2 - a), Math.abs(t) < .001 && (t = 0), r % y.params.slidesPerGroup == 0 && y.snapGrid.push(t), y.slidesGrid.push(t)) : (r % y.params.slidesPerGroup == 0 && y.snapGrid.push(t), y.slidesGrid.push(t), t = t + o + a), y.virtualSize += o + a, i = o, r++)
            }
            y.virtualSize = Math.max(y.virtualSize, y.size) + y.params.slidesOffsetAfter;
            var f;
            if(y.rtl && y.wrongRTL && ("slide" === y.params.effect || "coverflow" === y.params.effect) && y.wrapper.css({
                width: y.virtualSize + y.params.spaceBetween + "px"
              }), (!y.support.flexbox || y.params.setWrapperSize) && (y.isHorizontal() ? y.wrapper.css({
                width: y.virtualSize + y.params.spaceBetween + "px"
              }) : y.wrapper.css({
                height: y.virtualSize + y.params.spaceBetween + "px"
              })), y.params.slidesPerColumn > 1 && (y.virtualSize = (o + y.params.spaceBetween) * n, y.virtualSize = Math.ceil(y.virtualSize / y.params.slidesPerColumn) - y.params.spaceBetween, y.wrapper.css({
                width: y.virtualSize + y.params.spaceBetween + "px"
              }), y.params.centeredSlides)) {
              for(f = [], e = 0; e < y.snapGrid.length; e++) y.snapGrid[e] < y.virtualSize + y.snapGrid[0] && f.push(y.snapGrid[e]);
              y.snapGrid = f
            }
            if(!y.params.centeredSlides) {
              for(f = [], e = 0; e < y.snapGrid.length; e++) y.snapGrid[e] <= y.virtualSize - y.size && f.push(y.snapGrid[e]);
              y.snapGrid = f, Math.floor(y.virtualSize - y.size) - Math.floor(y.snapGrid[y.snapGrid.length - 1]) > 1 && y.snapGrid.push(y.virtualSize - y.size)
            }
            0 === y.snapGrid.length && (y.snapGrid = [0]), 0 !== y.params.spaceBetween && (y.isHorizontal() ? y.rtl ? y.slides.css({
              marginLeft: a + "px"
            }) : y.slides.css({
              marginRight: a + "px"
            }) : y.slides.css({
              marginBottom: a + "px"
            })), y.params.watchSlidesProgress && y.updateSlidesOffset()
          }
        }, y.updateSlidesOffset = function() {
          for(var e = 0; e < y.slides.length; e++) y.slides[e].swiperSlideOffset = y.isHorizontal() ? y.slides[e].offsetLeft : y.slides[e].offsetTop
        }, y.updateSlidesProgress = function(e) {
          if(void 0 === e && (e = y.translate || 0), 0 !== y.slides.length) {
            void 0 === y.slides[0].swiperSlideOffset && y.updateSlidesOffset();
            var a = -e;
            y.rtl && (a = e), y.slides.removeClass(y.params.slideVisibleClass);
            for(var t = 0; t < y.slides.length; t++) {
              var i = y.slides[t],
                r = (a - i.swiperSlideOffset) / (i.swiperSlideSize + y.params.spaceBetween);
              if(y.params.watchSlidesVisibility) {
                var s = -(a - i.swiperSlideOffset),
                  n = s + y.slidesSizesGrid[t];
                (s >= 0 && s < y.size || n > 0 && n <= y.size || 0 >= s && n >= y.size) && y.slides.eq(t).addClass(y.params.slideVisibleClass)
              }
              i.progress = y.rtl ? -r : r
            }
          }
        }, y.updateProgress = function(e) {
          void 0 === e && (e = y.translate || 0);
          var a = y.maxTranslate() - y.minTranslate(),
            t = y.isBeginning,
            i = y.isEnd;
          0 === a ? (y.progress = 0, y.isBeginning = y.isEnd = !0) : (y.progress = (e - y.minTranslate()) / a, y.isBeginning = y.progress <= 0, y.isEnd = y.progress >= 1), y.isBeginning && !t && y.emit("onReachBeginning", y), y.isEnd && !i && y.emit("onReachEnd", y), y.params.watchSlidesProgress && y.updateSlidesProgress(e), y.emit("onProgress", y, y.progress)
        }, y.updateActiveIndex = function() {
          var e, a, t, i = y.rtl ? y.translate : -y.translate;
          for(a = 0; a < y.slidesGrid.length; a++) void 0 !== y.slidesGrid[a + 1] ? i >= y.slidesGrid[a] && i < y.slidesGrid[a + 1] - (y.slidesGrid[a + 1] - y.slidesGrid[a]) / 2 ? e = a : i >= y.slidesGrid[a] && i < y.slidesGrid[a + 1] && (e = a + 1) : i >= y.slidesGrid[a] && (e = a);
          (0 > e || void 0 === e) && (e = 0), (t = Math.floor(e / y.params.slidesPerGroup)) >= y.snapGrid.length && (t = y.snapGrid.length - 1), e !== y.activeIndex && (y.snapIndex = t, y.previousIndex = y.activeIndex, y.activeIndex = e, y.updateClasses())
        }, y.updateClasses = function() {
          y.slides.removeClass(y.params.slideActiveClass + " " + y.params.slideNextClass + " " + y.params.slidePrevClass);
          var a = y.slides.eq(y.activeIndex);
          a.addClass(y.params.slideActiveClass);
          var t = a.next("." + y.params.slideClass).addClass(y.params.slideNextClass);
          y.params.loop && 0 === t.length && y.slides.eq(0).addClass(y.params.slideNextClass);
          var i = a.prev("." + y.params.slideClass).addClass(y.params.slidePrevClass);
          if(y.params.loop && 0 === i.length && y.slides.eq(-1).addClass(y.params.slidePrevClass), y.paginationContainer && y.paginationContainer.length > 0) {
            var r, s = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length;
            if(y.params.loop ? ((r = Math.ceil((y.activeIndex - y.loopedSlides) / y.params.slidesPerGroup)) > y.slides.length - 1 - 2 * y.loopedSlides && (r -= y.slides.length - 2 * y.loopedSlides), r > s - 1 && (r -= s), 0 > r && "bullets" !== y.params.paginationType && (r = s + r)) : r = void 0 !== y.snapIndex ? y.snapIndex : y.activeIndex || 0, "bullets" === y.params.paginationType && y.bullets && y.bullets.length > 0 && (y.bullets.removeClass(y.params.bulletActiveClass), y.paginationContainer.length > 1 ? y.bullets.each(function() {
                e(this).index() === r && e(this).addClass(y.params.bulletActiveClass)
              }) : y.bullets.eq(r).addClass(y.params.bulletActiveClass)), "fraction" === y.params.paginationType && (y.paginationContainer.find("." + y.params.paginationCurrentClass).text(r + 1), y.paginationContainer.find("." + y.params.paginationTotalClass).text(s)), "progress" === y.params.paginationType) {
              var n = (r + 1) / s,
                o = n,
                l = 1;
              y.isHorizontal() || (l = n, o = 1), y.paginationContainer.find("." + y.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(y.params.speed)
            }
            "custom" === y.params.paginationType && y.params.paginationCustomRender && (y.paginationContainer.html(y.params.paginationCustomRender(y, r + 1, s)), y.emit("onPaginationRendered", y, y.paginationContainer[0]))
          }
          y.params.loop || (y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.isBeginning ? (y.prevButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.prevButton)) : (y.prevButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.prevButton))), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.isEnd ? (y.nextButton.addClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.disable(y.nextButton)) : (y.nextButton.removeClass(y.params.buttonDisabledClass), y.params.a11y && y.a11y && y.a11y.enable(y.nextButton))))
        }, y.updatePagination = function() {
          if(y.params.pagination && y.paginationContainer && y.paginationContainer.length > 0) {
            var e = "";
            if("bullets" === y.params.paginationType) {
              for(var a = y.params.loop ? Math.ceil((y.slides.length - 2 * y.loopedSlides) / y.params.slidesPerGroup) : y.snapGrid.length, t = 0; a > t; t++) e += y.params.paginationBulletRender ? y.params.paginationBulletRender(t, y.params.bulletClass) : "<" + y.params.paginationElement + ' class="' + y.params.bulletClass + '"></' + y.params.paginationElement + ">";
              y.paginationContainer.html(e), y.bullets = y.paginationContainer.find("." + y.params.bulletClass), y.params.paginationClickable && y.params.a11y && y.a11y && y.a11y.initPagination()
            }
            "fraction" === y.params.paginationType && (e = y.params.paginationFractionRender ? y.params.paginationFractionRender(y, y.params.paginationCurrentClass, y.params.paginationTotalClass) : '<span class="' + y.params.paginationCurrentClass + '"></span> / <span class="' + y.params.paginationTotalClass + '"></span>', y.paginationContainer.html(e)), "progress" === y.params.paginationType && (e = y.params.paginationProgressRender ? y.params.paginationProgressRender(y, y.params.paginationProgressbarClass) : '<span class="' + y.params.paginationProgressbarClass + '"></span>', y.paginationContainer.html(e)), "custom" !== y.params.paginationType && y.emit("onPaginationRendered", y, y.paginationContainer[0])
          }
        }, y.update = function(e) {
          function a() {
            t = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate()), y.setWrapperTranslate(t), y.updateActiveIndex(), y.updateClasses()
          }
          if(y.updateContainerSize(), y.updateSlidesSize(), y.updateProgress(), y.updatePagination(), y.updateClasses(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), e) {
            var t;
            y.controller && y.controller.spline && (y.controller.spline = void 0), y.params.freeMode ? (a(), y.params.autoHeight && y.updateAutoHeight()) : (("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0)) || a()
          } else y.params.autoHeight && y.updateAutoHeight()
        }, y.onResize = function(e) {
          y.params.breakpoints && y.setBreakpoint();
          var a = y.params.allowSwipeToPrev,
            t = y.params.allowSwipeToNext;
          y.params.allowSwipeToPrev = y.params.allowSwipeToNext = !0, y.updateContainerSize(), y.updateSlidesSize(), ("auto" === y.params.slidesPerView || y.params.freeMode || e) && y.updatePagination(), y.params.scrollbar && y.scrollbar && y.scrollbar.set(), y.controller && y.controller.spline && (y.controller.spline = void 0);
          var i = !1;
          if(y.params.freeMode) {
            var r = Math.min(Math.max(y.translate, y.maxTranslate()), y.minTranslate());
            y.setWrapperTranslate(r), y.updateActiveIndex(), y.updateClasses(), y.params.autoHeight && y.updateAutoHeight()
          } else y.updateClasses(), i = ("auto" === y.params.slidesPerView || y.params.slidesPerView > 1) && y.isEnd && !y.params.centeredSlides ? y.slideTo(y.slides.length - 1, 0, !1, !0) : y.slideTo(y.activeIndex, 0, !1, !0);
          y.params.lazyLoading && !i && y.lazy && y.lazy.load(), y.params.allowSwipeToPrev = a, y.params.allowSwipeToNext = t
        };
        var T = ["mousedown", "mousemove", "mouseup"];
        window.navigator.pointerEnabled ? T = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (T = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), y.touchEvents = {
          start: y.support.touch || !y.params.simulateTouch ? "touchstart" : T[0],
          move: y.support.touch || !y.params.simulateTouch ? "touchmove" : T[1],
          end: y.support.touch || !y.params.simulateTouch ? "touchend" : T[2]
        }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === y.params.touchEventsTarget ? y.container : y.wrapper).addClass("swiper-wp8-" + y.params.direction), y.initEvents = function(e) {
          var a = e ? "off" : "on",
            t = e ? "removeEventListener" : "addEventListener",
            i = "container" === y.params.touchEventsTarget ? y.container[0] : y.wrapper[0],
            s = y.support.touch ? i : document,
            n = !!y.params.nested;
          y.browser.ie ? (i[t](y.touchEvents.start, y.onTouchStart, !1), s[t](y.touchEvents.move, y.onTouchMove, n), s[t](y.touchEvents.end, y.onTouchEnd, !1)) : (y.support.touch && (i[t](y.touchEvents.start, y.onTouchStart, !1), i[t](y.touchEvents.move, y.onTouchMove, n), i[t](y.touchEvents.end, y.onTouchEnd, !1)), !r.simulateTouch || y.device.ios || y.device.android || (i[t]("mousedown", y.onTouchStart, !1), document[t]("mousemove", y.onTouchMove, n), document[t]("mouseup", y.onTouchEnd, !1))), window[t]("resize", y.onResize), y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.nextButton[a]("click", y.onClickNext), y.params.a11y && y.a11y && y.nextButton[a]("keydown", y.a11y.onEnterKey)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.prevButton[a]("click", y.onClickPrev), y.params.a11y && y.a11y && y.prevButton[a]("keydown", y.a11y.onEnterKey)), y.params.pagination && y.params.paginationClickable && (y.paginationContainer[a]("click", "." + y.params.bulletClass, y.onClickIndex), y.params.a11y && y.a11y && y.paginationContainer[a]("keydown", "." + y.params.bulletClass, y.a11y.onEnterKey)), (y.params.preventClicks || y.params.preventClicksPropagation) && i[t]("click", y.preventClicks, !0)
        }, y.attachEvents = function() {
          y.initEvents()
        }, y.detachEvents = function() {
          y.initEvents(!0)
        }, y.allowClick = !0, y.preventClicks = function(e) {
          y.allowClick || (y.params.preventClicks && e.preventDefault(), y.params.preventClicksPropagation && y.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
        }, y.onClickNext = function(e) {
          e.preventDefault(), (!y.isEnd || y.params.loop) && y.slideNext()
        }, y.onClickPrev = function(e) {
          e.preventDefault(), (!y.isBeginning || y.params.loop) && y.slidePrev()
        }, y.onClickIndex = function(a) {
          a.preventDefault();
          var t = e(this).index() * y.params.slidesPerGroup;
          y.params.loop && (t += y.loopedSlides), y.slideTo(t)
        }, y.updateClickedSlide = function(a) {
          var t = o(a, "." + y.params.slideClass),
            i = !1;
          if(t)
            for(var r = 0; r < y.slides.length; r++) y.slides[r] === t && (i = !0);
          if(!t || !i) return y.clickedSlide = void 0, void(y.clickedIndex = void 0);
          if(y.clickedSlide = t, y.clickedIndex = e(t).index(), y.params.slideToClickedSlide && void 0 !== y.clickedIndex && y.clickedIndex !== y.activeIndex) {
            var s, n = y.clickedIndex;
            if(y.params.loop) {
              if(y.animating) return;
              s = e(y.clickedSlide).attr("data-swiper-slide-index"), y.params.centeredSlides ? n < y.loopedSlides - y.params.slidesPerView / 2 || n > y.slides.length - y.loopedSlides + y.params.slidesPerView / 2 ? (y.fixLoop(), n = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function() {
                y.slideTo(n)
              }, 0)) : y.slideTo(n) : n > y.slides.length - y.params.slidesPerView ? (y.fixLoop(), n = y.wrapper.children("." + y.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function() {
                y.slideTo(n)
              }, 0)) : y.slideTo(n)
            } else y.slideTo(n)
          }
        };
        var S, C, z, M, E, P, k, I, L, B, D = "input, select, textarea, button",
          H = Date.now(),
          A = [];
        y.animating = !1, y.touches = {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        };
        var G, O;
        if(y.onTouchStart = function(a) {
            if(a.originalEvent && (a = a.originalEvent), (G = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) {
              if(y.params.noSwiping && o(a, "." + y.params.noSwipingClass)) return void(y.allowClick = !0);
              if(!y.params.swipeHandler || o(a, y.params.swipeHandler)) {
                var t = y.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                  i = y.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
                if(!(y.device.ios && y.params.iOSEdgeSwipeDetection && t <= y.params.iOSEdgeSwipeThreshold)) {
                  if(S = !0, C = !1, z = !0, E = void 0, O = void 0, y.touches.startX = t, y.touches.startY = i, M = Date.now(), y.allowClick = !0, y.updateContainerSize(), y.swipeDirection = void 0, y.params.threshold > 0 && (I = !1), "touchstart" !== a.type) {
                    var r = !0;
                    e(a.target).is(D) && (r = !1), document.activeElement && e(document.activeElement).is(D) && document.activeElement.blur(), r && a.preventDefault()
                  }
                  y.emit("onTouchStart", y, a)
                }
              }
            }
          }, y.onTouchMove = function(a) {
            if(a.originalEvent && (a = a.originalEvent), !G || "mousemove" !== a.type) {
              if(a.preventedByNestedSwiper) return y.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, void(y.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY);
              if(y.params.onlyExternal) return y.allowClick = !1, void(S && (y.touches.startX = y.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, y.touches.startY = y.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, M = Date.now()));
              if(G && document.activeElement && a.target === document.activeElement && e(a.target).is(D)) return C = !0, void(y.allowClick = !1);
              if(z && y.emit("onTouchMove", y, a), !(a.targetTouches && a.targetTouches.length > 1)) {
                if(y.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX, y.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY, void 0 === E) {
                  var t = 180 * Math.atan2(Math.abs(y.touches.currentY - y.touches.startY), Math.abs(y.touches.currentX - y.touches.startX)) / Math.PI;
                  E = y.isHorizontal() ? t > y.params.touchAngle : 90 - t > y.params.touchAngle
                }
                if(E && y.emit("onTouchMoveOpposite", y, a), void 0 === O && y.browser.ieTouch && (y.touches.currentX !== y.touches.startX || y.touches.currentY !== y.touches.startY) && (O = !0), S) {
                  if(E) return void(S = !1);
                  if(O || !y.browser.ieTouch) {
                    y.allowClick = !1, y.emit("onSliderMove", y, a), a.preventDefault(), y.params.touchMoveStopPropagation && !y.params.nested && a.stopPropagation(), C || (r.loop && y.fixLoop(), k = y.getWrapperTranslate(), y.setWrapperTransition(0), y.animating && y.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), y.params.autoplay && y.autoplaying && (y.params.autoplayDisableOnInteraction ? y.stopAutoplay() : y.pauseAutoplay()), B = !1, y.params.grabCursor && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grabbing", y.container[0].style.cursor = "-moz-grabbin", y.container[0].style.cursor = "grabbing")), C = !0;
                    var i = y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY;
                    i *= y.params.touchRatio, y.rtl && (i = -i), y.swipeDirection = i > 0 ? "prev" : "next", P = i + k;
                    var s = !0;
                    if(i > 0 && P > y.minTranslate() ? (s = !1, y.params.resistance && (P = y.minTranslate() - 1 + Math.pow(-y.minTranslate() + k + i, y.params.resistanceRatio))) : 0 > i && P < y.maxTranslate() && (s = !1, y.params.resistance && (P = y.maxTranslate() + 1 - Math.pow(y.maxTranslate() - k - i, y.params.resistanceRatio))), s && (a.preventedByNestedSwiper = !0), !y.params.allowSwipeToNext && "next" === y.swipeDirection && k > P && (P = k), !y.params.allowSwipeToPrev && "prev" === y.swipeDirection && P > k && (P = k), y.params.followFinger) {
                      if(y.params.threshold > 0) {
                        if(!(Math.abs(i) > y.params.threshold || I)) return void(P = k);
                        if(!I) return I = !0, y.touches.startX = y.touches.currentX, y.touches.startY = y.touches.currentY, P = k, void(y.touches.diff = y.isHorizontal() ? y.touches.currentX - y.touches.startX : y.touches.currentY - y.touches.startY)
                      }(y.params.freeMode || y.params.watchSlidesProgress) && y.updateActiveIndex(), y.params.freeMode && (0 === A.length && A.push({
                        position: y.touches[y.isHorizontal() ? "startX" : "startY"],
                        time: M
                      }), A.push({
                        position: y.touches[y.isHorizontal() ? "currentX" : "currentY"],
                        time: (new window.Date).getTime()
                      })), y.updateProgress(P), y.setWrapperTranslate(P)
                    }
                  }
                }
              }
            }
          }, y.onTouchEnd = function(a) {
            if(a.originalEvent && (a = a.originalEvent), z && y.emit("onTouchEnd", y, a), z = !1, S) {
              y.params.grabCursor && C && S && (y.container[0].style.cursor = "move", y.container[0].style.cursor = "-webkit-grab", y.container[0].style.cursor = "-moz-grab", y.container[0].style.cursor = "grab");
              var t = Date.now(),
                i = t - M;
              if(y.allowClick && (y.updateClickedSlide(a), y.emit("onTap", y, a), 300 > i && t - H > 300 && (L && clearTimeout(L), L = setTimeout(function() {
                  y && (y.params.paginationHide && y.paginationContainer.length > 0 && !e(a.target).hasClass(y.params.bulletClass) && y.paginationContainer.toggleClass(y.params.paginationHiddenClass), y.emit("onClick", y, a))
                }, 300)), 300 > i && 300 > t - H && (L && clearTimeout(L), y.emit("onDoubleTap", y, a))), H = Date.now(), setTimeout(function() {
                  y && (y.allowClick = !0)
                }, 0), !S || !C || !y.swipeDirection || 0 === y.touches.diff || P === k) return void(S = C = !1);
              S = C = !1;
              var r;
              if(r = y.params.followFinger ? y.rtl ? y.translate : -y.translate : -P, y.params.freeMode) {
                if(r < -y.minTranslate()) return void y.slideTo(y.activeIndex);
                if(r > -y.maxTranslate()) return void(y.slides.length < y.snapGrid.length ? y.slideTo(y.snapGrid.length - 1) : y.slideTo(y.slides.length - 1));
                if(y.params.freeModeMomentum) {
                  if(A.length > 1) {
                    var s = A.pop(),
                      n = A.pop(),
                      o = s.position - n.position,
                      l = s.time - n.time;
                    y.velocity = o / l, y.velocity = y.velocity / 2, Math.abs(y.velocity) < y.params.freeModeMinimumVelocity && (y.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (y.velocity = 0)
                  } else y.velocity = 0;
                  A.length = 0;
                  var p = 1e3 * y.params.freeModeMomentumRatio,
                    d = y.velocity * p,
                    u = y.translate + d;
                  y.rtl && (u = -u);
                  var c, m = !1,
                    h = 20 * Math.abs(y.velocity) * y.params.freeModeMomentumBounceRatio;
                  if(u < y.maxTranslate()) y.params.freeModeMomentumBounce ? (u + y.maxTranslate() < -h && (u = y.maxTranslate() - h), c = y.maxTranslate(), m = !0, B = !0) : u = y.maxTranslate();
                  else if(u > y.minTranslate()) y.params.freeModeMomentumBounce ? (u - y.minTranslate() > h && (u = y.minTranslate() + h), c = y.minTranslate(), m = !0, B = !0) : u = y.minTranslate();
                  else if(y.params.freeModeSticky) {
                    var f, g = 0;
                    for(g = 0; g < y.snapGrid.length; g += 1)
                      if(y.snapGrid[g] > -u) {
                        f = g;
                        break
                      }
                    u = Math.abs(y.snapGrid[f] - u) < Math.abs(y.snapGrid[f - 1] - u) || "next" === y.swipeDirection ? y.snapGrid[f] : y.snapGrid[f - 1], y.rtl || (u = -u)
                  }
                  if(0 !== y.velocity) p = y.rtl ? Math.abs((-u - y.translate) / y.velocity) : Math.abs((u - y.translate) / y.velocity);
                  else if(y.params.freeModeSticky) return void y.slideReset();
                  y.params.freeModeMomentumBounce && m ? (y.updateProgress(c), y.setWrapperTransition(p), y.setWrapperTranslate(u), y.onTransitionStart(), y.animating = !0, y.wrapper.transitionEnd(function() {
                    y && B && (y.emit("onMomentumBounce", y), y.setWrapperTransition(y.params.speed), y.setWrapperTranslate(c), y.wrapper.transitionEnd(function() {
                      y && y.onTransitionEnd()
                    }))
                  })) : y.velocity ? (y.updateProgress(u), y.setWrapperTransition(p), y.setWrapperTranslate(u), y.onTransitionStart(), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function() {
                    y && y.onTransitionEnd()
                  }))) : y.updateProgress(u), y.updateActiveIndex()
                }
                return void((!y.params.freeModeMomentum || i >= y.params.longSwipesMs) && (y.updateProgress(), y.updateActiveIndex()))
              }
              var v, w = 0,
                b = y.slidesSizesGrid[0];
              for(v = 0; v < y.slidesGrid.length; v += y.params.slidesPerGroup) void 0 !== y.slidesGrid[v + y.params.slidesPerGroup] ? r >= y.slidesGrid[v] && r < y.slidesGrid[v + y.params.slidesPerGroup] && (w = v, b = y.slidesGrid[v + y.params.slidesPerGroup] - y.slidesGrid[v]) : r >= y.slidesGrid[v] && (w = v, b = y.slidesGrid[y.slidesGrid.length - 1] - y.slidesGrid[y.slidesGrid.length - 2]);
              var x = (r - y.slidesGrid[w]) / b;
              if(i > y.params.longSwipesMs) {
                if(!y.params.longSwipes) return void y.slideTo(y.activeIndex);
                "next" === y.swipeDirection && (x >= y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w)), "prev" === y.swipeDirection && (x > 1 - y.params.longSwipesRatio ? y.slideTo(w + y.params.slidesPerGroup) : y.slideTo(w))
              } else {
                if(!y.params.shortSwipes) return void y.slideTo(y.activeIndex);
                "next" === y.swipeDirection && y.slideTo(w + y.params.slidesPerGroup), "prev" === y.swipeDirection && y.slideTo(w)
              }
            }
          }, y._slideTo = function(e, a) {
            return y.slideTo(e, a, !0, !0)
          }, y.slideTo = function(e, a, t, i) {
            void 0 === t && (t = !0), void 0 === e && (e = 0), 0 > e && (e = 0), y.snapIndex = Math.floor(e / y.params.slidesPerGroup), y.snapIndex >= y.snapGrid.length && (y.snapIndex = y.snapGrid.length - 1);
            var r = -y.snapGrid[y.snapIndex];
            y.params.autoplay && y.autoplaying && (i || !y.params.autoplayDisableOnInteraction ? y.pauseAutoplay(a) : y.stopAutoplay()), y.updateProgress(r);
            for(var s = 0; s < y.slidesGrid.length; s++) - Math.floor(100 * r) >= Math.floor(100 * y.slidesGrid[s]) && (e = s);
            return !(!y.params.allowSwipeToNext && r < y.translate && r < y.minTranslate()) && (!(!y.params.allowSwipeToPrev && r > y.translate && r > y.maxTranslate() && (y.activeIndex || 0) !== e) && (void 0 === a && (a = y.params.speed), y.previousIndex = y.activeIndex || 0, y.activeIndex = e, y.rtl && -r === y.translate || !y.rtl && r === y.translate ? (y.params.autoHeight && y.updateAutoHeight(), y.updateClasses(), "slide" !== y.params.effect && y.setWrapperTranslate(r), !1) : (y.updateClasses(), y.onTransitionStart(t), 0 === a ? (y.setWrapperTranslate(r), y.setWrapperTransition(0), y.onTransitionEnd(t)) : (y.setWrapperTranslate(r), y.setWrapperTransition(a), y.animating || (y.animating = !0, y.wrapper.transitionEnd(function() {
              y && y.onTransitionEnd(t)
            }))), !0)))
          }, y.onTransitionStart = function(e) {
            void 0 === e && (e = !0), y.params.autoHeight && y.updateAutoHeight(), y.lazy && y.lazy.onTransitionStart(), e && (y.emit("onTransitionStart", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeStart", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextStart", y) : y.emit("onSlidePrevStart", y)))
          }, y.onTransitionEnd = function(e) {
            y.animating = !1, y.setWrapperTransition(0), void 0 === e && (e = !0), y.lazy && y.lazy.onTransitionEnd(), e && (y.emit("onTransitionEnd", y), y.activeIndex !== y.previousIndex && (y.emit("onSlideChangeEnd", y), y.activeIndex > y.previousIndex ? y.emit("onSlideNextEnd", y) : y.emit("onSlidePrevEnd", y))), y.params.hashnav && y.hashnav && y.hashnav.setHash()
          }, y.slideNext = function(e, a, t) {
            return y.params.loop ? !y.animating && (y.fixLoop(), y.container[0].clientLeft, y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t)) : y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t)
          }, y._slideNext = function(e) {
            return y.slideNext(!0, e, !0)
          }, y.slidePrev = function(e, a, t) {
            return y.params.loop ? !y.animating && (y.fixLoop(), y.container[0].clientLeft, y.slideTo(y.activeIndex - 1, a, e, t)) : y.slideTo(y.activeIndex - 1, a, e, t)
          }, y._slidePrev = function(e) {
            return y.slidePrev(!0, e, !0)
          }, y.slideReset = function(e, a, t) {
            return y.slideTo(y.activeIndex, a, e)
          }, y.setWrapperTransition = function(e, a) {
            y.wrapper.transition(e), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTransition(e), y.params.parallax && y.parallax && y.parallax.setTransition(e), y.params.scrollbar && y.scrollbar && y.scrollbar.setTransition(e), y.params.control && y.controller && y.controller.setTransition(e, a), y.emit("onSetTransition", y, e)
          }, y.setWrapperTranslate = function(e, a, t) {
            var i = 0,
              r = 0;
            y.isHorizontal() ? i = y.rtl ? -e : e : r = e, y.params.roundLengths && (i = s(i), r = s(r)), y.params.virtualTranslate || (y.support.transforms3d ? y.wrapper.transform("translate3d(" + i + "px, " + r + "px, 0px)") : y.wrapper.transform("translate(" + i + "px, " + r + "px)")), y.translate = y.isHorizontal() ? i : r;
            var n = y.maxTranslate() - y.minTranslate();
            (0 === n ? 0 : (e - y.minTranslate()) / n) !== y.progress && y.updateProgress(e), a && y.updateActiveIndex(), "slide" !== y.params.effect && y.effects[y.params.effect] && y.effects[y.params.effect].setTranslate(y.translate), y.params.parallax && y.parallax && y.parallax.setTranslate(y.translate), y.params.scrollbar && y.scrollbar && y.scrollbar.setTranslate(y.translate), y.params.control && y.controller && y.controller.setTranslate(y.translate, t), y.emit("onSetTranslate", y, y.translate)
          }, y.getTranslate = function(e, a) {
            var t, i, r, s;
            return void 0 === a && (a = "x"), y.params.virtualTranslate ? y.rtl ? -y.translate : y.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? ((i = r.transform || r.webkitTransform).split(",").length > 6 && (i = i.split(", ").map(function(e) {
              return e.replace(",", ".")
            }).join(", ")), s = new window.WebKitCSSMatrix("none" === i ? "" : i)) : (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = s.toString().split(",")), "x" === a && (i = window.WebKitCSSMatrix ? s.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (i = window.WebKitCSSMatrix ? s.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), y.rtl && i && (i = -i), i || 0)
          }, y.getWrapperTranslate = function(e) {
            return void 0 === e && (e = y.isHorizontal() ? "x" : "y"), y.getTranslate(y.wrapper[0], e)
          }, y.observers = [], y.initObservers = function() {
            if(y.params.observeParents)
              for(var e = y.container.parents(), a = 0; a < e.length; a++) l(e[a]);
            l(y.container[0], {
              childList: !1
            }), l(y.wrapper[0], {
              attributes: !1
            })
          }, y.disconnectObservers = function() {
            for(var e = 0; e < y.observers.length; e++) y.observers[e].disconnect();
            y.observers = []
          }, y.createLoop = function() {
            y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove();
            var a = y.wrapper.children("." + y.params.slideClass);
            "auto" !== y.params.slidesPerView || y.params.loopedSlides || (y.params.loopedSlides = a.length), y.loopedSlides = parseInt(y.params.loopedSlides || y.params.slidesPerView, 10), y.loopedSlides = y.loopedSlides + y.params.loopAdditionalSlides, y.loopedSlides > a.length && (y.loopedSlides = a.length);
            var t, i = [],
              r = [];
            for(a.each(function(t, s) {
                var n = e(this);
                t < y.loopedSlides && r.push(s), t < a.length && t >= a.length - y.loopedSlides && i.push(s), n.attr("data-swiper-slide-index", t)
              }), t = 0; t < r.length; t++) y.wrapper.append(e(r[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass));
            for(t = i.length - 1; t >= 0; t--) y.wrapper.prepend(e(i[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass))
          }, y.destroyLoop = function() {
            y.wrapper.children("." + y.params.slideClass + "." + y.params.slideDuplicateClass).remove(), y.slides.removeAttr("data-swiper-slide-index")
          }, y.reLoop = function(e) {
            var a = y.activeIndex - y.loopedSlides;
            y.destroyLoop(), y.createLoop(), y.updateSlidesSize(), e && y.slideTo(a + y.loopedSlides, 0, !1)
          }, y.fixLoop = function() {
            var e;
            y.activeIndex < y.loopedSlides ? (e = y.slides.length - 3 * y.loopedSlides + y.activeIndex, e += y.loopedSlides, y.slideTo(e, 0, !1, !0)) : ("auto" === y.params.slidesPerView && y.activeIndex >= 2 * y.loopedSlides || y.activeIndex > y.slides.length - 2 * y.params.slidesPerView) && (e = -y.slides.length + y.activeIndex + y.loopedSlides, e += y.loopedSlides, y.slideTo(e, 0, !1, !0))
          }, y.appendSlide = function(e) {
            if(y.params.loop && y.destroyLoop(), "object" == typeof e && e.length)
              for(var a = 0; a < e.length; a++) e[a] && y.wrapper.append(e[a]);
            else y.wrapper.append(e);
            y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0)
          }, y.prependSlide = function(e) {
            y.params.loop && y.destroyLoop();
            var a = y.activeIndex + 1;
            if("object" == typeof e && e.length) {
              for(var t = 0; t < e.length; t++) e[t] && y.wrapper.prepend(e[t]);
              a = y.activeIndex + e.length
            } else y.wrapper.prepend(e);
            y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.slideTo(a, 0, !1)
          }, y.removeSlide = function(e) {
            y.params.loop && (y.destroyLoop(), y.slides = y.wrapper.children("." + y.params.slideClass));
            var a, t = y.activeIndex;
            if("object" == typeof e && e.length) {
              for(var i = 0; i < e.length; i++) a = e[i], y.slides[a] && y.slides.eq(a).remove(), t > a && t--;
              t = Math.max(t, 0)
            } else a = e, y.slides[a] && y.slides.eq(a).remove(), t > a && t--, t = Math.max(t, 0);
            y.params.loop && y.createLoop(), y.params.observer && y.support.observer || y.update(!0), y.params.loop ? y.slideTo(t + y.loopedSlides, 0, !1) : y.slideTo(t, 0, !1)
          }, y.removeAllSlides = function() {
            for(var e = [], a = 0; a < y.slides.length; a++) e.push(a);
            y.removeSlide(e)
          }, y.effects = {
            fade: {
              setTranslate: function() {
                for(var e = 0; e < y.slides.length; e++) {
                  var a = y.slides.eq(e),
                    t = -a[0].swiperSlideOffset;
                  y.params.virtualTranslate || (t -= y.translate);
                  var i = 0;
                  y.isHorizontal() || (i = t, t = 0);
                  var r = y.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                  a.css({
                    opacity: r
                  }).transform("translate3d(" + t + "px, " + i + "px, 0px)")
                }
              },
              setTransition: function(e) {
                if(y.slides.transition(e), y.params.virtualTranslate && 0 !== e) {
                  var a = !1;
                  y.slides.transitionEnd(function() {
                    if(!a && y) {
                      a = !0, y.animating = !1;
                      for(var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) y.wrapper.trigger(e[t])
                    }
                  })
                }
              }
            },
            flip: {
              setTranslate: function() {
                for(var a = 0; a < y.slides.length; a++) {
                  var t = y.slides.eq(a),
                    i = t[0].progress;
                  y.params.flip.limitRotation && (i = Math.max(Math.min(t[0].progress, 1), -1));
                  var r = -180 * i,
                    s = 0,
                    n = -t[0].swiperSlideOffset,
                    o = 0;
                  if(y.isHorizontal() ? y.rtl && (r = -r) : (o = n, n = 0, s = -r, r = 0), t[0].style.zIndex = -Math.abs(Math.round(i)) + y.slides.length, y.params.flip.slideShadows) {
                    var l = y.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                      p = y.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                    0 === l.length && (l = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), t.append(l)), 0 === p.length && (p = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(p)), l.length && (l[0].style.opacity = Math.max(-i, 0)), p.length && (p[0].style.opacity = Math.max(i, 0))
                  }
                  t.transform("translate3d(" + n + "px, " + o + "px, 0px) rotateX(" + s + "deg) rotateY(" + r + "deg)")
                }
              },
              setTransition: function(a) {
                if(y.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a), y.params.virtualTranslate && 0 !== a) {
                  var t = !1;
                  y.slides.eq(y.activeIndex).transitionEnd(function() {
                    if(!t && y && e(this).hasClass(y.params.slideActiveClass)) {
                      t = !0, y.animating = !1;
                      for(var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < a.length; i++) y.wrapper.trigger(a[i])
                    }
                  })
                }
              }
            },
            cube: {
              setTranslate: function() {
                var a, t = 0;
                y.params.cube.shadow && (y.isHorizontal() ? (0 === (a = y.wrapper.find(".swiper-cube-shadow")).length && (a = e('<div class="swiper-cube-shadow"></div>'), y.wrapper.append(a)), a.css({
                  height: y.width + "px"
                })) : 0 === (a = y.container.find(".swiper-cube-shadow")).length && (a = e('<div class="swiper-cube-shadow"></div>'), y.container.append(a)));
                for(var i = 0; i < y.slides.length; i++) {
                  var r = y.slides.eq(i),
                    s = 90 * i,
                    n = Math.floor(s / 360);
                  y.rtl && (s = -s, n = Math.floor(-s / 360));
                  var o = Math.max(Math.min(r[0].progress, 1), -1),
                    l = 0,
                    p = 0,
                    d = 0;
                  i % 4 == 0 ? (l = 4 * -n * y.size, d = 0) : (i - 1) % 4 == 0 ? (l = 0, d = 4 * -n * y.size) : (i - 2) % 4 == 0 ? (l = y.size + 4 * n * y.size, d = y.size) : (i - 3) % 4 == 0 && (l = -y.size, d = 3 * y.size + 4 * y.size * n), y.rtl && (l = -l), y.isHorizontal() || (p = l, l = 0);
                  var u = "rotateX(" + (y.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (y.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + p + "px, " + d + "px)";
                  if(1 >= o && o > -1 && (t = 90 * i + 90 * o, y.rtl && (t = 90 * -i - 90 * o)), r.transform(u), y.params.cube.slideShadows) {
                    var c = y.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                      m = y.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                    0 === c.length && (c = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), r.append(c)), 0 === m.length && (m = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(m)), c.length && (c[0].style.opacity = Math.max(-o, 0)), m.length && (m[0].style.opacity = Math.max(o, 0))
                  }
                }
                if(y.wrapper.css({
                    "-webkit-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "-moz-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "-ms-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "transform-origin": "50% 50% -" + y.size / 2 + "px"
                  }), y.params.cube.shadow)
                  if(y.isHorizontal()) a.transform("translate3d(0px, " + (y.width / 2 + y.params.cube.shadowOffset) + "px, " + -y.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + y.params.cube.shadowScale + ")");
                  else {
                    var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                      f = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
                      g = y.params.cube.shadowScale,
                      v = y.params.cube.shadowScale / f,
                      w = y.params.cube.shadowOffset;
                    a.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (y.height / 2 + w) + "px, " + -y.height / 2 / v + "px) rotateX(-90deg)")
                  }
                var b = y.isSafari || y.isUiWebView ? -y.size / 2 : 0;
                y.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (y.isHorizontal() ? 0 : t) + "deg) rotateY(" + (y.isHorizontal() ? -t : 0) + "deg)")
              },
              setTransition: function(e) {
                y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), y.params.cube.shadow && !y.isHorizontal() && y.container.find(".swiper-cube-shadow").transition(e)
              }
            },
            coverflow: {
              setTranslate: function() {
                for(var a = y.translate, t = y.isHorizontal() ? -a + y.width / 2 : -a + y.height / 2, i = y.isHorizontal() ? y.params.coverflow.rotate : -y.params.coverflow.rotate, r = y.params.coverflow.depth, s = 0, n = y.slides.length; n > s; s++) {
                  var o = y.slides.eq(s),
                    l = y.slidesSizesGrid[s],
                    p = (t - o[0].swiperSlideOffset - l / 2) / l * y.params.coverflow.modifier,
                    d = y.isHorizontal() ? i * p : 0,
                    u = y.isHorizontal() ? 0 : i * p,
                    c = -r * Math.abs(p),
                    m = y.isHorizontal() ? 0 : y.params.coverflow.stretch * p,
                    h = y.isHorizontal() ? y.params.coverflow.stretch * p : 0;
                  Math.abs(h) < .001 && (h = 0), Math.abs(m) < .001 && (m = 0), Math.abs(c) < .001 && (c = 0), Math.abs(d) < .001 && (d = 0), Math.abs(u) < .001 && (u = 0);
                  var f = "translate3d(" + h + "px," + m + "px," + c + "px)  rotateX(" + u + "deg) rotateY(" + d + "deg)";
                  if(o.transform(f), o[0].style.zIndex = 1 - Math.abs(Math.round(p)), y.params.coverflow.slideShadows) {
                    var g = y.isHorizontal() ? o.find(".swiper-slide-shadow-left") : o.find(".swiper-slide-shadow-top"),
                      v = y.isHorizontal() ? o.find(".swiper-slide-shadow-right") : o.find(".swiper-slide-shadow-bottom");
                    0 === g.length && (g = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "left" : "top") + '"></div>'), o.append(g)), 0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (y.isHorizontal() ? "right" : "bottom") + '"></div>'), o.append(v)), g.length && (g[0].style.opacity = p > 0 ? p : 0), v.length && (v[0].style.opacity = -p > 0 ? -p : 0)
                  }
                }
                y.browser.ie && (y.wrapper[0].style.perspectiveOrigin = t + "px 50%")
              },
              setTransition: function(e) {
                y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
              }
            }
          }, y.lazy = {
            initialImageLoaded: !1,
            loadImageInSlide: function(a, t) {
              if(void 0 !== a && (void 0 === t && (t = !0), 0 !== y.slides.length)) {
                var i = y.slides.eq(a),
                  r = i.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                !i.hasClass("swiper-lazy") || i.hasClass("swiper-lazy-loaded") || i.hasClass("swiper-lazy-loading") || (r = r.add(i[0])), 0 !== r.length && r.each(function() {
                  var a = e(this);
                  a.addClass("swiper-lazy-loading");
                  var r = a.attr("data-background"),
                    s = a.attr("data-src"),
                    n = a.attr("data-srcset");
                  y.loadImage(a[0], s || r, n, !1, function() {
                    if(r ? (a.css("background-image", 'url("' + r + '")'), a.removeAttr("data-background")) : (n && (a.attr("srcset", n), a.removeAttr("data-srcset")), s && (a.attr("src", s), a.removeAttr("data-src"))), a.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"), i.find(".swiper-lazy-preloader, .preloader").remove(), y.params.loop && t) {
                      var e = i.attr("data-swiper-slide-index");
                      if(i.hasClass(y.params.slideDuplicateClass)) {
                        var o = y.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + y.params.slideDuplicateClass + ")");
                        y.lazy.loadImageInSlide(o.index(), !1)
                      } else {
                        var l = y.wrapper.children("." + y.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                        y.lazy.loadImageInSlide(l.index(), !1)
                      }
                    }
                    y.emit("onLazyImageReady", y, i[0], a[0])
                  }), y.emit("onLazyImageLoad", y, i[0], a[0])
                })
              }
            },
            load: function() {
              var a;
              if(y.params.watchSlidesVisibility) y.wrapper.children("." + y.params.slideVisibleClass).each(function() {
                y.lazy.loadImageInSlide(e(this).index())
              });
              else if(y.params.slidesPerView > 1)
                for(a = y.activeIndex; a < y.activeIndex + y.params.slidesPerView; a++) y.slides[a] && y.lazy.loadImageInSlide(a);
              else y.lazy.loadImageInSlide(y.activeIndex);
              if(y.params.lazyLoadingInPrevNext)
                if(y.params.slidesPerView > 1 || y.params.lazyLoadingInPrevNextAmount && y.params.lazyLoadingInPrevNextAmount > 1) {
                  var t = y.params.lazyLoadingInPrevNextAmount,
                    i = y.params.slidesPerView,
                    r = Math.min(y.activeIndex + i + Math.max(t, i), y.slides.length),
                    s = Math.max(y.activeIndex - Math.max(i, t), 0);
                  for(a = y.activeIndex + y.params.slidesPerView; r > a; a++) y.slides[a] && y.lazy.loadImageInSlide(a);
                  for(a = s; a < y.activeIndex; a++) y.slides[a] && y.lazy.loadImageInSlide(a)
                } else {
                  var n = y.wrapper.children("." + y.params.slideNextClass);
                  n.length > 0 && y.lazy.loadImageInSlide(n.index());
                  var o = y.wrapper.children("." + y.params.slidePrevClass);
                  o.length > 0 && y.lazy.loadImageInSlide(o.index())
                }
            },
            onTransitionStart: function() {
              y.params.lazyLoading && (y.params.lazyLoadingOnTransitionStart || !y.params.lazyLoadingOnTransitionStart && !y.lazy.initialImageLoaded) && y.lazy.load()
            },
            onTransitionEnd: function() {
              y.params.lazyLoading && !y.params.lazyLoadingOnTransitionStart && y.lazy.load()
            }
          }, y.scrollbar = {
            isTouched: !1,
            setDragPosition: function(e) {
              var a = y.scrollbar,
                t = (y.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - a.track.offset()[y.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                i = -y.minTranslate() * a.moveDivider,
                r = -y.maxTranslate() * a.moveDivider;
              i > t ? t = i : t > r && (t = r), t = -t / a.moveDivider, y.updateProgress(t), y.setWrapperTranslate(t, !0)
            },
            dragStart: function(e) {
              var a = y.scrollbar;
              a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), y.params.scrollbarHide && a.track.css("opacity", 1), y.wrapper.transition(100), a.drag.transition(100), y.emit("onScrollbarDragStart", y)
            },
            dragMove: function(e) {
              var a = y.scrollbar;
              a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), y.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), y.emit("onScrollbarDragMove", y))
            },
            dragEnd: function(e) {
              var a = y.scrollbar;
              a.isTouched && (a.isTouched = !1, y.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function() {
                a.track.css("opacity", 0), a.track.transition(400)
              }, 1e3)), y.emit("onScrollbarDragEnd", y), y.params.scrollbarSnapOnRelease && y.slideReset())
            },
            enableDraggable: function() {
              var a = y.scrollbar,
                t = y.support.touch ? a.track : document;
              e(a.track).on(y.touchEvents.start, a.dragStart), e(t).on(y.touchEvents.move, a.dragMove), e(t).on(y.touchEvents.end, a.dragEnd)
            },
            disableDraggable: function() {
              var a = y.scrollbar,
                t = y.support.touch ? a.track : document;
              e(a.track).off(y.touchEvents.start, a.dragStart), e(t).off(y.touchEvents.move, a.dragMove), e(t).off(y.touchEvents.end, a.dragEnd)
            },
            set: function() {
              if(y.params.scrollbar) {
                var a = y.scrollbar;
                a.track = e(y.params.scrollbar), y.params.uniqueNavElements && "string" == typeof y.params.scrollbar && a.track.length > 1 && 1 === y.container.find(y.params.scrollbar).length && (a.track = y.container.find(y.params.scrollbar)), a.drag = a.track.find(".swiper-scrollbar-drag"), 0 === a.drag.length && (a.drag = e('<div class="swiper-scrollbar-drag"></div>'), a.track.append(a.drag)), a.drag[0].style.width = "", a.drag[0].style.height = "", a.trackSize = y.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight, a.divider = y.size / y.virtualSize, a.moveDivider = a.divider * (a.trackSize / y.size), a.dragSize = a.trackSize * a.divider, y.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px", a.divider >= 1 ? a.track[0].style.display = "none" : a.track[0].style.display = "", y.params.scrollbarHide && (a.track[0].style.opacity = 0)
              }
            },
            setTranslate: function() {
              if(y.params.scrollbar) {
                var e, a = y.scrollbar,
                  t = (y.translate, a.dragSize);
                e = (a.trackSize - a.dragSize) * y.progress, y.rtl && y.isHorizontal() ? (e = -e) > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e) : 0 > e ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), y.isHorizontal() ? (y.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (y.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), y.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function() {
                  a.track[0].style.opacity = 0, a.track.transition(400)
                }, 1e3))
              }
            },
            setTransition: function(e) {
              y.params.scrollbar && y.scrollbar.drag.transition(e)
            }
          }, y.controller = {
            LinearSpline: function(e, a) {
              this.x = e, this.y = a, this.lastIndex = e.length - 1;
              var t, i;
              this.x.length, this.interpolate = function(e) {
                return e ? (i = r(this.x, e), t = i - 1, (e - this.x[t]) * (this.y[i] - this.y[t]) / (this.x[i] - this.x[t]) + this.y[t]) : 0
              };
              var r = function() {
                var e, a, t;
                return function(i, r) {
                  for(a = -1, e = i.length; e - a > 1;) i[t = e + a >> 1] <= r ? a = t : e = t;
                  return e
                }
              }()
            },
            getInterpolateFunction: function(e) {
              y.controller.spline || (y.controller.spline = y.params.loop ? new y.controller.LinearSpline(y.slidesGrid, e.slidesGrid) : new y.controller.LinearSpline(y.snapGrid, e.snapGrid))
            },
            setTranslate: function(e, t) {
              function i(a) {
                e = a.rtl && "horizontal" === a.params.direction ? -y.translate : y.translate, "slide" === y.params.controlBy && (y.controller.getInterpolateFunction(a), s = -y.controller.spline.interpolate(-e)), s && "container" !== y.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (y.maxTranslate() - y.minTranslate()), s = (e - y.minTranslate()) * r + a.minTranslate()), y.params.controlInverse && (s = a.maxTranslate() - s), a.updateProgress(s), a.setWrapperTranslate(s, !1, y), a.updateActiveIndex()
              }
              var r, s, n = y.params.control;
              if(y.isArray(n))
                for(var o = 0; o < n.length; o++) n[o] !== t && n[o] instanceof a && i(n[o]);
              else n instanceof a && t !== n && i(n)
            },
            setTransition: function(e, t) {
              function i(a) {
                a.setWrapperTransition(e, y), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function() {
                  s && (a.params.loop && "slide" === y.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                }))
              }
              var r, s = y.params.control;
              if(y.isArray(s))
                for(r = 0; r < s.length; r++) s[r] !== t && s[r] instanceof a && i(s[r]);
              else s instanceof a && t !== s && i(s)
            }
          }, y.hashnav = {
            init: function() {
              if(y.params.hashnav) {
                y.hashnav.initialized = !0;
                var e = document.location.hash.replace("#", "");
                if(e)
                  for(var a = 0, t = y.slides.length; t > a; a++) {
                    var i = y.slides.eq(a);
                    if(i.attr("data-hash") === e && !i.hasClass(y.params.slideDuplicateClass)) {
                      var r = i.index();
                      y.slideTo(r, 0, y.params.runCallbacksOnInit, !0)
                    }
                  }
              }
            },
            setHash: function() {
              y.hashnav.initialized && y.params.hashnav && (document.location.hash = y.slides.eq(y.activeIndex).attr("data-hash") || "")
            }
          }, y.disableKeyboardControl = function() {
            y.params.keyboardControl = !1, e(document).off("keydown", p)
          }, y.enableKeyboardControl = function() {
            y.params.keyboardControl = !0, e(document).on("keydown", p)
          }, y.mousewheel = {
            event: !1,
            lastScrollTime: (new window.Date).getTime()
          }, y.params.mousewheelControl) {
          try {
            new window.WheelEvent("wheel"), y.mousewheel.event = "wheel"
          } catch(e) {
            (window.WheelEvent || y.container[0] && "wheel" in y.container[0]) && (y.mousewheel.event = "wheel")
          }!y.mousewheel.event && window.WheelEvent, y.mousewheel.event || void 0 === document.onmousewheel || (y.mousewheel.event = "mousewheel"), y.mousewheel.event || (y.mousewheel.event = "DOMMouseScroll")
        }
        y.disableMousewheelControl = function() {
          return !!y.mousewheel.event && (y.container.off(y.mousewheel.event, d), !0)
        }, y.enableMousewheelControl = function() {
          return !!y.mousewheel.event && (y.container.on(y.mousewheel.event, d), !0)
        }, y.parallax = {
          setTranslate: function() {
            y.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
              u(this, y.progress)
            }), y.slides.each(function() {
              var a = e(this);
              a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                u(this, Math.min(Math.max(a[0].progress, -1), 1))
              })
            })
          },
          setTransition: function(a) {
            void 0 === a && (a = y.params.speed), y.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
              var t = e(this),
                i = parseInt(t.attr("data-swiper-parallax-duration"), 10) || a;
              0 === a && (i = 0), t.transition(i)
            })
          }
        }, y._plugins = [];
        for(var N in y.plugins) {
          var R = y.plugins[N](y, y.params[N]);
          R && y._plugins.push(R)
        }
        return y.callPlugins = function(e) {
          for(var a = 0; a < y._plugins.length; a++) e in y._plugins[a] && y._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        }, y.emitterEventListeners = {}, y.emit = function(e) {
          y.params[e] && y.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          var a;
          if(y.emitterEventListeners[e])
            for(a = 0; a < y.emitterEventListeners[e].length; a++) y.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          y.callPlugins && y.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        }, y.on = function(e, a) {
          return e = c(e), y.emitterEventListeners[e] || (y.emitterEventListeners[e] = []), y.emitterEventListeners[e].push(a), y
        }, y.off = function(e, a) {
          var t;
          if(e = c(e), void 0 === a) return y.emitterEventListeners[e] = [], y;
          if(y.emitterEventListeners[e] && 0 !== y.emitterEventListeners[e].length) {
            for(t = 0; t < y.emitterEventListeners[e].length; t++) y.emitterEventListeners[e][t] === a && y.emitterEventListeners[e].splice(t, 1);
            return y
          }
        }, y.once = function(e, a) {
          e = c(e);
          var t = function() {
            a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), y.off(e, t)
          };
          return y.on(e, t), y
        }, y.a11y = {
          makeFocusable: function(e) {
            return e.attr("tabIndex", "0"), e
          },
          addRole: function(e, a) {
            return e.attr("role", a), e
          },
          addLabel: function(e, a) {
            return e.attr("aria-label", a), e
          },
          disable: function(e) {
            return e.attr("aria-disabled", !0), e
          },
          enable: function(e) {
            return e.attr("aria-disabled", !1), e
          },
          onEnterKey: function(a) {
            13 === a.keyCode && (e(a.target).is(y.params.nextButton) ? (y.onClickNext(a), y.isEnd ? y.a11y.notify(y.params.lastSlideMessage) : y.a11y.notify(y.params.nextSlideMessage)) : e(a.target).is(y.params.prevButton) && (y.onClickPrev(a), y.isBeginning ? y.a11y.notify(y.params.firstSlideMessage) : y.a11y.notify(y.params.prevSlideMessage)), e(a.target).is("." + y.params.bulletClass) && e(a.target)[0].click())
          },
          liveRegion: e('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
          notify: function(e) {
            var a = y.a11y.liveRegion;
            0 !== a.length && (a.html(""), a.html(e))
          },
          init: function() {
            y.params.nextButton && y.nextButton && y.nextButton.length > 0 && (y.a11y.makeFocusable(y.nextButton), y.a11y.addRole(y.nextButton, "button"), y.a11y.addLabel(y.nextButton, y.params.nextSlideMessage)), y.params.prevButton && y.prevButton && y.prevButton.length > 0 && (y.a11y.makeFocusable(y.prevButton), y.a11y.addRole(y.prevButton, "button"), y.a11y.addLabel(y.prevButton, y.params.prevSlideMessage)), e(y.container).append(y.a11y.liveRegion)
          },
          initPagination: function() {
            y.params.pagination && y.params.paginationClickable && y.bullets && y.bullets.length && y.bullets.each(function() {
              var a = e(this);
              y.a11y.makeFocusable(a), y.a11y.addRole(a, "button"), y.a11y.addLabel(a, y.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
            })
          },
          destroy: function() {
            y.a11y.liveRegion && y.a11y.liveRegion.length > 0 && y.a11y.liveRegion.remove()
          }
        }, y.init = function() {
          y.params.loop && y.createLoop(), y.updateContainerSize(), y.updateSlidesSize(), y.updatePagination(), y.params.scrollbar && y.scrollbar && (y.scrollbar.set(), y.params.scrollbarDraggable && y.scrollbar.enableDraggable()), "slide" !== y.params.effect && y.effects[y.params.effect] && (y.params.loop || y.updateProgress(), y.effects[y.params.effect].setTranslate()), y.params.loop ? y.slideTo(y.params.initialSlide + y.loopedSlides, 0, y.params.runCallbacksOnInit) : (y.slideTo(y.params.initialSlide, 0, y.params.runCallbacksOnInit), 0 === y.params.initialSlide && (y.parallax && y.params.parallax && y.parallax.setTranslate(), y.lazy && y.params.lazyLoading && (y.lazy.load(), y.lazy.initialImageLoaded = !0))), y.attachEvents(), y.params.observer && y.support.observer && y.initObservers(), y.params.preloadImages && !y.params.lazyLoading && y.preloadImages(), y.params.autoplay && y.startAutoplay(), y.params.keyboardControl && y.enableKeyboardControl && y.enableKeyboardControl(), y.params.mousewheelControl && y.enableMousewheelControl && y.enableMousewheelControl(), y.params.hashnav && y.hashnav && y.hashnav.init(), y.params.a11y && y.a11y && y.a11y.init(), y.emit("onInit", y)
        }, y.cleanupStyles = function() {
          y.container.removeClass(y.classNames.join(" ")).removeAttr("style"), y.wrapper.removeAttr("style"), y.slides && y.slides.length && y.slides.removeClass([y.params.slideVisibleClass, y.params.slideActiveClass, y.params.slideNextClass, y.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), y.paginationContainer && y.paginationContainer.length && y.paginationContainer.removeClass(y.params.paginationHiddenClass), y.bullets && y.bullets.length && y.bullets.removeClass(y.params.bulletActiveClass), y.params.prevButton && e(y.params.prevButton).removeClass(y.params.buttonDisabledClass), y.params.nextButton && e(y.params.nextButton).removeClass(y.params.buttonDisabledClass), y.params.scrollbar && y.scrollbar && (y.scrollbar.track && y.scrollbar.track.length && y.scrollbar.track.removeAttr("style"), y.scrollbar.drag && y.scrollbar.drag.length && y.scrollbar.drag.removeAttr("style"))
        }, y.destroy = function(e, a) {
          y.detachEvents(), y.stopAutoplay(), y.params.scrollbar && y.scrollbar && y.params.scrollbarDraggable && y.scrollbar.disableDraggable(), y.params.loop && y.destroyLoop(), a && y.cleanupStyles(), y.disconnectObservers(), y.params.keyboardControl && y.disableKeyboardControl && y.disableKeyboardControl(), y.params.mousewheelControl && y.disableMousewheelControl && y.disableMousewheelControl(), y.params.a11y && y.a11y && y.a11y.destroy(), y.emit("onDestroy"), !1 !== e && (y = null)
        }, y.init(), y
      }
    };
    a.prototype = {
      isSafari: function() {
        var e = navigator.userAgent.toLowerCase();
        return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
      }(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
      isArray: function(e) {
        return "[object Array]" === Object.prototype.toString.apply(e)
      },
      browser: {
        ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
      },
      device: function() {
        var e = navigator.userAgent,
          a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
          t = e.match(/(iPad).*OS\s([\d_]+)/),
          i = e.match(/(iPod)(.*OS\s([\d_]+))?/),
          r = !t && e.match(/(iPhone\sOS)\s([\d_]+)/);
        return {
          ios: t || r || i,
          android: a
        }
      }(),
      support: {
        touch: window.Modernizr && !0 === Modernizr.touch || !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
        transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function() {
          var e = document.createElement("div").style;
          return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
        }(),
        flexbox: function() {
          for(var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
            if(a[t] in e) return !0
        }(),
        observer: "MutationObserver" in window || "WebkitMutationObserver" in window
      },
      plugins: {}
    };
    for(var t = function() {
        var e = function(e) {
            var a = this,
              t = 0;
            for(t = 0; t < e.length; t++) a[t] = e[t];
            return a.length = e.length, this
          },
          a = function(a, t) {
            var i = [],
              r = 0;
            if(a && !t && a instanceof e) return a;
            if(a)
              if("string" == typeof a) {
                var s, n, o = a.trim();
                if(o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
                  var l = "div";
                  for(0 === o.indexOf("<li") && (l = "ul"), 0 === o.indexOf("<tr") && (l = "tbody"), (0 === o.indexOf("<td") || 0 === o.indexOf("<th")) && (l = "tr"), 0 === o.indexOf("<tbody") && (l = "table"), 0 === o.indexOf("<option") && (l = "select"), (n = document.createElement(l)).innerHTML = a, r = 0; r < n.childNodes.length; r++) i.push(n.childNodes[r])
                } else
                  for(s = t || "#" !== a[0] || a.match(/[ .<>:~]/) ? (t || document).querySelectorAll(a) : [document.getElementById(a.split("#")[1])], r = 0; r < s.length; r++) s[r] && i.push(s[r])
              } else if(a.nodeType || a === window || a === document) i.push(a);
            else if(a.length > 0 && a[0].nodeType)
              for(r = 0; r < a.length; r++) i.push(a[r]);
            return new e(i)
          };
        return e.prototype = {
          addClass: function(e) {
            if(void 0 === e) return this;
            for(var a = e.split(" "), t = 0; t < a.length; t++)
              for(var i = 0; i < this.length; i++) this[i].classList.add(a[t]);
            return this
          },
          removeClass: function(e) {
            for(var a = e.split(" "), t = 0; t < a.length; t++)
              for(var i = 0; i < this.length; i++) this[i].classList.remove(a[t]);
            return this
          },
          hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
          },
          toggleClass: function(e) {
            for(var a = e.split(" "), t = 0; t < a.length; t++)
              for(var i = 0; i < this.length; i++) this[i].classList.toggle(a[t]);
            return this
          },
          attr: function(e, a) {
            if(1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for(var t = 0; t < this.length; t++)
              if(2 === arguments.length) this[t].setAttribute(e, a);
              else
                for(var i in e) this[t][i] = e[i], this[t].setAttribute(i, e[i]);
            return this
          },
          removeAttr: function(e) {
            for(var a = 0; a < this.length; a++) this[a].removeAttribute(e);
            return this
          },
          data: function(e, a) {
            if(void 0 !== a) {
              for(var t = 0; t < this.length; t++) {
                var i = this[t];
                i.dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = a
              }
              return this
            }
            if(this[0]) {
              var r = this[0].getAttribute("data-" + e);
              return r || (this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0)
            }
          },
          transform: function(e) {
            for(var a = 0; a < this.length; a++) {
              var t = this[a].style;
              t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
            }
            return this
          },
          transition: function(e) {
            "string" != typeof e && (e += "ms");
            for(var a = 0; a < this.length; a++) {
              var t = this[a].style;
              t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
            }
            return this
          },
          on: function(e, t, i, r) {
            function s(e) {
              var r = e.target;
              if(a(r).is(t)) i.call(r, e);
              else
                for(var s = a(r).parents(), n = 0; n < s.length; n++) a(s[n]).is(t) && i.call(s[n], e)
            }
            var n, o, l = e.split(" ");
            for(n = 0; n < this.length; n++)
              if("function" == typeof t || !1 === t)
                for("function" == typeof t && (i = arguments[1], r = arguments[2] || !1), o = 0; o < l.length; o++) this[n].addEventListener(l[o], i, r);
              else
                for(o = 0; o < l.length; o++) this[n].dom7LiveListeners || (this[n].dom7LiveListeners = []), this[n].dom7LiveListeners.push({
                  listener: i,
                  liveListener: s
                }), this[n].addEventListener(l[o], s, r);
            return this
          },
          off: function(e, a, t, i) {
            for(var r = e.split(" "), s = 0; s < r.length; s++)
              for(var n = 0; n < this.length; n++)
                if("function" == typeof a || !1 === a) "function" == typeof a && (t = arguments[1], i = arguments[2] || !1), this[n].removeEventListener(r[s], t, i);
                else if(this[n].dom7LiveListeners)
              for(var o = 0; o < this[n].dom7LiveListeners.length; o++) this[n].dom7LiveListeners[o].listener === t && this[n].removeEventListener(r[s], this[n].dom7LiveListeners[o].liveListener, i);
            return this
          },
          once: function(e, a, t, i) {
            function r(n) {
              t(n), s.off(e, a, r, i)
            }
            var s = this;
            "function" == typeof a && (a = !1, t = arguments[1], i = arguments[2]), s.on(e, a, r, i)
          },
          trigger: function(e, a) {
            for(var t = 0; t < this.length; t++) {
              var i;
              try {
                i = new window.CustomEvent(e, {
                  detail: a,
                  bubbles: !0,
                  cancelable: !0
                })
              } catch(t) {
                (i = document.createEvent("Event")).initEvent(e, !0, !0), i.detail = a
              }
              this[t].dispatchEvent(i)
            }
            return this
          },
          transitionEnd: function(e) {
            function a(s) {
              if(s.target === this)
                for(e.call(this, s), t = 0; t < i.length; t++) r.off(i[t], a)
            }
            var t, i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
              r = this;
            if(e)
              for(t = 0; t < i.length; t++) r.on(i[t], a);
            return this
          },
          width: function() {
            return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
          },
          outerWidth: function(e) {
            return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
          },
          height: function() {
            return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
          },
          outerHeight: function(e) {
            return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
          },
          offset: function() {
            if(this.length > 0) {
              var e = this[0],
                a = e.getBoundingClientRect(),
                t = document.body,
                i = e.clientTop || t.clientTop || 0,
                r = e.clientLeft || t.clientLeft || 0,
                s = window.pageYOffset || e.scrollTop,
                n = window.pageXOffset || e.scrollLeft;
              return {
                top: a.top + s - i,
                left: a.left + n - r
              }
            }
            return null
          },
          css: function(e, a) {
            var t;
            if(1 === arguments.length) {
              if("string" != typeof e) {
                for(t = 0; t < this.length; t++)
                  for(var i in e) this[t].style[i] = e[i];
                return this
              }
              if(this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if(2 === arguments.length && "string" == typeof e) {
              for(t = 0; t < this.length; t++) this[t].style[e] = a;
              return this
            }
            return this
          },
          each: function(e) {
            for(var a = 0; a < this.length; a++) e.call(this[a], a, this[a]);
            return this
          },
          html: function(e) {
            if(void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for(var a = 0; a < this.length; a++) this[a].innerHTML = e;
            return this
          },
          text: function(e) {
            if(void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for(var a = 0; a < this.length; a++) this[a].textContent = e;
            return this
          },
          is: function(t) {
            if(!this[0]) return !1;
            var i, r;
            if("string" == typeof t) {
              var s = this[0];
              if(s === document) return t === document;
              if(s === window) return t === window;
              if(s.matches) return s.matches(t);
              if(s.webkitMatchesSelector) return s.webkitMatchesSelector(t);
              if(s.mozMatchesSelector) return s.mozMatchesSelector(t);
              if(s.msMatchesSelector) return s.msMatchesSelector(t);
              for(i = a(t), r = 0; r < i.length; r++)
                if(i[r] === this[0]) return !0;
              return !1
            }
            if(t === document) return this[0] === document;
            if(t === window) return this[0] === window;
            if(t.nodeType || t instanceof e) {
              for(i = t.nodeType ? [t] : t, r = 0; r < i.length; r++)
                if(i[r] === this[0]) return !0;
              return !1
            }
            return !1
          },
          index: function() {
            if(this[0]) {
              for(var e = this[0], a = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && a++;
              return a
            }
          },
          eq: function(a) {
            if(void 0 === a) return this;
            var t, i = this.length;
            return a > i - 1 ? new e([]) : 0 > a ? (t = i + a, new e(0 > t ? [] : [this[t]])) : new e([this[a]])
          },
          append: function(a) {
            var t, i;
            for(t = 0; t < this.length; t++)
              if("string" == typeof a) {
                var r = document.createElement("div");
                for(r.innerHTML = a; r.firstChild;) this[t].appendChild(r.firstChild)
              } else if(a instanceof e)
              for(i = 0; i < a.length; i++) this[t].appendChild(a[i]);
            else this[t].appendChild(a);
            return this
          },
          prepend: function(a) {
            var t, i;
            for(t = 0; t < this.length; t++)
              if("string" == typeof a) {
                var r = document.createElement("div");
                for(r.innerHTML = a, i = r.childNodes.length - 1; i >= 0; i--) this[t].insertBefore(r.childNodes[i], this[t].childNodes[0])
              } else if(a instanceof e)
              for(i = 0; i < a.length; i++) this[t].insertBefore(a[i], this[t].childNodes[0]);
            else this[t].insertBefore(a, this[t].childNodes[0]);
            return this
          },
          insertBefore: function(e) {
            for(var t = a(e), i = 0; i < this.length; i++)
              if(1 === t.length) t[0].parentNode.insertBefore(this[i], t[0]);
              else if(t.length > 1)
              for(var r = 0; r < t.length; r++) t[r].parentNode.insertBefore(this[i].cloneNode(!0), t[r])
          },
          insertAfter: function(e) {
            for(var t = a(e), i = 0; i < this.length; i++)
              if(1 === t.length) t[0].parentNode.insertBefore(this[i], t[0].nextSibling);
              else if(t.length > 1)
              for(var r = 0; r < t.length; r++) t[r].parentNode.insertBefore(this[i].cloneNode(!0), t[r].nextSibling)
          },
          next: function(t) {
            return new e(this.length > 0 ? t ? this[0].nextElementSibling && a(this[0].nextElementSibling).is(t) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
          },
          nextAll: function(t) {
            var i = [],
              r = this[0];
            if(!r) return new e([]);
            for(; r.nextElementSibling;) {
              var s = r.nextElementSibling;
              t ? a(s).is(t) && i.push(s) : i.push(s), r = s
            }
            return new e(i)
          },
          prev: function(t) {
            return new e(this.length > 0 ? t ? this[0].previousElementSibling && a(this[0].previousElementSibling).is(t) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
          },
          prevAll: function(t) {
            var i = [],
              r = this[0];
            if(!r) return new e([]);
            for(; r.previousElementSibling;) {
              var s = r.previousElementSibling;
              t ? a(s).is(t) && i.push(s) : i.push(s), r = s
            }
            return new e(i)
          },
          parent: function(e) {
            for(var t = [], i = 0; i < this.length; i++) e ? a(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode);
            return a(a.unique(t))
          },
          parents: function(e) {
            for(var t = [], i = 0; i < this.length; i++)
              for(var r = this[i].parentNode; r;) e ? a(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
            return a(a.unique(t))
          },
          find: function(a) {
            for(var t = [], i = 0; i < this.length; i++)
              for(var r = this[i].querySelectorAll(a), s = 0; s < r.length; s++) t.push(r[s]);
            return new e(t)
          },
          children: function(t) {
            for(var i = [], r = 0; r < this.length; r++)
              for(var s = this[r].childNodes, n = 0; n < s.length; n++) t ? 1 === s[n].nodeType && a(s[n]).is(t) && i.push(s[n]) : 1 === s[n].nodeType && i.push(s[n]);
            return new e(a.unique(i))
          },
          remove: function() {
            for(var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
          },
          add: function() {
            var e, t, i = this;
            for(e = 0; e < arguments.length; e++) {
              var r = a(arguments[e]);
              for(t = 0; t < r.length; t++) i[i.length] = r[t], i.length++
            }
            return i
          }
        }, a.fn = e.prototype, a.unique = function(e) {
          for(var a = [], t = 0; t < e.length; t++) - 1 === a.indexOf(e[t]) && a.push(e[t]);
          return a
        }, a
      }(), i = ["jQuery", "Zepto", "Dom7"], r = 0; r < i.length; r++) window[i[r]] && function(e) {
      e.fn.swiper = function(t) {
        var i;
        return e(this).each(function() {
          var e = new a(this, t);
          i || (i = e)
        }), i
      }
    }(window[i[r]]);
    var s;
    (s = void 0 === t ? window.Dom7 || window.Zepto || window.jQuery : t) && ("transitionEnd" in s.fn || (s.fn.transitionEnd = function(e) {
      function a(s) {
        if(s.target === this)
          for(e.call(this, s), t = 0; t < i.length; t++) r.off(i[t], a)
      }
      var t, i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
        r = this;
      if(e)
        for(t = 0; t < i.length; t++) r.on(i[t], a);
      return this
    }), "transform" in s.fn || (s.fn.transform = function(e) {
      for(var a = 0; a < this.length; a++) {
        var t = this[a].style;
        t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e
      }
      return this
    }), "transition" in s.fn || (s.fn.transition = function(e) {
      "string" != typeof e && (e += "ms");
      for(var a = 0; a < this.length; a++) {
        var t = this[a].style;
        t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e
      }
      return this
    })), window.Swiper = a
  }(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper
  });
