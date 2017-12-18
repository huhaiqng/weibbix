function startShadow() {
    document.getElementById("shadow").style.display = "block";
}

function stopShadow() {
    document.getElementById("shadow").style.display = "none"
}

function showAddApp() {
    $("#addApp").animate({
        "left": "0px",
        "top": "0px",
    });
}

function showUploadApp() {
    $("#uploadApp").animate({
        "left": "0px",
        "top": "0px",
    });
}

function showDeployApp() {
    $("#deployApp").animate({
        "left": "0px",
        "top": "0px",
    });
}

function getDepEnv(deleteButtonElements){
	var sid=deleteButtonElements.getAttribute("sid");
    $.ajax({
    	type:"POST",
    	url:"/dep_env/",
        dataType: 'json',
        data: {"sid":sid},
        success: function (data) {
        	envs=data.content
        	for (var i=0; i<envs.length; i++){
        		var env=envs[i]
        		e=env.con_env;
                var select = document.getElementById("dep_env");
                var op = document.createElement("option");//创建一行
                op.textContent = e;
                select.appendChild(op);
        	}
        	getDepServer();
        }
    });
}

function closeAddApp() {
    stopShadow();
    $("#addApp").animate({
        "left": "100%",
        "top": "120%",
    })
}

function closeUpload() {
    stopShadow();
    $("#showMainContent").load("/static/html/tomcat.html");
}

function closeDeployApp() {
    stopShadow();
    $("#showMainContent").load("/static/html/tomcat.html");
}

function uploadFile(){
	var fileobj = $("#img")[0].files[0];
	var form = new FormData();
	form.append('img',fileobj);
    form.append('user','alex');
    var btn = document.getElementById("closeUpload");
    btn.setAttribute("disabled","disabled" );
    $.ajax({
        type:'POST',
        url:'/upload_ajax/',
        data:form,
        processData:false,  // 告诉jquery不转换数据
        contentType:false,  // 告诉jquery不设置内容格式
        success:function(){
        	$('#closeUpload').removeAttr("disabled");
        },
    })
}

function saveApp() {
	var tom_name =$('#appname').val()
	var tom_ma =$('#appma').val()
	var tom_sid= Math.random().toString(36).substr(2);
	appLine={app_name:tom_name,app_ma:tom_ma,app_sid:tom_sid}
    $.ajax({
        url:'/tom_add/',
        type:'POST',
        data:{tom_name:tom_name,tom_ma:tom_ma,tom_sid:tom_sid},
    })
    createAppLine(appLine)
    return true
}

function getAppTable() {
    $.ajax({
        url: "/tom_list/",
        dataType: 'json',
        data:'data',
        success: function(data){
        	toms=data.content
        	for (var i = 0; i < toms.length; i++) {
                var tom = toms[i];
                app_name=tom.tom_name
            	app_ma=tom.tom_ma
            	app_sid=tom.tom_sid
            	appLine={'app_name':app_name,'app_ma':app_ma,'app_sid':app_sid}
                createAppLine(appLine);//调用创建服务器的每一行
            }
        },
    })
}

