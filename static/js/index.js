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
            "id": "deployment",
            "subMenu": {
                "Tomcat 发布": {
                	"class": "",
                    "id": "tomcat"
                },
                "WAS 发布": {
                    "class": "",
                    "id": "wasdeployment"
                },
            }
        }    
    },
    {
        "日志下载": {
            "class": "glyphicon glyphicon-import",
            "id": "downloadlog"
        }
    
    },
    {
        "主机管理": {
            "class": "glyphicon glyphicon-blackboard",
            "id": "hosts"
        }
    
    },
  {
  "账号管理": {
      "class": "glyphicon glyphicon-user",
      "id": "osuser"
  }

},
];

$(function () {
    screenFull();
    createMenu();
    welcome();
})

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
    div.style.background = "#09c";
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

$(document).on("click","#hosts",function(){
	sectionColor(this);
	$("#showMainContent").load("/static/html/hosts.html");
});

$(document).on("click", "#osuser", function () {
    sectionColor(this)
    osuser();
});
function osuser() {
	 $("#showMainContent").load("/static/html/application.html");
}

function welcome() {
	 $("#showMainContent").load("/static/html/welcome.html");
}

$(document).on("click", "#tomcat", function () {
    sectionColor(this)
    tomcat();
});

$(document).on("click", "#deployment", function () {
    sectionColor(this)
});

function tomcat() {
	 $("#showMainContent").load("/static/html/tomcat.html");
}

function showAndCloseSection(div) {
    var nextDiv = $(div).next();
    if (nextDiv[0].style.display === "none") {
        $(div).parent().find(".fa").removeClass("fa-angle-right").addClass("fa-angle-down")
        $(nextDiv).slideDown("fast");
    }
    else {
        $(nextDiv).slideUp("fast");
        $(this).removeClass("fa-angle-right")
        $(div).parent().find(".fa").removeClass("fa-angle-down").addClass("fa-angle-right")
    }
}