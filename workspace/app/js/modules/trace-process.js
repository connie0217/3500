/**
 * 流程跟踪Javascript实现
 */
$(function () {

    /**
     * 获取元素的outerHTML
     */
    $.fn.outerHTML = function () {

        // IE, Chrome & Safari will comply with the non-standard outerHTML, all others (FF) will have a fall-back for cloning
        return (!this.length) ? this : (this[0].outerHTML ||
            (function (el) {
                var div = document.createElement('div');
                div.appendChild(el.cloneNode(true));
                var contents = div.innerHTML;
                div = null;
                return contents;
            })(this[0]));

    };

    if ($('#processDiagram').length == 1) {
        showActivities();
    }

    // 解决坐标错误问题
    $('#changeToAutoDiagram').click(function() {
        $('.activity-attr,.activity-attr-border').remove();
        $('#processDiagram').attr('src', ctx + '/workflow/trace!readActivityDatas.action?executionId=' + processInstanceId);
    });

});

function showActivities() {
    $.getJSON(ctx + '/workflow/trace!readActivityDatas.action?executionId=' + executionId, function (infos) {

        var positionHtml = "";
        var diagramPositon = $('#processDiagram').position();
        var varsArray = new Array();
        $.each(infos, function (i, v) {
            var $positionDiv = $('<div/>', {
                'class': 'activity-attr'
            }).css({
                    position: 'absolute',
                    left: (v.x - 1),
                    top: (v.y - 1),
                    width: (v.width - 2),
                    height: (v.height - 2),
                    backgroundColor: 'black',
                    opacity: 0
                });

            // 节点边框
            var $border = $('<div/>', {
                'class': 'activity-attr-border'
            }).css({
                    position: 'absolute',
                    left: (v.x +10),
                    top: (v.y +35),
                    width: (v.width - 4),
                    height: (v.height - 3)
                });

            if (v.currentActiviti) {
                $border.css({
                    border: '3px solid red'
                }).addClass('ui-corner-all-12');
            }
            positionHtml += $positionDiv.outerHTML() + $border.outerHTML();
            varsArray[varsArray.length] = v.vars;
        });

        $(positionHtml).appendTo('body').find('.activity-attr-border');

        // 鼠标移动到活动上提示
        $('.activity-attr-border').each(function (i, v) {
            var tipContent = "<table class='table table-bordered'>";
            $.each(varsArray[i], function(varKey, varValue) {
                if (varValue) {
                    tipContent += "<tr><td>" + varKey + "</td><td>" + varValue + "</td></tr>";
                }
            });
            tipContent += "</table>";
            $(this).data('vars', varsArray[i]).data('toggle', 'tooltip').data('placement', 'bottom').data('title', '活动属性').attr('title', tipContent);
        }).tooltip();
    });
}

/**
 * 任务列表中展示任务相关的业务信息
 */
function showTaskInfo(taskId){
	$.ajax({
		url:ctx + "/workflow/task!showTaskView.action?taskId=" + taskId + "&isShow=true",
		type:"get",
		success:function(info){
//			showDialog("window", info, "任务查看", "700");
			var d = dialog({
			    title: "查看任务",
			    content: info,
			    zIndex: 1
			});
			d.width(700);
			d.show();
		}
	});
}
function showUser(taskId){
	$.ajax({
		url:ctx + "/workflow/task!showDelegateTask.action?taskId=" + taskId + "",
		type:"get",
		success:function(info){
			var d = dialog({
				id:"popUser",
			    title: "选择用户",
			    content: info
			});
			d.width(700);
			d.height(400);
			d.show();
		}
	});
}

function showTraceHistory(executionId){
	$.ajax({
		url:ctx + "/workflow/trace!historyDatas.action?executionId=" + executionId + "",
		type:"get",
		success:function(info){
			var d = dialog({
				id:"popUser",
			    title: "选择用户",
			    content: info
			});
			d.width(800);
			d.height(500);
			d.show();
		}
	});
}

function showTaskSub(sid){
	$.ajax({
		url:ctx + "/ts/task-sub!addTaskSub.action?sid=" + sid + "",
		type:"get",
		success:function(info){
			var title = "";
			if(!sid && typeof(sid)!="undefined" && sid!=0){
				title = "修改任务转交";
			}else{
				title = "增加任务转交";
			}
			var d = dialog({
				id:"taskSubPop",
			    title: title,
			    zIndex: 1,
			    content: info
			});
			d.width(700);
			d.show();
			//showDialog("window", info, title, "700");
			
		}
	});
}

function showDoc(docPath,type){
	var title="查看文档";
	var queryType="underPathFiles";
	if(type==1){
		title="查看历史文档";
		queryType="historyFiles";
	}
	$.ajax({
		url:ctx + "/cm/node-file-pojo!findFilesForJsp.action",
		type:"post",
		data:"docPath="+docPath+"&queryType="+queryType, 
		success:function(info){
			var d = dialog({
				id:queryType,
			    title: title,
			    content: info,
			    zIndex: 0
			});
			d.width(700);
			d.show();
		}
	});
}