function createAppLine(appLine) {
    //serverLine是一个服务器的全部配置
    var tbody = document.getElementById("appTbody");
    var tr = document.createElement("tr");//创建一行

    var td = document.createElement("td");
    td.textContent = appLine.app_name;
    td.className = "app_name";
    tr.appendChild(td);

    var td = document.createElement("td");
    td.textContent = appLine.app_ma;
    td.className = "app_ma";
    tr.appendChild(td);

    var td = document.createElement("td");
    var editButton = document.createElement("button");
    var sid=appLine.app_sid;
    editButton.setAttribute("sid", sid);
    editButton.className = "btn btn-success btn-xs glyphicon glyphicon-edit";
    editButton.onclick = function () {
    	window.deploymentEditSid=this.getAttribute("sid");
        $("#showMainContent").load("/static/html/appconfig.html");
    }
    td.appendChild(editButton);

    var uploadButton = document.createElement("button");
    var sid=appLine.app_sid;
    uploadButton.setAttribute("sid", sid);
    uploadButton.style.marginLeft = "3px";
    uploadButton.className = "btn btn-primary btn-xs glyphicon glyphicon-arrow-up";
    uploadButton.onclick = function () {
//        window.currentEditTr = this;//当前最的编辑行
//        loadServerLineToTable(this);//把当前的编辑按钮传入，按钮中存在各个属性
//        window.currentEditServerModel = "edit";//记录当前的编辑模式，有edit/create
    	startShadow();
    	showUploadApp();
    }
    td.appendChild(uploadButton);
    
    var deployButton = document.createElement("button");
    var sid=appLine.app_sid;
    deployButton.setAttribute("sid", sid);
    deployButton.style.marginLeft = "3px";
    deployButton.className = "btn btn-info btn-xs glyphicon glyphicon-tasks";
    deployButton.onclick = function () {
    	window.deploymentSid=this.getAttribute("sid");
    	var deleteButtonElements = this;//可以批量删除
        getDepEnv(deleteButtonElements);
        getDepApp(deleteButtonElements);
    	startShadow();
    	showDeployApp(); 	
    }
    td.appendChild(deployButton);
    
    var deleteButton = document.createElement("button");
    var sid=appLine.app_sid;
    deleteButton.setAttribute("sid", sid);
    deleteButton.style.marginLeft = "3px";
    deleteButton.className = "btn btn-danger btn-xs glyphicon glyphicon-trash";
    deleteButton.onclick = function () {
        //记得从windowallServerList中删除记录
        var deleteButtonElements = this;//可以批量删除
        deleteApp(deleteButtonElements);
    }
    td.appendChild(deleteButton);
    tr.appendChild(td);


    //最后加入表格
    tbody.appendChild(tr);
}

function deleteApp(deleteButtonElements) {
    var sid=deleteButtonElements.getAttribute("sid");
    $.ajax({
        url:"/tom_del/",
        dataType: 'json',
        data: {"sid":sid},
        success: function (data) {
        	deleteAppLine(deleteButtonElements);
        }
    });
}

function deleteAppLine(deleteButton) {
    //删除服务器，请求服务服务器成功后，删除tr行
    var sid = deleteButton.getAttribute("sid");
    var td = $(deleteButton).parent();
    var tr = $(td).parent();
    $(tr).remove();//删除TR
}


function showEditServerConfigTable() {
    //显示服务器编辑框
    $("#addServerConfigTable").animate({
        "left": "0px",
        "top": "0px",
    });
}

$(function () {	
	getAppTable()
//	loadServersConfigTable()
    document.getElementById("createApp").onclick = function () {
		document.getElementById("appname").value="";
		document.getElementById("appma").value="";
        window.currentEditServerModel = "create";
        startShadow();
        showAddApp();
    }
    
    document.getElementById("saveApp").onclick = function () {
        if (saveApp()) {
            closeAddApp();
        }
    }
     
    document.getElementById("closeAddApp").onclick = function () {
    	closeAddApp();
    }
    
    document.getElementById("closeUpload").onclick = function () {
    	closeUpload();
    }
    
    document.getElementById("uploadFile").onclick = function () {
    	uploadFile();
    }
    
    document.getElementById("deployAppBtn").onclick = function () {
    	deployAppToServer();
    }
    
    document.getElementById("closeDeployApp").onclick = function () {
    	closeDeployApp();
    }
    
    document.getElementById("dep_env").onchange = function(){
    	getDepServer()
    }
    
    jQuery1_8("#selectAllServers").toggle(
            function () {
                $(".serverCheck").removeClass("glyphicon-unchecked").addClass("glyphicon-check");
                $(this).children("i").removeClass("glyphicon-unchecked").addClass("glyphicon-check");
            }, function () {
                $(".serverCheck").removeClass(" glyphicon-check").addClass("glyphicon-unchecked ");
                $(this).children("i").removeClass(" glyphicon-check").addClass("glyphicon-unchecked ");

            }
        );
})

