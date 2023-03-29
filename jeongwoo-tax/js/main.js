;(function(){
    'use strict';
    var $window = $(window);
    var $wrap = $('.sec_project_wrap');

    var mainIndex = {

        
        anchorEvt: function() {
            function pixelToVw(pc, mo) {
                var result = 1;
                var w = $window.outerWidth();
                var isMobile = w < 769;
                if (pc || mo) {
                    if (isMobile) {
                        result = mo >= 0 ? Math.min(mo, mo/720 * w) : Math.max(mo, mo/720 * w);
                    } else {
                        result = pc >= 0 ? Math.min(pc, pc/1440 * w) : Math.max(pc, pc/1440 * w);
                    }
                }

                return result;
            }

            // 페이지 내 앵커드버튼 처리
            $wrap.off('click.anchor').on('click.anchor', '[data-role="btnAnchor"]', function(e) {
                e.preventDefault();
                var $this = $(this);
                var target = $this.attr('data-target');
                var speed = $this.attr('data-speed') == 0 ? 0 : $this.attr('data-speed') || 500;
                var scroll = [1,1];
                var dataScroll = $this.attr('data-scroll');
                
                console.log('눌렀따');

                if (dataScroll) {
                    dataScroll = dataScroll.split('|');
                    scroll[0] = dataScroll[0];
                    scroll[1] = dataScroll[1] ? dataScroll[1] : scroll[1];
                }

                $('html, body').stop().animate({ 
                    scrollTop:$(target).offset().top + pixelToVw(scroll[0], scroll[1])
                }, speed);
            });

            function getParameterByName(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(location.search);
                return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            // 페이지 접속시 앵커드 처리 - 필요하면 변경해서 사용
            var paramsData = {
                about: {el:$('#sec_about')},
                rooms: {el:$('#sec_room_pre')},
                test02: {el:$('.sec_accordian'), scroll:[0, -50]}
            }

            var anc = getParameterByName('anc');

            function scrollPage(data) {
                $('html, body').stop().animate({scrollTop:data.el.offset().top + (data.scroll && data.scroll.length > 1 ? pixelToVw(data.scroll[0], data.scroll[1]) : 1)}, 500);
            }

            $window.on('load', function() {
                try {
               scrollPage(paramsData[anc]);
            } catch(err) {
               // console.log('해당하는 앵커 영역이 없습니다.');
            }
            });
        },
        bannerSwiper: function () {
            var reSwiper = new Swiper('.swiper-container.banner-swiper', {
                slidesPerView: 'auto',
                centeredSlides: true, 
                pagination: { 
                    el: ".swiper-pagination",
                    type: 'bullets',
                    clickable: true, 
                },
                loop: false,
                // loopedSlides: 4,
                speed: 700,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                navigation:{
                    nextEl:".swiper-button-next",
                    prevEl:".swiper-button-prev", 
                },
                breakpoints: {
                    769: {
                        
                    }
                },
            });
        },

        tabEvt: function() {
            $('.tab_title li').on('click' , function() {
                var idx = $(this).index();
                $(".tab_title li").removeClass("on");
                $(".tab_title li").eq(idx).addClass("on");
                $(".tab_cont > div").hide();
                $(".tab_cont > div").eq(idx).show();
            })
        },


        init: function() {
            this.anchorEvt();
            this.bannerSwiper();
            this.tabEvt();
        }
    };

    mainIndex.init();

})();