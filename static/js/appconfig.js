$(function () {	
    document.getElementById("createTaskServer").onclick=function(){
        createTaskServer();
    }
    document.getElementById("saveDeploymentTask").onclick=function(){
        //保存配置
        saveDeploymentTask();
    }
    document.getElementById("closeAddEnvServer").onclick=function(){
    	closeAddEnvServer();
    }
    document.getElementById("addEnvServerBtn").onclick=function(){
    	addEnvServerToTab();
    	closeAddEnvServer();
    }

    document.getElementById("closeEditDeployment").onclick=function(){
    	$("#showMainContent").load("/static/html/tomcat.html");
    }
    document.getElementById("editEnvServerBtn").onclick=function(){
    	saveEditEnvServer();
    }
    document.getElementById("closeEditEnvServer").onclick=function(){
    	closeEditEnvServer();
    }
    document.getElementById("closeEnvDiv").onclick=function(){
    	closeEnvDiv();
    }
    document.getElementById("chooseEnvBtn").onclick=function(){
    	chooseEnvBtn();
    }
    $(document).on("click",".con_env",function(){
    	showEnvDiv(this);
    });
    getApp();
    getConfig();
})

function startShadow() {
    document.getElementById("shadow").style.display = "block";
}

function stopShadow() {
    document.getElementById("shadow").style.display = "none"
}

function getConfig(){
	var sid=window.deploymentEditSid;
    $.ajax({
        url:'/con_list/',
        type:'POST',
        data:{sid:sid},
        success: function(data){        	
        	cons=data.content
        	for (var i = 0; i < cons.length; i++) {
        		var everyServer=createTaskServer();
                var con = cons[i].content;
                for (var s = 0; s < con.length; s++){
                	srv = con[s];
                	var con_env = $(everyServer).find(".con_env")[0];
                    con_env.value=srv.con_env;
                    var env=srv.con_env;
                    var ip=srv.con_ip;
                    var dr=srv.con_dir;
                    var url=srv.con_url;
                    var domurl=srv.dom_url;
                    dir={env:env,ip:ip,dr:dr,url:url,domurl:domurl};
                    createEnvServerLine(dir);
                }
            }
        }
    });
}

function getApp(){
	var sid=window.deploymentEditSid;
    $.ajax({
        url:'/tom_edit/',
        type:'POST',
        data:{sid:sid},
        success: function(data){
        	tom_name=data.tom_name;
        	tom_ma=data.tom_ma;
        	document.getElementById("appname").value = tom_name;
            document.getElementById("appma").value = tom_ma;
        }
    });
}

function saveDeploymentTask(){
	var sid=window.deploymentEditSid;
	var appname=document.getElementById("appname").value;
	var appma=document.getElementById("appma").value;
	data={tom_sid:sid,tom_name:appname,tom_ma:appma};
	$.ajax({
        url:'/app_save/',
        type:'POST',
        data:data
    });
	$("#showMainContent").load("/static/html/tomcat.html");
}

function createTaskServer(){
    //创建人物流程的每一个服务器
    var allTask=document.getElementById("allTask");
    var div=document.getElementsByClassName("everyOneServer")[0];
    var newDiv=div.cloneNode(true);
    window.tbody = $(newDiv).find(".envTbody")[0];
    newDiv.style.display="block";
    allTask.appendChild(newDiv);
    $(document).on("click",".addEnvServer",function(){
    	addEnvServer(this);
    });
    $(document).on("click",".removeEnvTab",function(){
    	removeEnvTab(this);
    });
    return newDiv;
}

function removeEnvTab(deleteButton){
    //删除 删除服务器按钮的爷爷级元素
    var a=deleteButton.parentNode.parentNode;
//    var con_env = $(a).find(".con_env")[0].textContent;
    var env = $(a).find(".con_env")[0];
    var sid = window.deploymentEditSid;
	con_env = env.value;
    $.ajax({
        url:'/con_del/',
        type:'POST',
        data:{"con_sid":sid,"con_env":con_env},
        success: function(data){
        	$(a).remove();
        }
    });   
}

function addEnvServer(btn){
	var div=btn.parentNode.parentNode.parentNode;
	window.dir_env=$(div).find(".con_env")[0].value;
	startShadow();
	getTomDir();
	$("#addEnvServerDiv").animate({
        "left": "0px",
        "top": "0px",
    });
}

