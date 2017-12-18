/**
 * 
 */
function ShowDiv()  
{
	document.getElementById('showCrontabDiv').style.display='block';
}

function CloseDiv()
{
	document.getElementById('showCrontabDiv').style.display='none';
}

function add(){
    var user =$('#name').val()
    var pwd =$('#age').val()
    $.ajax({
        url:'/add/',
        type:'POST',
        data:{username:user,password:pwd},
    })
    
    var tableObj = document.getElementById('tb');  
    var rowNums = tableObj.rows.length;  
    var newRow = tableObj.insertRow(rowNums);  
    var col1 = newRow.insertCell(0);  
    col1.innerHTML = user;  
    var col2 = newRow.insertCell(1);  
    col2.innerHTML = pwd; 
       
    document.getElementById('showCrontabDiv').style.display='none';
}
