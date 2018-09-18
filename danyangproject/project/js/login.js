require(["config/config"], function () {
    //再加载各个模块
    require(["jquery", "template","Swiper"], function ($,template,Swiper) {
        //导航栏的滚动地址特效
        $(function () {
            var index = 0;
            setInterval(function () {
                $("#thefirstturn_ullist").animate({ top: -36 * index }, 500, function () {
                    ++index;
                    if (index == 5) {
                        index = 0;
                        $("#thefirstturn_ullist").css("top", 0);
                    }
                });
            }, 1500)
        })
        //出现菜单的动效
        $("#head-first-box>ul>li").on("mouseover", function () {
            if ($(".index1_box").attr("indexof") == $(this).index()) {
                $(".index1_box").eq($(this).index()).fadeIn();
            }
        })
        $("#head-first-box>ul>li").on("mouseleave", function () {
            $(".index1_box").fadeOut();
        })
        //滚动图
        var swiper = new Swiper('.swiper-container', {
			autoplay: {
				delay: 2000,
				disableOnInteraction: false
			},
			effect: 'fade',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable :true
			}
		})



        $("#checktext").on("input", function () {//搜索框获取ajax数据
            var droplist = document.getElementById("droplist");
            var value = $(this).val();
            $.ajax({
                type: "get",
                url: `http://localhost:9000/proxy/you.163.com/xhr/search/searchAutoComplete.json?__timestamp=1536931879451&keywordPrefix=${value}`,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    droplist.innerHTML = "";
                    if (data.data != null){
                        data.data.forEach(item => {
                            var li = document.createElement("li");
                            li.innerText = item;
                            droplist.appendChild(li);
                        });
                    }
                    droplist.style.display = "block";
                }
            })
        })
        $("#droplist").on("click","li",function(e){//搜索框的下拉选取
            $("#checktext").text($(this).val());
            $("#droplist").html("");
        })
        $(window).on("scroll",function(){//顶部滚动下拉菜单
            if($(window).scrollTop()>=200){
                $("#head-shier-box").fadeIn();
            }
            else{
                $("#head-shier-box").fadeOut();
                $("#checktext").removeClass("inputmovetop")
                $("#makeinputremove").fadeOut();
            }
        })
        $("#makeinputinsert").on("click",function(){//出现按钮
            $("#checktext").addClass("inputmovetop")
            $("#makeinputremove").fadeIn();
        })
        $("#makeinputremove").on("click",function(){//消失按钮
            $("#checktext").removeClass("inputmovetop")
            $("#makeinputremove").fadeOut();
        })
        $("#head-shier-box ul li ").on("mouseenter",function(){
            if ($(".index1_box clearFix").attr("indexof") == $(this).index()) {
                $(".index1_box clearFix").eq($(this).index()).addClass("windowmovewith");
            }
        })
        $("#head-first-box>ul>li").on("mouseleave", function () {
            $(".index1_box clearFix").removeClass("windowmovewith");
        })
        //新品首发与十个相同的模块
        $(function(){
            $.ajax({
                type:"get",
                url:"http://localhost:9000/proxy/you.163.com/xhr/item/getNewItem.json",
                dataType:"json",
                success : function(data){
                    //console.log(data);
                    var newdata = data;
                    var result = newdata.data.result;
                    $("#forth-box-content>ul").load("../js/Mylib/temp1.html",function(){
                        var tempstr = template("newproduct",{
                            list : result
                        });
                        console.log(result[0].itemTagList[0].name);
                        $("#forth-box-content>ul").html(tempstr);
                    })
                    $(".head-1-box-ul").load("../js/Mylib/temp1.html",function(){
                        var tempstr = template("tensamemokuai",{
                            list : result
                        });
                       
                        $(".head-1-box-ul").html(tempstr);
                    })
                    $("#fifth-box-content").load("../js/Mylib/temp1.html",function(){
                        var tempstr = template("renqituijian",{
                            list : result
                        });
                       
                        $("#fifth-box-content").html(tempstr);
                    })
                }
            })
            $("#makethefirstulmoveleft").on("click",function(){
                console.log("aaa");
                 var index = 0;
                index+=1090;
                var newsize = $("#forth-box-content>ul").offset().left;
                $("#forth-box-content>ul").animate({left:-index+newsize})
            })
            $("#makethefirstulmoveright").on("click",function(){
                console.log("bbb");
                var index = 0;
                index+=1090;
                var newsize = $("#forth-box-content>ul").offset().left;
                $("#forth-box-content>ul").animate({left:index+newsize})
            })
        })
        //回到顶部
        $("#return-top").on("click",function(){
            $("html,body").animate({scrollTop:0},500);
        })
    })
})






