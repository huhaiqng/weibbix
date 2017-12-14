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
//			createHostLine(data);
			$("#hostsTbody").empty();
			getHostsTab();
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
			
			var pageSize = 15;    //每页显示的记录条数
            var curPage=0;        //当前页
            var lastPage;        //最后页
            var direct=0;        //方向
            var len;            //总行数
            var page;            //总页数
            var begin;
            var end;
            
            len =$("#hostsTbody tr").length;    // 求这个表的总行数，剔除第一行介绍
            page=len % pageSize==0 ? len/pageSize : Math.floor(len/pageSize)+1;//根据记录条数，计算页数
            curPage=1;    // 设置当前为第一页
            displayPage(1);//显示第一页
            
            document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";    // 显示当前多少页
            document.getElementById("sjzl").innerHTML="数据总量 " + len + " 条&nbsp";        // 显示数据量
            document.getElementById("pageSize").innerText = pageSize;
                        
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
            
/*            $("#pageSizeSet").click(function setPageSize(){    // 设置每页显示多少条记录
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
            });*/
 
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
                 
//	            document.getElementById("btn0").innerHTML="当前 " + curPage + "/" + page + " 页    每页 ";        // 显示当前多少页
            
	            begin=(curPage-1)*pageSize + 1;// 起始记录号
	            end = begin + 1*pageSize - 1;    // 末尾记录号
                  
	            if(end > len ) end=len;
	            $("#hostsTbody tr").hide();    // 首先，设置这行为隐藏
	            $("#hostsTbody tr").each(function(i){    // 然后，通过条件判断决定本行是否恢复显示
	                if(i>=begin-1 && i<end)//显示begin<=x<=end的记录
	                    $(this).show();
	            });
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