function getDepApp(deleteButtonElements){
	var sid=deleteButtonElements.getAttribute("sid");
    $.ajax({
    	type:"POST",
    	url:"/dep_app/",
        dataType: 'json',
        data: {"sid":sid},
        success: function (data) {
        	apps=data.content
        	for (var i=0; i<apps.length; i++){
        		var app=apps[i]
        		a=app.dep_app;
                var select = document.getElementById("dep_app");
                var op = document.createElement("option");//创建一行
                op.textContent = a;
                select.appendChild(op);
        	}
        }
    });
}

function deployAppToServer(){
    $("#depServerTbody").find(".glyphicon-check").each(function () {
        var td = $(this).parent();
        var tr = $(td).parent();
        var con_srv = $(tr).find(".con_srv")[0].textContent;
        var con_dir = $(tr).find(".con_dir")[0].textContent;
        var sid=window.deploymentSid;
    	var app=$("#dep_app").find("option:selected").val();
    	var env=$("#dep_env").find("option:selected").val();
    	var btn = document.getElementById("closeDeployApp");
    	btn.setAttribute("disabled","disabled" );
    	$.ajax({
    		type:"POST",
    		url:"/dep_app_to_server/",
    		dataType:"json",
    		data:{"sid":sid,"env":env,"app":app,"con_srv":con_srv,"con_dir":con_dir},
    		success:function(){
    			$('#closeDeployApp').removeAttr("disabled");
    		},
    	});
    })
	
	
	
//	var sid=window.deploymentSid;
//	var app=$("#dep_app").find("option:selected").val();
//	var env=$("#dep_env").find("option:selected").val();
//	var btn = document.getElementById("closeDeployApp");
//    btn.setAttribute("disabled","disabled" );
//	$.ajax({
//		type:"POST",
//		url:"/dep_app_to_server/",
//		dataType:"json",
//		data:{"sid":sid,"env":env,"app":app},
//		success:function(){
//			$('#closeDeployApp').removeAttr("disabled");
//		},
//	});
}

function getDepServer(){
	var sid=window.deploymentSid;
	var env=$("#dep_env").find("option:selected").val();
	$("#depServerTbody").empty();   
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"/get_dep_srv/",
		data:{con_sid:sid,con_env:env},
		success:function(data){
			var srvs=data.content;
			for (i=0;i<srvs.length;i++){
				srv=srvs[i];
				con_srv=srv.con_srv;
				con_dir=srv.con_dir;
				srvLine={con_srv:con_srv,con_dir:con_dir};
				createDepSrv(srvLine);
			}
		}
	});
}

function createDepSrv(srvLine){
	var con_srv=srvLine.con_srv;
	var con_dir=srvLine.con_dir;
	tbody=document.getElementById("depServerTbody");
	var tr = document.createElement("tr");
	
	var span = document.createElement("span");
    span.className = "glyphicon glyphicon-unchecked serverCheck";
    var td = document.createElement("td");//复选框td
    td.style.cursor = "pointer";
    td.onclick = function () {
        selectServerCheck(this);//绑定复选框点击事件
    }
    td.appendChild(span);
    tr.appendChild(td);
    
    var td = document.createElement("td");
    td.textContent = con_srv;
    td.className="con_srv"
    tr.appendChild(td);
    
    var td = document.createElement("td");
    td.textContent = con_dir;
    td.className="con_dir";
    tr.appendChild(td);
    
    tbody.appendChild(tr);
}

function selectServerCheck(team) {
    var span = $(team).children()[0];
    if ($(span).hasClass("glyphicon-unchecked")) {
        $(span).removeClass("glyphicon-unchecked").addClass("glyphicon-check");
    }
    else {
        $(span).removeClass("glyphicon-check").addClass("glyphicon-unchecked");
    }
}