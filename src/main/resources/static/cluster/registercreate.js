$(function() {
	pclusterid = $.getContextLoadParam("clusterid");
	pclustername = $.getContextLoadParam("clustername");
	
	var navigation_html = '<strong class="am-text-primary am-text-lg">系统管理</strong>'
		+' / <small><a href="javascript:$.contextLoad(\'/cluster/clusterlist.html\')">集群管理</a></small>'
		+' / <small><a href="javascript:$.contextLoad(\'/cluster/registerlist.html?clusterid='+pclusterid+'&clustername='+pclustername+'\')">镜像中心管理('+pclustername+')</span></a></small>'
		+' / <small>新增</small> ';
	$('#navigationId').html(navigation_html);
	
	$("#registerForm").submit(function(e){
		e.preventDefault();
		
		var jsonObj = $("#registerForm").serializeJson();
		$('body').scrollTop(0);
		var aj = $.ajax({    
			url:'/api/register/'+pclusterid+'/create',// 跳转到 action
		    contentType: "application/json;charset=utf-8",
		    type:'post',
		    data:JSON.stringify(jsonObj),
		    cache:false,
		    dataType:'json',
		    async: false,
		    success:function(data) {
		    	if(data.status != 0) {
		    		$.showMessage("warning",data.error);
		    	} else {
		    		$.showMessage("success","添加成功。");
		    		$.contextLoad("/cluster/registerlist.html?clusterid="+pclusterid+"&clustername="+pclustername);
		    	}
		    	return false;
		    },
		    error : function() {
		    	$.showMessage("warning","连接服务器失败。");
		    }
  	  	});
	});
	
	$('#new_register_cancel').click(function(){
		$.contextLoad("/cluster/registerlist.html?clusterid="+pclusterid+"&clustername="+pclustername);
	});
	
		
});