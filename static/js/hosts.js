$(function(){
	document.getElementById("createHost").onclick=function(){
		startShadow();
		showCreateHostDiv();
	}
	
	document.getElementById("closeCreateHost").onclick=function(){
		stopShadow();
		closeCreateHostDiv();
	}
	
	document.getElementById("saveHost").onclick=function(){
		stopShadow();
		saveHost();
		closeCreateHostDiv();
	}
	
	getHostsTab();
})

function startShadow() {
    document.getElementById("shadow").style.display = "block";
}

function stopShadow() {
    document.getElementById("shadow").style.display = "none";
}

function showCreateHostDiv(){
	document.getElementById("ip").value="";
	document.getElementById("hostName").value="";
	document.getElementById("os").value="";
	document.getElementById("software").value="";
	$("#createHostDiv").animate({
		"left":"0px",
		"top":"0px",
	});
}

function closeCreateHostDiv(){
	$("#createHostDiv").animate({
		"left":"-100%",
		"top":"-120%",
	});
}

function saveHost(){
	var sid=Math.random().toString(36).substr(2);
	var ip=$("#ip").val();
	var hostname=$("#hostName").val();
	var os=$("#os").val();
	var software=$("#software").val();
	var fenpei="未分配";
	var status="使用中";
	data={sid:sid,ip:ip,hostname:hostname,os:os,software:software,fenpei:fenpei,status:status};
	$.ajax({
		url:"/save_host/",
		type:"POST",
		dataType:"Json",
		data:data,
		success:function(){
			createHostLine(data);
		}
	})
}

function createHostLine(hostLine){
	var tbody=document.getElementById("hostsTbody");
	var tr=document.createElement("tr");
	
	var td=document.createElement("td");
	td.textContent=hostLine.ip;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=hostLine.hostname;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=hostLine.os;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=hostLine.software;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=hostLine.app;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=hostLine.owner;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=hostLine.fenpei;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=hostLine.status;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	
    var editButton = document.createElement("button");
    var sid=hostLine.sid;
    editButton.setAttribute("sid", sid);
    editButton.style.marginLeft = "3px";
    editButton.className = "btn btn-success btn-xs glyphicon glyphicon-edit";
    editButton.onclick = function () {
    		
    }
    td.appendChild(editButton);
    
    var addUserButton = document.createElement("button");
    var sid=hostLine.sid;
    addUserButton.setAttribute("sid", sid);
    addUserButton.style.marginLeft = "3px";
    addUserButton.className = "btn btn-primary btn-xs glyphicon glyphicon-user";
    addUserButton.onclick = function () {
    		
    }
    td.appendChild(addUserButton);
    
    var detailButton = document.createElement("button");
    var sid=hostLine.sid;
    detailButton.setAttribute("sid", sid);
    detailButton.style.marginLeft = "3px";
    detailButton.className = "btn btn-info btn-xs glyphicon glyphicon-list-alt";
    detailButton.onclick = function () {
    		
    }
    td.appendChild(detailButton);
    
    var delButton = document.createElement("button");
    var sid=hostLine.sid;
    delButton.setAttribute("sid", sid);
    delButton.style.marginLeft = "3px";
    delButton.className = "btn btn-danger btn-xs glyphicon glyphicon-trash";
    delButton.onclick = function () {
    	delHost(this);
    }
    td.appendChild(delButton);
	
	tr.appendChild(td);
	
	tbody.appendChild(tr);
}

function getHostsTab(){
	$.ajax({
		url:"/get_host/",
		type:"POST",
		dataType:"Json",
		data:'data',
		success:function(data){
			hosts=data.content;
			for (var i=0;i<hosts.length;i++){
				var host=hosts[i];
				var sid=host.sid;
				var ip=host.ip;
				var hostname=host.hostname;
				var os=host.os;
				var software=host.software;
				var fenpei=host.fenpei;
				var status=host.sta;
				h={sid:sid,ip:ip,hostname:hostname,os:os,software:software,fenpei:fenpei,status:status};
				createHostLine(h);
			}
		},
	})
}

function delHost(delBtn){
	var sid=delBtn.getAttribute("sid");
	$.ajax({
		url:"/del_host/",
		type:"POST",
		dataTyep:"Json",
		data:{"sid":sid},
		success:function(){
			var tr=$(delBtn).parent().parent();
			$(tr).remove();
		}
	});
}