$(function(){
	document.getElementById("createHost").onclick=function(){
		startShadow();
		showCreateHostDiv();
	}
	
	document.getElementById("closeCreateHost").onclick=function(){
		stopShadow();
		closeCreateHostDiv();
	}
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
	document.getElementById("status").value="";
	document.getElementById("fenpei").value="";
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