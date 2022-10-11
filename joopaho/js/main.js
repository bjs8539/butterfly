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
        init: function() {
            this.applyBtn();
            viewportChange(); // fold 해상도 대응
        }
    };

    mainIndex.init();

})();