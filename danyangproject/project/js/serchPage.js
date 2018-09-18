require(["config/config"], function () {
    //再加载各个模块
    require(["jquery", "template"], function ($,template) {
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
        //回到顶部
        $("#return-top").on("click",function(){
            $("html,body").animate({scrollTop:0},500);
        })
        //动态数据借口获取
        $(function(){
            $.ajax({
                type:"get",
                url:"http://localhost:9000/proxy/you.163.com/xhr/search/search.json?csrf_token=dc699c06d65bbabc651bf3765d897a53&__timestamp=1537169902967&page=1&sortType=0&categoryId=0&descSorted=true&matchType=1&floorPrice=-1&upperPrice=-1&stillSearch=false&searchWordSource=1&size=40&keyword=%E9%A3%8E%E8%A1%A3",
                dataType:"json",
                success : function(data){
                    
                    var newdata = data;
                    var result = newdata.data.directly.searcherResult.result;
                    var moremessage = newdata.data.topics;
                    console.log(result);
                    console.log(result.name);
                    $(".content-box").load("../js/Mylib/temp1.html",function(){
                        var tempstr = template("list-content-box",{
                            list : result
                        });
                        console.log(tempstr);
                        $(".content-box").html(tempstr);
                    })
                    $(".other-ul").load("../js/Mylib/temp1.html",function(){
                        var tempstr = template("more-content-mokuai",{
                            list : moremessage
                        });
                       
                        $(".other-ul").html(tempstr);
                    })
                    // $("#fifth-box-content").load("../js/Mylib/temp1.html",function(){
                    //     var tempstr = template("renqituijian",{
                    //         list : result
                    //     });
                       
                    //     $("#fifth-box-content").html(tempstr);
                    // })
                }
            })
        })
    })
})






