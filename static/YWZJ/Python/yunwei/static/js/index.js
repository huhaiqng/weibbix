var menu = [
    {
        "域名管理": {
            "class": "glyphicon glyphicon-list-alt",
            "id": "home"
        }    
    },
    {
        "项目管理": {
            "class": "glyphicon glyphicon-briefcase",
            "id": "project"
        }    
    },
    {
        "应用管理": {
            "class": "glyphicon glyphicon-th",
            "id": "application"
        }    
    },
    {
        "Tomcat 发布": {
            "class": "glyphicon glyphicon-log-in",
            "id": "tomcat"
        }    
    },
];

function createMenu() {
    var menuDiv = document.getElementById("menu");
    for (var i = 0; i < menu.length; i++) {
        var section = menu[i];
        for (funcName in section) {
            var icon = section[funcName].class;
            var id = section[funcName].id
            var isSub = section[funcName].subMenu;
            var divFunc = document.createElement("div");
            var divLine = document.createElement("div");


            divLine.style.cssText = 'padding:10px;font-size:12px;cursor:pointer;position:relative'
            divLine.setAttribute("id", id);
            divLine.className = "sectionLine"
            var divPic = document.createElement("span");
            divPic.style.fontSize = "120%";
            divPic.className = icon;

            var divText = document.createElement("span");
            divText.textContent = funcName;
            divText.style.cssText = "font-size: 120%;margin-left: 15px;";


            divLine.appendChild(divPic);
            divLine.appendChild(divText);

            if (isSub) {
                divLine.onclick = function () {
                    showAndCloseSection(this);

                }
                var spanRight = document.createElement("span");
                spanRight.className = "fa fa-angle-right fa-2x ";
                spanRight.style.cssText = "right:10px;position:absolute;"
                divLine.appendChild(spanRight);
            }


            divFunc.appendChild(divLine);


            //子功能
            if (isSub) {
                var divSub = document.createElement("div");
                divSub.style.display = "none";
                for (subSectionName in  isSub) {
                    var id = isSub[subSectionName].id;
                    var icon = isSub[subSectionName].class;

                    var subDivLine = document.createElement("div");
                    subDivLine.style.cssText = 'padding:10px;font-size:12px;cursor:pointer;'
                    subDivLine.className = "sectionLine"
                    subDivLine.setAttribute("id", id);


                    var pic = document.createElement("span");
                    pic.className = icon;
                    pic.style.fontSize = "120%";

                    //字体部分
                    var text = document.createElement("span");
                    text.style.cssText = "font-size: 120%;margin-left: 15px;";
                    text.textContent = subSectionName;
                    text.style.cssText = "font-size: 120%;margin-left: 15px;";
                    subDivLine.appendChild(pic);
                    subDivLine.appendChild(text);
                    divSub.appendChild(subDivLine);


                }

                divFunc.appendChild(divSub);

            }


            menuDiv.appendChild(divFunc);


        }

    }
}


function screenFull() {
    //设置全屏高度
    document.getElementById("allMain").style.height = window.innerHeight + "px";
    //设置子页面和菜单的
    document.getElementById("menuAndSonePage").style.height = window.innerHeight - 50 + "px";
    //设置子页面的宽度
    document.getElementById("showMainContent").style.width = window.innerWidth - 190 + "px";
}

window.onresize = function () {
    screenFull();
}

function sectionColor(div) {
    //start_load_pic();
    $("#menu").find(".sectionLine").css({"background": ""});
    div.style.background = "#09c"
}

$(document).on("click", "#home", function () {
    sectionColor(this)
    loadHome();
});
function loadHome() {
	 $("#showMainContent").load("/static/html/env.html");
}

$(document).on("click", "#project", function () {
    sectionColor(this)
    project();
});
function project() {
	 $("#showMainContent").load("/static/html/project.html");
}

$(document).on("click", "#application", function () {
    sectionColor(this)
    application();
});
function application() {
	 $("#showMainContent").load("/static/html/application.html");
}

function welcome() {
	 $("#showMainContent").load("/static/html/welcome.html");
}

$(document).on("click", "#tomcat", function () {
    sectionColor(this)
    tomcat();
});
function tomcat() {
	 $("#showMainContent").load("/static/html/tomcat.html");
}

$(function () {
    screenFull();
    createMenu();
    welcome()
    //绑定菜单关闭
    jQuery1_8("#showMenu").toggle(
        function () {
            $("#menu").animate({
                "left": "-180px",
            }, 300, function () {
                $("#showMainContent").css({
                    "position": "absolute",
                    "width": window.innerWidth + "px",
                })
            });
        }, function () {
            $("#showMainContent").css({
                "position": "relative",
                "width": window.innerWidth - 180 + "px",
            })
            $("#menu").animate({
                "left": "0px",
            }, 300);
        }
    )
})