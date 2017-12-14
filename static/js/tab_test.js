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

            var pageSize = 2;    //每页显示的记录条数
            var curPage=0;        //当前页
            var lastPage;        //最后页
            var direct=0;        //方向
            var len;            //总行数
            var page;            //总页数
            var begin;
            var end;
            
            len =$("#osuserTbody tr").length;    // 求这个表的总行数，剔除第一行介绍
            page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
            // alert("page==="+page);
            curPage=1;    // 设置当前为第一页
            displayPage(1);//显示第一页
            
            document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";    // 显示当前多少页
            document.getElementById("sjzl").innerHTML="数据总量 " + len + "";        // 显示数据量
            document.getElementById("pageSize").value = pageSize;
                        
            $("#btn1").click(function firstPage(){    // 首页
                curPage=1;
                direct = 0;
                displayPage();
            });
            $("#btn2").click(function frontPage(){    // 上一页
                direct=-1;
                displayPage();
            });
            $("#btn3").click(function nextPage(){    // 下一页
                direct=1;
                displayPage();
            });
            $("#btn4").click(function lastPage(){    // 尾页
                curPage=page;
                direct = 0;
                displayPage();
            });
            $("#btn5").click(function changePage(){    // 转页
	            curPage=document.getElementById("changePage").value * 1;
	            if (!/^[1-9]\d*$/.test(curPage)) {
	                alert("请输入正整数");
	                return ;
	            }
	            if (curPage > page) {
	                alert("超出数据页面");
	                return ;
	            }
	            direct = 0;
	            displayPage();
            });
            
            $("#pageSizeSet").click(function setPageSize(){    // 设置每页显示多少条记录
                pageSize = document.getElementById("pageSize").value;    //每页显示的记录条数
                if (!/^[1-9]\d*$/.test(pageSize)) {
                    alert("请输入正整数");
                    return ;
                }
                len =$("#mytable tr").length - 1;
                page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
                curPage=1;        //当前页
                direct=0;        //方向
                firstPage();
            });
 
 
            function displayPage(){
                if(curPage <=1 && direct==-1){
                    direct=0;
                    alert("已经是第一页了");
                    return;
	            } else if (curPage >= page && direct==1) {
	                direct=0;
	                alert("已经是最后一页了");
	                return ;
	            }
            
                lastPage = curPage;
           
	            // 修复当len=1时，curPage计算得0的bug
	            if (len > pageSize) {
	                curPage = ((curPage + direct + len) % len);
	            } else {
	                curPage = 1;
	            }
                 
	            document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";        // 显示当前多少页
            
	            begin=(curPage-1)*pageSize + 1;// 起始记录号
	            end = begin + 1*pageSize - 1;    // 末尾记录号
                  
	            if(end > len ) end=len;
	            $("#osuserTbody tr").hide();    // 首先，设置这行为隐藏
	            $("#osuserTbody tr").each(function(i){    // 然后，通过条件判断决定本行是否恢复显示
	                if(i>=begin-1 && i<end)//显示begin<=x<=end的记录
	                    $(this).show();
	            });
         }
            
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