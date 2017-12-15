/**
 * 
 */
$(function () {	
	getEnvTable()
//	loadServersConfigTable()
    document.getElementById("createServer").onclick = function () {
		document.getElementById("name").value="";
		document.getElementById("domain").value="";
		document.getElementById("disc").value="";
        window.currentEditServerModel = "create";
        startShadow();
        showEditServerConfigTable();
    }
    
    document.getElementById("saveEnvConfig").onclick = function () {
        if (getServerConfigFromTable()) {
            closeAddEnv();
        }
    }
    
    document.getElementById("closeEditEnv").onclick = function () {
    	closeEditEnv();
    }
    
    document.getElementById("closeAddEnv").onclick = function () {
    	closeAddEnv();
    }
})

function startShadow() {
    document.getElementById("shadow").style.display = "block";
}

function stopShadow() {
    document.getElementById("shadow").style.display = "none"
}

function showEditServerConfigTable() {
    $("#addServerConfigTable").animate({
        "left": "0px",
        "top": "0px",
    });
}

function closeAddEnv() {
    stopShadow();
    $("#addServerConfigTable").animate({
        "left": "100%",
        "top": "120%",
    })
}

function closeEditEnv() {
    stopShadow();
    $("#editEnvConfigTable").animate({
        "left": "100%",
        "top": "120%",
    })
}

function getServerConfigFromTable() {
	var name =$('#name').val();
	var domain =$('#domain').val();
	var disc=$("#disc").val();
	var sid= Math.random().toString(36).substr(2);
	serverLine={env_name:name,env_domain:domain,env_sid:sid,env_disc:disc};
    $.ajax({
        url:'/env_add/',
        type:'POST',
        data:{name:name,domain:domain,sid:sid,disc:disc},
    })
    createServerLine(serverLine);
    return true;
}

function getEnvTable() {
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
            	serverLine={'env_name':name,'env_domain':domain,'env_sid':sid,'env_disc':disc}
                createServerLine(serverLine);//调用创建服务器的每一行
            }
        },
    })
}

function loadServersConfigTable() {
    //显示服务器到表格中
    $("#envTbody").children().remove();//删除此前的HTML，这里有可能是加载刷新
    for (var i = 0; i < window.allServersList.length; i++) {
        var serverLine = window.allServersList[i];
        createServerLine(serverLine);//调用创建服务器的每一行
    }
}

function createServerLine(serverLine) {
    var tbody = document.getElementById("envTbody");
    var tr = document.createElement("tr");//创建一行
    
    var td = document.createElement("td");
    td.textContent = serverLine.env_name;
    td.className = "env_name";
    tr.appendChild(td);

    var td = document.createElement("td");
    td.textContent = serverLine.env_domain;
    td.className = "env_domain";
    tr.appendChild(td);
    
    var td = document.createElement("td");
    td.textContent = serverLine.env_disc;
    td.className = "env_disc";
    tr.appendChild(td);

    var td = document.createElement("td");
    var editButton = document.createElement("button");
    var sid=serverLine.env_sid;
    editButton.setAttribute("sid", sid);
    editButton.className = "btn btn-success btn-xs glyphicon glyphicon-edit";
    editButton.onclick = function () {
        window.currentEditTr = this;//当前最的编辑行
        loadServerLineToTable(this);//把当前的编辑按钮传入，按钮中存在各个属性
        window.currentEditServerModel = "edit";//记录当前的编辑模式，有edit/create
    }
    td.appendChild(editButton);

    var deleteButton = document.createElement("button");
    var sid=serverLine.env_sid;
    deleteButton.setAttribute("sid", sid);
    deleteButton.style.marginLeft = "3px";
    deleteButton.className = "btn btn-danger btn-xs glyphicon glyphicon-trash";
    deleteButton.onclick = function () {
        var deleteButtonElements = this;//可以批量删除
        deleteServerConfig(deleteButtonElements);
    }
    td.appendChild(deleteButton);
    tr.appendChild(td);

    tbody.appendChild(tr);
}

function deleteServerConfig(deleteButtonElements) {
    var hosts=deleteButtonElements.getAttribute("sid");
    $.ajax({
        url:"/env_del/",
        dataType: 'json',
        data: {"hosts":hosts},
        success: function (data) {
        	deleteServerConfigLine(deleteButtonElements);
        }
    });
}

function deleteServerConfigLine(deleteButton) {
    //删除服务器，请求服务服务器成功后，删除tr行
    var sid = deleteButton.getAttribute("sid");
    var td = $(deleteButton).parent();
    var tr = $(td).parent();
    $(tr).remove();//删除TR
}

function loadServerLineToTable(editButton) {
    startShadow();
//    showEditServerConfigTable();//只是显示编辑框
    $("#editEnvConfigTable").animate({
        "left": "0px",
        "top": "0px",
    });
    var sid = editButton.getAttribute("sid");
    var td = $(editButton).parent();
    var tr = $(td).parent();
    var name = $(tr).find(".env_name")[0].textContent;
    var domain = $(tr).find(".env_domain")[0].textContent;
    var disc=$(tr).find(".env_disc")[0].textContent;
    document.getElementById("edit_name").value = name;
    document.getElementById("edit_domain").value = domain;
    document.getElementById("edit_disc").value=disc;
    
    document.getElementById("saveEditEnv").onclick = function () {
    	var name =$('#edit_name').val()
    	var domain =$('#edit_domain').val()
    	var disc=$("#edit_disc").val()
    	serverLine={env_name:name,env_domain:domain,env_sid:sid}
        $.ajax({
            url:'/env_edit/',
            type:'POST',
            data:{name:name,domain:domain,sid:sid,disc:disc},
            success: function(){
            	closeEditEnv();
            	$("#envTbody").html("");
            	getEnvTable();
            }
        })  
    }
    
}

function showEditServerConfigTable() {
    //显示服务器编辑框
    $("#addServerConfigTable").animate({
        "left": "0px",
        "top": "0px",
    });
}