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
	
	document.getElementById("saveEditOSUser").onclick=function(){
		saveEditOSUser();
	}
	
	document.getElementById("closeEditOSUser").onclick=function(){
		closeEditOSUser();
	}
	
	document.getElementById("searchBtn").onclick=function(){
		searchOSUser();
	}
	getOSUserTab();
})

async function onesecond() {
  await sleep(1000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startShadow() {
    document.getElementById("shadow").style.display = "block";
}

function stopShadow() {
    document.getElementById("shadow").style.display = "none";
}

function showCreateOSUserDiv(){
	window.addStatus="notip";
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
//	$("#createOSUserDiv").animate({
//		"left":"0px",
//		"top":"0px",
//	});
	$("#showIpDiv").animate({
		"left":"-100%",
		"top":"-120%",
	});
}

function closeEditOSUser(){
	$("#editOSUserDiv").animate({
		"left":"-100%",
		"top":"-120%",
	});
	stopShadow();
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
	window.addStatus="chooseip";
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
//	console.log(ips);
	if (window.addStatus=="chooseip"){
		for (var i=0 ;i<ips.length;i++){	
			ip=ips[i];
			sid=sids[i];
			username=$("#userName").val();
			passwd=$("#passwd").val();
			notice=$("#notice").val();
			data={sid:sid,ip:ip,username:username,passwd:passwd,notice:notice};
			$.ajax({
				url:"/save_osuser/",
				type:"POST",
				dataType:"json",
				data:data,
			});			
		}
	}	
	else{
		var sid=Math.random().toString(36).substr(2);
		ip=$("#ip").val();
		username=$("#userName").val();
		passwd=$("#passwd").val();
		notice=$("#notice").val();
		data={sid:sid,ip:ip,username:username,passwd:passwd,notice:notice};
		$.ajax({
			url:"/save_osuser/",
			type:"POST",
			dataType:"json",
			data:data,
		});
	}
	$("#osuserTbody").empty();
	onesecond();
	getOSUserTab();
	stopShadow();
	closeCreateOSUserDiv();
}

function createOSUserLine(userLine){
	var tbody=document.getElementById("osuserTbody");
	var tr=document.createElement("tr");
	
	var td=document.createElement("td");
	td.textContent=userLine.ip;
	td.className="ip";
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=userLine.username;
	td.className="username";
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=userLine.passwd;
	td.className="passwd";
	tr.appendChild(td);
	
	var td=document.createElement("td");
	td.textContent=userLine.notice;
	td.className="notice";
	tr.appendChild(td);
	
	var td=document.createElement("td");
	
    var editButton = document.createElement("button");
    editButton.style.marginLeft = "3px";
    var sid=userLine.sid;
    editButton.setAttribute("sid", sid);
    editButton.className = "btn btn-success btn-xs glyphicon glyphicon-edit";
    editButton.onclick = function () {
    	editOSUser(this);
    }
    td.appendChild(editButton);
    
    var delButton = document.createElement("button");
    delButton.style.marginLeft = "3px";
    var sid=userLine.sid;
    delButton.setAttribute("sid", sid);
    delButton.className = "btn btn-danger btn-xs glyphicon glyphicon-trash";
    delButton.onclick = function () {
    	delOSUser(this);
    }
    td.appendChild(delButton);
	
	tr.appendChild(td);
		
	tbody.appendChild(tr);
}

function getOSUserTab(){
	$.ajax({
		url:"/osuser_list/",
		type:"POST",
		dataType:"json",
		data:"data",
		success:function(data){
			ips=data.content;
			for (var i=0;i<ips.length;i++){
				osus=ips[i].content;
				osu=ips[i];
				ip=osu.ip;
				sid=osu.sid;
				username=osu.username;
				passwd=osu.passwd;
				notice=osu.notice;
				data={sid:sid,ip:ip,username:username,passwd:passwd,notice:notice};
				createOSUserLine(data);
			}
			
			
/*			$("#osuserTab").bootstrapTable('destroy').bootstrapTable({
	            method: 'post',
	            contentType:"application/x-www-form-urlencoded; charset=UTF-8", // 默认是：'application/json'， 不改的话，后台获取不到数据！ ###### 非常重要！！######
	            cache: false,   //是否启用 数据缓存
	            pagination: true,  //是都分页
	            sidePageination: 'client',   //谁来分页，客户端：'client'，服务端：'server'
	            pageNumber: 1,   //默认显示 首页
	            pageSize: 15,     //每页需要显示的数据量
	            uniqueId: 'gameorderid',
	            silent: true,    // 刷新服务器数据
	            showExport: true,
	            exportDataType: 'all',
	            onSort: function (a, b) { //点击排序时触发
	                $(".fixed-table-header").removeClass('hidden');
	                return a - b;
	            },
	            onLoadSuccess: function (data) { //加载成功时执行
	                alert(1);
	                console.log(data);
	            },
	            onLoadError: function (res) { //加载失败时执行
	                console.log(res);
	            }
	        });*/
			
			
		},
	})
}

function delOSUser(delBtn){
	var tr=delBtn.parentNode.parentNode;
	var ip=$(tr).find(".ip")[0].textContent;
	var username=$(tr).find(".username")[0].textContent;
	data={username:username,ip:ip};
	$.ajax({
		url:"/del_osuser/",
		type:"POST",
		dataType:"json",
		data:data,
		success:function(){
			$(tr).remove();
		}
	});
}

function editOSUser(editBtn){
	var tr=editBtn.parentNode.parentNode;
	var sid=editBtn.getAttribute("sid");
	var eip=$(tr).find(".ip")[0].textContent;
	var eusername=$(tr).find(".username")[0].textContent;
	var epasswd=$(tr).find(".passwd")[0].textContent;
	var enotice=$(tr).find(".notice")[0].textContent;
	window.editTr=tr;
	window.editSid=sid;
	document.getElementById("eip").value=eip;
	document.getElementById("eusername").value=eusername;
	document.getElementById("epasswd").value=epasswd;
	document.getElementById("enotice").value=enotice;
	startShadow();
	$("#editOSUserDiv").animate({
		"left":"0px",
		"top":"0px",
	});
}

function saveEditOSUser(){
	var tr=window.editTr;
	var sid=window.editSid;
	var ip=$("#eip").val();
	var username=$("#eusername").val();
	var passwd=$("#epasswd").val();
	var notice=$("#enotice").val();
	console.log(sid);
	data={sid:sid,ip:ip,username:username,passwd:passwd,notice:notice};
	$.ajax({
		url:"/edit_osuser/",
		type:"POST",
		dataType:"json",
		data:data,
		success:function(){
			$(tr).find(".ip")[0].textContent=ip;
			$(tr).find(".username")[0].textContent=username;
			$(tr).find(".passwd")[0].textContent=passwd;
			$(tr).find(".notice")[0].textContent=notice;
			closeEditOSUser();
		}
	});
}

function searchOSUser(){
	var sip=document.getElementById("sip").value;
	data={sip:sip};
	$("#osuserTbody").empty();
	$.ajax({
		url:"/search_osuser/",
		type:"POST",
		dataType:"json",
		data:data,
		success:function(data){
			osus=data.content;
			for (var i=0;i<osus.length;i++){
				osu=osus[i];
				ip=osu.ip;
				sid=osu.sid;
				username=osu.username;
				passwd=osu.passwd;
				notice=osu.notice;
				data={sid:sid,ip:ip,username:username,passwd:passwd,notice:notice};
				createOSUserLine(data);
			}
		},
	})
}