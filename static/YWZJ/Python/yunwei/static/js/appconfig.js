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
    getApp();
    getConfig();
})

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
                    var con_sid=srv.con_sid;
                    var con_srv=srv.con_srv;
                    var con_dir=srv.con_dir;
                    var con_usr=srv.con_usr;
                    var con_pwd=srv.con_pwd;
                    var srv_sid=srv.srv_sid;
                    data={srv_sid:srv_sid,con_srv:con_srv,con_dir:con_dir,con_usr:con_usr,con_pwd:con_pwd}
                    createEnvServerLine(data);
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

function startShadow() {
    document.getElementById("shadow").style.display = "block";
}

function stopShadow() {
    document.getElementById("shadow").style.display = "none"
}

function addEnvServer(btn){
	startShadow();
	var div = btn.parentNode.parentNode.parentNode;
	window.tbody = $(div).find(".envTbody")[0];
	window.env = $(div).find(".con_env")[0];
	document.getElementById("fuwuqi").value = "";
	document.getElementById("lujing").value = "";
	document.getElementById("yonghuming").value = "";
	document.getElementById("mima").value = "";
	$("#addEnvServerDiv").animate({
        "left": "0px",
        "top": "0px",
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
	var fuwuqi = $("#fuwuqi").val();
	var lujing = $("#lujing").val();
	var yonghuming = $("#yonghuming").val();
	var mima = $("#mima").val();

	var con_sid = window.deploymentEditSid;
	var srv_sid= Math.random().toString(36).substr(2);
	var env = window.env;
	con_env = env.value;
		
	data = {con_sid:con_sid,srv_sid:srv_sid,con_env:con_env,con_dir:lujing,con_srv:fuwuqi,con_usr:yonghuming,con_pwd:mima};
	$.ajax({
		type:"POST",
		url:"/tom_save/",
		data:data
	});
	createEnvServerLine(data);
}

function createEnvServerLine(serverLine){
	var fuwuqi = serverLine.con_srv;
	var lujing = serverLine.con_dir;
	var yonghuming = serverLine.con_usr;
	var mima = serverLine.con_pwd;
	var sid = serverLine.srv_sid;
	
	var tbody = window.tbody;
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	td.className = "fuwuqi"
	td.textContent = fuwuqi;
	tr.appendChild(td);
	var td = document.createElement("td");
	td.textContent = lujing;
	td.className = "lujing";
	tr.appendChild(td);
	var td = document.createElement("td");
	td.textContent = yonghuming;
	td.className="yonghuming";
	tr.appendChild(td);
	var td = document.createElement("td");
	td.textContent = mima;
	td.className="mima";
	tr.appendChild(td);
	var td = document.createElement("td");
	var editButton = document.createElement("button");
    editButton.className = "btn btn-success btn-xs glyphicon glyphicon-edit";
    editButton.setAttribute("sid",sid);
    editButton.onclick = function () {
    	editEnvServer(this);
    }
    td.appendChild(editButton);
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