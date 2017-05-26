/*
 * 分页类用到的方法
 * by qt
 */
	
/**
 * @targets 查询后绑室的div
 * @form  提交至查询的form.内要有page limit;
 * @url  请求查询的action
 */
function query(targets,form,url){
	$.ajax({
		url:url,
		type:"post",
		data:$("#"+form).serialize(),
		success:function(info){
			$("#"+targets).html(info);
			var height = $("#"+targets).height();
			height = height-$('fieldset:first').height()-90;
			var divHeight = $("#"+targets).find("div").height();
			if(divHeight>height){
				$("#"+targets).find("div").height(height);
			}
		}
	});
	
}
/**
 * 上下页方法
 * @param no 第几页
 * @param pageCount  总页数
 * @param form 提交的form
 */
function turnOverPage(no,pageCount,form){
	if(no>pageCount){
		no=pageCount;
	}
	if(no<1){
		no=1;
	}
	 $("#"+form+" input[type='hidden'][name='page']").val(no);
//	$("#page").val(no);
	 $("#"+form).submit();
}
/**
 * 设置页面显示条数
 * @param limit
 * @param form
 */
function setLimit(limit,form){
	$("#limit").val(limit);
	$("#page").val(1);
	$("#"+form).submit();
}