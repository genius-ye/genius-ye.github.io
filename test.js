$("#btn").click(function(){
	var url=$("#url").val();
	var seltype=$("#seltype").val();
	var ck=$("#ck").val();
	var header=$("#header").val();
	var parms=$("#parms").val();
	var proxy=$("#proxy").val();
	var code=$("#code").val();
	if(url==''){
		alert("地址必须填写");
		$("#url").focus();
		return;
	}
	md=md5(url+seltype+ck+header+parms+proxy+code);
	try 
	{               
		var transaction = db.transaction([DB_TABLE],'readwrite'); 
		var  objectStore=transaction.objectStore(DB_TABLE);
		var index=objectStore.index("md5");
		
		index.get(md).onsuccess = function(event) {
			
			employee = event.target.result;
			
			if (typeof(employee) != "undefined") {
				employee.t= new Date().getTime();
				db.transaction([DB_TABLE],"readwrite").objectStore(DB_TABLE).put(employee);
			}
		}
		
	} 
	catch (e) 
	{ }
	try 
	{               t= new Date().getTime();
		var transaction = db.transaction([DB_TABLE],'readwrite'); 
		var  objectStore=transaction.objectStore(DB_TABLE); 
		var addRec = objectStore.add({t:t,md5:md,url:url,seltype:seltype,ck:ck,header:header,parms:parms,proxy:proxy,code:code});  
		addRec.onsuccess=function(event){
			id = event.target.result;
			addHistory("prepend",ck,code,header,parms,proxy,seltype,url,id)
		}
		addRec.onerror=function(event){
			
		}
	} 
	catch (e) 
	{ }
	$("#getresult").html("正在提交，获取中.....");
	$.ajax({
		url:"/tool/ajaxgp",
		type:"POST",
		dataType:"json",
		data:"url="+encodeURIComponent(url)+"&seltype="+seltype+"&ck="+encodeURIComponent(ck)+"&header="+encodeURIComponent(header)+"&parms="+encodeURIComponent(parms)+"&proxy="+encodeURIComponent(proxy)+"&code="+code,
		success:function(data){
			
			if (data.code==1) {
				ss = data.data.response;
				if (ss.match('^\{(\".+\":.+,*){1,}\}$')){
					
					
					try{
						var ss1 =JSON.parse(data.data.response);
						
						ss1=jsl.format.formatJson(JSON.stringify(ss1));
					}catch(e){
						ss1="";
					}
					if (ss1!=""){
						ss=ss1+"\r\n\r\n\r\n\r\n-----------------以下格式化前原串-----------------------\r\n\r\n\r\n"+ss
					}
				}
				$("#getresult").text(ss);
				$("#getresultheader").html(data.data.header);
			}else{
				$("#getresult").html(data.msg);
				$("#getresultheader").html('');
			}
		}
	});
});
