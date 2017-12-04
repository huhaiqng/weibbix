$(function(){
	document.getElementById("createOSUser").onclick=function(){
		startShadow();
		showCreateOSUserDiv();
	}
	
	document.getElementById("closeCreateOSUser").onclick=function(){
		stopShadow();
		closeCreateOSUserDiv();
	}
	
	document.getElementById("chooseIp").onclick=function(){
		showIpDiv();
		createIpTab();
	}
	
	document.getElementById("closeShowIpDiv").onclick=function(){
		closeShowIpDiv();
	}
	
	document.getElementById("selectAllIp").onclick = function (){
    	selectAllIp();
    }
	
	document.getElementById("chooseIpBtn").onclick = function(){
		chooseIp();
	}
	
	document.getElementById("saveOSUser").onclick = function(){
		saveOSUser();
	}
})

function startShadow() {
    document.getElementById("shadow").style.display = "block";
}

function stopShadow() {
    document.getElementById("shadow").style.display = "none";
}

function showCreateOSUserDiv(){
	document.getElementById("ip").value="";
	document.getElementById("userName").value="";
	document.getElementById("passwd").value="";
	document.getElementById("notice").value="";
	$("#createOSUserDiv").animate({
		"left":"0px",
		"top":"0px",
	});
}

function closeCreateOSUserDiv(){
	$("#createOSUserDiv").animate({
		"left":"-100%",
		"top":"-120%",
	});
}

function showIpDiv(){
	$("#showIpDiv").animate({
		"left":"0px",
		"top":"0px",
	})
}

function closeShowIpDiv(){
	$("#createOSUserDiv").animate({
		"left":"0px",
		"top":"0px",
	});
	$("#showIpDiv").animate({
		"left":"-100%",
		"top":"-120%",
	});
}

function createIpTab(){
	$("#ipTbody").empty();
	$.ajax({
        url: "/ip_list/",
        dataType: 'json',
        data:'data',
        success: function(data){
        	ips=data.content
        	for (var i = 0; i < ips.length; i++) {
                var ip = ips[i].ip;
                var sid=ips[i].sid;
        		ipLine={'ip':ip,'sid':sid};
                createIpLine(ipLine);
            }
        },
    })
}

function createIpLine(ipLine){
	var ip=ipLine.ip;
	var sid=ipLine.sid;
	tbody=document.getElementById("ipTbody");
	var tr = document.createElement("tr");
	
	var span = document.createElement("span");
    span.className = "glyphicon glyphicon-unchecked serverCheck";
    var td = document.createElement("td");//复选框td
    td.style.cursor = "pointer";
    td.onclick = function () {
        selectIpCheck(this);//绑定复选框点击事件
    }
    td.appendChild(span);
    tr.appendChild(td);
    
    var td = document.createElement("td");
    td.textContent = ip;
    td.className="ip";
	td.setAttribute("sid", sid);
    tr.appendChild(td);
    
    tbody.appendChild(tr);
}

function selectIpCheck(team) {
    var span = $(team).children()[0];
    var i=$("#selectAllIp").children()[0];
    var m=0;
    var n=0;
    
    if ($(span).hasClass("glyphicon-unchecked")) {
        $(span).removeClass("glyphicon-unchecked").addClass("glyphicon-check");
        $("#ipTbody").find(".glyphicon-unchecked").each(function (){
        	m=m+1;
        });
        if (m==0){
        	$(i).removeClass("glyphicon-unchecked").addClass("glyphicon-check");
        }
    }
    else {
        $(span).removeClass("glyphicon-check").addClass("glyphicon-unchecked");
        $(i).removeClass("glyphicon-check").addClass("glyphicon-unchecked");
        $("#ipTbody").find(".glyphicon-check").each(function (){
        	n=n+1;
        });
        if (n==0){
        	$(i).removeClass("glyphicon-check").addClass("glyphicon-unchecked");
        }
    }
}

function selectAllIp(){
	var i=$("#selectAllIp").children()[0];
	if ($(i).hasClass("glyphicon-unchecked")) {
        $(i).removeClass("glyphicon-unchecked").addClass("glyphicon-check");
        $("#ipTbody").find(".glyphicon-unchecked").each(function (){
        	$(this).removeClass("glyphicon-unchecked").addClass("glyphicon-check");
        });
    }
    else {
        $(i).removeClass("glyphicon-check").addClass("glyphicon-unchecked");
        $("#ipTbody").find(".glyphicon-check").each(function (){
        	$(this).removeClass("glyphicon-check").addClass("glyphicon-unchecked");
        });
    }	
}

function chooseIp(){
	var ips=[];
	var sids=[];
	$("#ipTbody").find(".glyphicon-check").each(function(){
		var tr = $(this).parent().parent();
		var obj = $(tr).find(".ip")[0];
        var ip = $(tr).find(".ip")[0].textContent;
        var sid = obj.getAttribute("sid");
    	ips.push(ip);
    	sids.push(sid);
	})
    document.getElementById("ip").value=ips;
	$("#showIpDiv").animate({
		"left":"-100%",
		"top":"-120%",
	});
	window.ips=ips;
	window.sids=sids;
}

function saveOSUser(){
	ips=window.ips;
	sids=window.sids;
	for (var i=0 ;i<ips.length;i++){
		ip=ips[i];
		sid=sids[i];
		username=$("#userName").val();
		passwd=$("#passwd").val();
		notice=$("#notice").val();
		data={sid:sid,ip:ip,username:username,passwd:passwd,notice:notice};
		createOSUserLine(data);
	}
	stopShadow();
	closeCreateOSUserDiv();
}

function createOSUserLine(userLine){
	var tbody=document.getElementById("osuserTbody");
	var tr=document.createElement("tr");
	
	var td=document.createElement("td");
	td.textContent=userLine.ip;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=userLine.username;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=userLine.passwd;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=userLine.notice;
	tr.appendChild(td);
	
	var td=document.createElement("td");
	
    var editButton = document.createElement("button");
    editButton.style.marginLeft = "3px";
    var sid=userLine.sid;
    editButton.setAttribute("sid", sid);
    editButton.className = "btn btn-success btn-xs glyphicon glyphicon-edit";
    editButton.onclick = function () {
    		
    }
    td.appendChild(editButton);
    
    var delButton = document.createElement("button");
    delButton.style.marginLeft = "3px";
    var sid=userLine.sid;
    delButton.setAttribute("sid", sid);
    delButton.className = "btn btn-danger btn-xs glyphicon glyphicon-trash";
    delButton.onclick = function () {
    	delHost(this);
    }
    td.appendChild(delButton);
	
	tr.appendChild(td);
		
	tbody.appendChild(tr);
}