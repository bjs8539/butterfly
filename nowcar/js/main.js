;(function(){
    'use strict';
    var $window = $(window);
    var $wrap = $('.sec_project_wrap');

    var mainIndex = {

        // 신청하기 유효성 검사
        applyBtn: function() {
            var $apply_btn = $('.apply_btn');
            var checked = $("input[name=agree_01input]").is(':checked');

            $apply_btn.on('click', function(e){
                e.preventDefault();
                
                // 이름 빈값 유효성
                if($("input[name=nameinput]").val() == ""){
                    alert("이름을 입력해주세요.");
                    $("#nameinput").focus();
                    return false;
                };

                // 전화번호 유효성
                if($("input[name=phoneinput]").val() == ""){
                    alert("전화번호를 입력해주세요.");
                    $("#phoneinput").focus();
                    return false;
                };

                // 이용약관 유효성
                var checked = $("input[name=agree_01input]").is(':checked');
                var checked02 = $("input[name=agree_02input]").is(':checked');
                if(!checked){
                    alert("서비스 이용약관을 체크해주세요.");
                    $("#agree_01input").focus();
                    return false;
                }

                if(!checked02){
                    alert("개인정보취급방침을 체크해주세요.");
                    $("#agree_02input").focus();
                    return false;
                }
                
            });

            // 전화번호 유효성 검사
            $("#phoneinput").on('keydown', function(e){
                // 숫자만 입력받기
                 var trans_num = $(this).val().replace(/-/gi,'');
             var k = e.keyCode;
                         
             if(trans_num.length >= 11 && ((k >= 48 && k <=126) || (k >= 12592 && k <= 12687 || k==32 || k==229 || (k>=45032 && k<=55203)) ))
             {
                   e.preventDefault();
             }
             }).on('blur', function(){ // 포커스를 잃었을때 실행합니다.
                 if($(this).val() == '') return;
         
                 // 기존 번호에서 - 를 삭제합니다.
                 var trans_num = $(this).val().replace(/-/gi,'');
               
                 // 입력값이 있을때만 실행합니다.
                 if(trans_num != null && trans_num != '')
                 {
                     // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
                     if(trans_num.length==11 || trans_num.length==10) 
                     {   
                         // 유효성 체크
                         var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
                         if(regExp_ctn.test(trans_num))
                         {
                             // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
                             trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");                  
                             $(this).val(trans_num);
                         }
                         else
                         {
                             alert("유효하지 않은 전화번호 입니다.");
                             $(this).val("");
                             $(this).focus();
                         }
                     }
                     else 
                     {
                         alert("유효하지 않은 전화번호 입니다.");
                         $(this).val("");
                         $(this).focus();
                     }
               }
           });  
        },

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
                test01: {el:$('.sec_anchor')},
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

        init: function() {
            this.applyBtn();
            this.anchorEvt();
        }
    };

    mainIndex.init();

})();