function showEnvDiv(envClick){
	window.envClick=envClick;
	startShadow();
	$("#showEnvDiv").animate({
		"left":"0px",
		"top":"0px",		
	});
	getEnvTab();
}

function closeEnvDiv(){
	stopShadow();
	$("#showEnvDiv").animate({
		"left":"-100%",
		"top":"-120%",
	});
}

function closeAddEnvServer() {
    stopShadow();
    $("#addEnvServerDiv").animate({
        "left": "100%",
        "top": "120%",
    });
}

function closeEditEnvServer() {
    stopShadow();
    $("#editEnvServerDiv").animate({
        "left": "100%",
        "top": "120%",
    });
}

function addEnvServerToTab(){
	var dirs=[];
	$("#dirTB").find(".glyphicon-check").each(function(){
		var sid=window.deploymentEditSid;
		var tr = $(this).parent().parent();
		var env=window.dir_env;
        var ip = $(tr).find(".ip")[0].textContent;
        var dr = $(tr).find(".dir")[0].textContent;
        var pt=dr.split('_')[1];
        var cnt=window.tomcnt;
		var url="http://"+ip+":"+pt+"/"+cnt;
        var domurl="http://"+window.dir_env+".sz.com"+"/"+cnt;	
        dir={sid:sid,env:env,ip:ip,dr:dr,url:url,domurl:domurl};
        $.ajax({
        	url:"/tom_save/",
        	type:"POST",
        	dataType:"json",
        	data:dir,
        	success:function(){
        		
        	}
        })
        createEnvServerLine(dir);
	})
}

function createEnvServerLine(dirLine){		
	var tbody = window.tbody;
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	td.className = "ip"
	td.textContent = dirLine.ip;
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = dirLine.dr;
	td.className = "dir";
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = dirLine.url;
	td.className="dir_url";
	tr.appendChild(td);
	
	var td = document.createElement("td");
	td.textContent = dirLine.domurl;
	td.className="domurl";
	tr.appendChild(td);
	
	var td = document.createElement("td");
//	var editButton = document.createElement("button");
//    editButton.className = "btn btn-success btn-xs glyphicon glyphicon-edit";
////    editButton.setAttribute("sid",sid);
//    editButton.onclick = function () {
//    	editEnvServer(this);
//    }
//    td.appendChild(editButton);
    
	var deleteButton = document.createElement("button");
    deleteButton.style.marginLeft = "3px";
    deleteButton.className = "btn btn-danger btn-xs glyphicon glyphicon-trash";
    deleteButton.onclick = function () {
        delEnvServer(this);
    };
    td.appendChild(deleteButton);
    
    tr.appendChild(td);
	tbody.appendChild(tr);
}

function delEnvServer(delEnvServerBtn){
	var sid = window.deploymentEditSid;
	var tr = delEnvServerBtn.parentNode.parentNode;
	var div = delEnvServerBtn.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var env = $(div).find(".con_env")[0];
	var con_env = env.value;
	var srv = $(tr).find(".fuwuqi")[0];
	var con_srv = srv.textContent;
	var dir = $(tr).find(".lujing")[0];
	var con_dir = dir.textContent;
	data = {con_sid:sid,con_srv:con_srv,con_dir:con_dir,con_env:con_env};
	$.ajax({
		type:"POST",
		url:"/del_con_server/",
		data:data,
		success:function(){
			$(tr).remove();
		}
	});	
}

function editEnvServer(editEnvServerBtn){
	startShadow();
	var tr = editEnvServerBtn.parentNode.parentNode;
	var div = editEnvServerBtn.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	window.editEnvServerSid=editEnvServerBtn.getAttribute("sid");
	window.editTr = tr;
	window.env = $(div).find(".con_env")[0];
	
	var fuwuqi = $(tr).find(".fuwuqi")[0].textContent;
	var lujing = $(tr).find(".lujing")[0].textContent;
	var yonghuming = $(tr).find(".yonghuming")[0].textContent;
	var mima = $(tr).find(".mima")[0].textContent;
	
	document.getElementById("editfuwuqi").value = fuwuqi;
	document.getElementById("editlujing").value = lujing;
	document.getElementById("edityonghuming").value = yonghuming;
	document.getElementById("editmima").value = mima;
	$("#editEnvServerDiv").animate({
        "left": "0px",
        "top": "0px",
    });
}

