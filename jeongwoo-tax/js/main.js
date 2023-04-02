$(document).ready(function() {

    const $WINDOW = $(window);

    const MAININDEX = {
        
        swiperEvt() {
            // 메인페이지 후기 스와이퍼
            var reviewSwiper = new Swiper('.swiper-container.review_swiper', {
                slidesPerView: 'auto',
                loop: true,
                // loopedSlides: 4,
                speed: 700,
                autoplay: true,
                breakpoints: {
                    769: {
                        
                    }
                },
            });
        },
       
        headerNameEvt() {
            var pageUrl = window.location.href; 
            $WINDOW.on('load', function(){ 
                setTimeout(() => {
                    if (pageUrl) {
                        var $isHeaderName = $('.breadcrumb_list_header').text();
                        var $fixedHeaderName = $('.sec_header .inner_1440 .title');
            
                        $fixedHeaderName.text($isHeaderName);
                    } 
                }, 100);
            });


            $WINDOW.load(function() {
            //     var headerTxt = () => {
            //         var $isHeaderName = $('.breadcrumb_list_header').text();
            //         var $fixedHeaderName = $('.sec_header .inner_1440 .title');
        
            //         $fixedHeaderName.text($isHeaderName);
            //     }
            //     headerTxt();
            // alert()
            })
        },

        tabEvt() {
            // 법무법인 탭 기능
            var lawyerTab = () => {
                let $tabList = $('.sec_law-firm .contents_area .tab_list ul li');
                let $contentsList = $('.sec_law-firm .tab_contents .contents_list');
                
                $tabList.on('click', function() {
                    let $this = $(this);
                    let $idx = $this.index();
                    let $isName = $('.breadcrumb_list_name');
                    let $fixedName = $contentsList.eq($idx).find('.lawyer_name').text();

                    $tabList.eq($idx).addClass('on').siblings().removeClass('on');
                    $contentsList.eq($idx).addClass('on').siblings().removeClass('on');


                    $isName.text($fixedName);
                    

                })
            }
            lawyerTab();
        },
    
        init: function() {
            this.swiperEvt();
            this.headerNameEvt();
            this.tabEvt();
        }
    };
    
    MAININDEX.init();
})