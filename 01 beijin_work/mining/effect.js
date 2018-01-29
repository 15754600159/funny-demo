$(function(){ 
    var delayTime = 500;
    // $('.one').attr({'data-in':'','data-showRunning':'false','data-hideRunning':' false'});
    // $('.two').attr({'data-in':'','data-showRunning':'false','data-hideRunning':' false'});
    // $('.three').attr({'data-in':'','data-showRunning':'false','data-hideRunning':' false'});
    // $('.four').attr({'data-in':'','data-showRunning':'false','data-hideRunning':' false'});

    var flags = {};   
    $('.HotspotChapterContainer').each(function(k){
            if(k==0){                
                var $one=$('.one');
                // mouseenter函数
                $('.one').on('mouseenter',function(){                   
                    mousein($one, 'one',delayTime,k);
                });
                 // mouseleave函数
                 $('.one').on('mouseleave',function(){                     
                    mouseout($one, 'one',delayTime);                   
                 });
                 $('.one').eq(0).on('click',function(){                     
                    $(".js-menu-trigger").click();
                    $('.block-container').eq(1).click()                 
                 });
                    $('.one .HotspotIcon').each(function(i){
                        if(i==0){
                            return;
                        }
                        else{
                        $(this).hover(function(){
                            $('.one .polygon').eq(i).removeClass('polygon2').addClass('polygon1');
                        },function(){
                            $('.one .polygon').eq(i).removeClass('polygon1').addClass('polygon2');
                        });
                    }
                    });
            }else if(k==1){
                var $two=$('.two');
                  $('.two').on('mouseenter',function(){                    
                    mousein($two, 'two',delayTime,k);
                  });

                    // mouseleave函数
                 $('.two').on('mouseleave',function(){
                  mouseout($two, 'two',delayTime,k);
                 })
                 $('.two').eq(0).on('click',function(){                     
                     $(".js-menu-trigger").click();
                    $('.block-container').eq(2).click();                
                  });
                 
                 //CONA
                 $('.two').eq(2).on('click',function(){                     
                     $(".js-menu-trigger").click();
                     $('.block-container').eq(2).click();
                     setTimeout(function(){
                    	 $('.js-next').click();
                     },1000)                     
                  });
                 // 小环单独动画
                        $('.two .HotspotIcon').each(function(i){
                        if(i==0){
                            return;
                        }
                        else{
                        $(this).hover(function(){
                            $('.two .polygon').eq(i).removeClass('polygon2').addClass('polygon1');
                        },function(){
                            $('.two .polygon').eq(i).removeClass('polygon1').addClass('polygon2');
                        });
                    }
                    });
                }
            else if(k==2){
                 var $three=$('.three');
                  // mouseenter函数
                $('.three').on('mouseenter',function(){
                    
                    mousein($three,'three',delayTime,k);
                });
                
                    // mouseleave函数
                 $('.three').on('mouseleave',function(){
                  mouseout($three,'three',delayTime,k);
                 })

                 $('.three').eq(0).on('click',function(){                     
                    $(".js-menu-trigger").click();
                    $('.block-container').eq(3).click()                 
                 });
                     // 小环单独动画
                        $('.three .HotspotIcon').each(function(i){
                        if(i==0){
                            return;
                        }
                        else{
                        $(this).hover(function(){
                            $('.three .polygon').eq(i).removeClass('polygon2').addClass('polygon1');
                        },function(){
                            $('.three .polygon').eq(i).removeClass('polygon1').addClass('polygon2');
                        });
                    }
                    });
            }else if(k==3){
                var $four=$('.four');
                   // mouseenter函数
                $('.four').on('mouseenter',function(){       
                    mousein($four,'four',delayTime,k);});
                 // mouseleave函数
              $('.four').on('mouseleave',function(){
                  mouseout($four,'four',delayTime,k);
                 });
                 $('.four').eq(0).on('click',function(){                     
                    $(".js-menu-trigger").click();
                    $('.block-container').eq(4).click()                 
                 });
               // 小环单独动画
                        $('.four .HotspotIcon').each(function(i){
                        if(i==0){
                            return;
                        }
                        else{
                        $(this).hover(function(){
                            $('.four .polygon').eq(i).removeClass('polygon2').addClass('polygon1');
                        },function(){
                            $('.four .polygon').eq(i).removeClass('polygon1').addClass('polygon2');
                        });
                    }
                    });
            }
    });
    function mousein($num, key,delayTime,k){
        if(!flags[key]){
            flags[key] = {};
        }

        var flag = flags[key];
        flag.show = true;

        var showRunning = flag.showRunning;
        var hideRunning = flag.hideRunning;

        // console.log('mousein');
        // console.log('data-showRunning:' + showRunning);
        // console.log('data-hideRunning:' + hideRunning);
        if(showRunning == true  || hideRunning == true){
            // console.log('return');
          return;
        }
        showAction($num, key,delayTime,k);        
    }

    function mouseout($num,key, delayTime,k){
        var flag = flags[key];
        flag.show = false;

        // console.log('mouseout');
        
        var showRunning = flag.showRunning;
        var hideRunning = flag.hideRunning;

        // console.log('data-showRunning:' + showRunning);

        if(showRunning==true  || hideRunning==true ){ 
            return;
        }   
        hideAction($num,key, delayTime,k);        
    }

    function showAction($num, key,delayTime,k){
        // console.log('show');
    
        var flag = flags[key];
        flag.showRunning = true;
            
          if(k==0){
            $num.eq(0).find('.word').eq(0).addClass('fonttoggle').text('行业+人工智能'); 
          }else if(k==1){
            $num.eq(0).find('.word').eq(0).addClass('fonttoggle').text('产 品');
          }else if(k==2){
            $num.eq(0).find('.word').eq(0).addClass('fonttoggle').text('关于我们');
          }else if(k==3){
            $num.eq(0).find('.word').eq(0).addClass('fonttoggle').text('联系我们'); 
          }
          var i = 0;
          var t=$num.length+6;
          var timer = setInterval(function() {
              // console.log('show:' + i);
              i++;
              if(i==1){
                $num.eq(i-1).find('.ring').eq(0).removeClass('ring2').addClass('ring1');
                  $num.eq(i-1).find('.HotspotIcon').eq(0).addClass('Active');
                  // $num.eq(i - 1).find('.active').eq(0).removeClass('linestyle1').addClass('linestyle2');
              }
              
              
                $num.eq(i - 1).find('.active').eq(0).removeClass('linestyle1').addClass('linestyle2');
                $num.eq(i).find('.colouredDot').eq(0).removeClass('colouredDot2').addClass('colouredDot1');
                /*  setTimeout(function(){
                   $num.eq(i).find('.colouredDot').eq(0).css({
                    visibility:'inherit',
                    opacity:1,
                    transform:'matrix(1,0,0,1,-7,-7)'
                           })
                      
                   },450)*/
                   if(k==0 || k==1){
                   $num.eq(i).find('.label').eq(0).removeClass('label2').addClass('label1');
                 }else{
                    $num.eq(i).find('.label').eq(0).removeClass('label4').addClass('label3');
                 }
                 if(i>=t){            
                    flag.showRunning = false;
                    clearInterval(timer);
                    if (flag.show == false) {
                        // console.log('show->hide');
                        hideAction($num, key, delayTime,k);
                    }           
                }
              
          }, delayTime);
        }
    
    
    function hideAction($num,key, delayTime,k){  
        var flag = flags[key]; 
        // console.log('hide');    
        flag.hideRunning = true;
            var j = $num.length-1;
             
            var timerout = setInterval(function() {
                j--;

                // console.log('hide:' + j);    

                if(j < 0){
                    flag.hideRunning = false;
                    clearInterval(timerout);                
                   if(flag.show == true){
                     showAction($num,key, delayTime,k);
                   }      
                   return;
                }
                
                $num.eq(j).find('.active').eq(0).removeClass('linestyle2').addClass('linestyle1');
                $num.eq(j+1).find('.colouredDot').eq(0).removeClass('colouredDot1').addClass('colouredDot2');
                   /* $num.eq(j+1).find('.colouredDot').eq(0).css({
                  visibility:'hidden',
                  opacity:0,
                  transform:'matrix(0,0,0,0,-7,-7)'
                })*/
                    if(k==0 || k==1){
                   $num.eq(j+1).find('.label').eq(0).removeClass('label1').addClass('label2');
                 }else{
                    $num.eq(j+1).find('.label').eq(0).removeClass('label3').addClass('label4');
                 }
                // $('.one .colouredDot').eq(j+1).removeClass('colouredDot1').addClass('colouredDot2');
                if (j == 0) {
                      if(k==0){
                          $num.eq(0).find('.word').eq(0).removeClass('fonttoggle').text('INDUSTRY+AI'); 
                          }else if(k==1){
                           $num.eq(0).find('.word').eq(0).removeClass('fonttoggle').text('PRODUCTS');
                          }else if(k==2){
                           $num.eq(0).find('.word').eq(0).removeClass('fonttoggle').text('ABOUT US');
                          }else if(k==3){
                          $num.eq(0).find('.word').eq(0).removeClass('fonttoggle').text('CONTACT US'); 
                          }
                     $num.eq(j).find('.HotspotIcon').eq(0).removeClass('Active');  
                     $num.eq(0).find('.ring').eq(0).removeClass('ring1').addClass('ring2');                                        
                }
            }, delayTime);
        }
    
    //获取当前hover元素的text中间显示
     $('.hotspots').children().each(function(j){
       // console.log($('.hotspots').children().length);
       if(j>=1){
        $(this).on('mouseenter mouseleave',function(e){
          if(e.type=='mouseenter'){
          if(j==1 || j==5 || j==10 || j==16){

            $('.hotspots').children().eq(0).text($(this).find('.word').eq(0).text());
          }else{
             $('.hotspots').children().eq(0).text($(this).text());
           }
           $('.hotspots').children().eq(0).removeClass('hidecontent').addClass('showcontent');
         }else{
           $('.hotspots').children().eq(0).removeClass('showcontent').addClass('hidecontent');
         }
        });
       }
     })   


     // 跳转到本页面的指定位置

});