function saveEditEnvServer(editEnvServerBtn){
	var fuwuqi = $("#editfuwuqi").val();
	var lujing = $("#editlujing").val();
	var yonghuming = $("#edityonghuming").val();
	var mima = $("#editmima").val();

	var srv_sid = window.editEnvServerSid;
	
	data = {srv_sid:srv_sid,con_dir:lujing,con_srv:fuwuqi,con_usr:yonghuming,con_pwd:mima};
	$.ajax({
		type:"POST",
		url:"/edit_con_srv/",
		data:data,
		success:function(){
			tr=window.editTr;
			$(tr).find(".fuwuqi")[0].textContent=fuwuqi;
			$(tr).find(".lujing")[0].textContent=lujing;
			$(tr).find(".yonghuming")[0].textContent=yonghuming;
			$(tr).find(".mima")[0].textContent=mima;
			closeEditEnvServer();
		}
	});
}

function getEnvTab(){
	$("#envTB").empty();
	$.ajax({
        url: "/env_list/",
        dataType: 'json',
        data:'data',
        success: function(data){
        	envs=data.content
        	for (var i = 0; i < envs.length; i++) {
                var env = envs[i];
                name=env.env_name
            	domain=env.env_domain
            	sid=env.env_sid
            	disc=env.env_disc
            	envLine={'env_name':name,'env_domain':domain,'env_sid':sid}
                createEnvLine(envLine);
            }
        },
    })
}

function createEnvLine(serverLine) {
    var tbody = document.getElementById("envTB");
    var tr = document.createElement("tr");//创建一行
    
    var span = document.createElement("span");
    span.className = "glyphicon glyphicon-unchecked serverCheck";
    var td = document.createElement("td");//复选框td
    td.style.cursor = "pointer";
    td.onclick = function () {
        selectEnvCheck(this);//绑定复选框点击事件
    }
    td.appendChild(span);
    tr.appendChild(td);
    
    var td = document.createElement("td");
    td.textContent = serverLine.env_name;
    td.className = "env_name";
    tr.appendChild(td);

    var td = document.createElement("td");
    td.textContent = serverLine.env_domain;
    td.className = "env_domain";
    tr.appendChild(td);
    
    tbody.appendChild(tr);
}

function selectEnvCheck(team) {
    var span = $(team).children()[0];
    
    if ($(span).hasClass("glyphicon-unchecked")) {        
        $("#envTB").find(".glyphicon-check").removeClass("glyphicon-check").addClass("glyphicon-unchecked");
        $(span).removeClass("glyphicon-unchecked").addClass("glyphicon-check");
    }
}

function chooseEnvBtn(){		
	$("#envTB").find(".glyphicon-check").each(function(){
		var ipt=window.envClick;
		var tr = $(this).parent().parent();
        var env = $(tr).find(".env_name")[0].textContent;
        ipt.value=env;
	})
	closeEnvDiv();
}

function getTomDir(){
	$("#dirTB").empty();
	$.ajax({
		url:"/get_tomdir/",
		type:"POST",
		dataType:"json",
		data:"data",
		success:function(data){
			dirs=data.content;
			for (var i=0;i<dirs.length;i++){
				var d=dirs[i];
				ip=d.ip;
				dr=d.dir;
				dirLine={ip:ip,dr:dr};
				createDirLine(dirLine);
			}
		}
	})
}

function createDirLine(drLine){
	var tbody = document.getElementById("dirTB");
    var tr = document.createElement("tr");//创建一行
    
    var span = document.createElement("span");
    span.className = "glyphicon glyphicon-unchecked serverCheck";
    var td = document.createElement("td");//复选框td
    td.style.cursor = "pointer";
    td.onclick = function () {
        selectDirCheck(this);//绑定复选框点击事件
    }
    td.appendChild(span);
    tr.appendChild(td);
    
    var td = document.createElement("td");
    td.textContent = drLine.ip;
    td.className = "ip";
    tr.appendChild(td);

    var td = document.createElement("td");
    td.textContent = drLine.dr;
    td.className = "dir";
    tr.appendChild(td);
    
    tbody.appendChild(tr);
}

function selectDirCheck(team) {
    var span = $(team).children()[0];   
    if ($(span).hasClass("glyphicon-unchecked")) {
        $(span).removeClass("glyphicon-unchecked").addClass("glyphicon-check");
    }
    else {
        $(span).removeClass("glyphicon-check").addClass("glyphicon-unchecked"); 
    }
}