/*
事件处理器
 */
var eventHandler = {
	'DeleteAttachment': function(event, user, msg) {
		return user + '<span class="text-error">删除</span>了附件：' + msg;
	},
	'AddAttachment': function(event, user, msg) {
		return user + '添加了附件：' + msg;
	},
	'AddComment': function(event, user, msg) {
		return user + '发表了意见：' + msg;
	},
	'DeleteComment': function(event, user, msg) {
		return user + '<span class="text-error">删除</span>了意见：' + msg;
	},
	AddUserLink: function(event, user, msg) {
		return user + '邀请了<span class="text-info">' + event.messageParts[0] + '</span>作为任务的[<span class="text-info">' + translateType(event) + '</span>]';
	},
	DeleteUserLink: function(event, user, msg) {
        return user + '<span class="text-error">取消了</span><span class="text-info">' + event.messageParts[0] + '</span>的[<span class="text-info">' + translateType(event) + '</span>]角色';
	},
	AddGroupLink: function(event, user, msg) {
		return user + '添加了[<span class="text-info">' + translateType(event) + ']</span>' + event.messageParts[0];
	},
	DeleteGroupLink: function(event, user, msg) {
		return user + '从[<span class="text-info">' + translateType(event) + '</span>]中<span class="text-error">移除了</span><span class="text-info">' + event.messageParts[0] + '</span>';
	}
}
$(function() {

	readComments();

	// 保存意见
	$('#saveComment').click(function() {
		if (!$('#comment').val()) {
			return false;
		}
		$.post(ctx + '/workflow/comment!addComment.action', {
			taskId: $('#taskId').val(),
			processInstanceId: $('#processInstanceId').val(),
			message: $('#comment').val()
		}, function(resp) {
			$('#comment').val("");
			readComments();
		});
	});
});

/**
* 读取意见列表
* @return {[type]} [description]
*/
function readComments() {
	$('#commentList ol').html('');
	// 读取意见
	$.getJSON(ctx + '/workflow/comment!list.action?processInstanceId='+$('#processInstanceId').val(), function(datas) {
		$.each(datas.events, function(i, v) {
			$('<li/>', {
				html: function() {
					var user = (v.userName || '');
					if(user) {
						user = "<span style='margin-right: 1em;'><b>" + user + "</b></span>"
					}
					var msg = v.message || v.fullMessage;
					var content = eventHandler[v.action](v, user, msg);
					var taskName = datas.taskNames ? datas.taskNames[v.taskId] : '';
					content += "<span style='margin-left:1em;'></span>";

					// 名称不为空时才显示
					if(taskName) {
						content += "<span class='text-info'>(" + taskName + ")</span>";
					}
					var str=  new Date(v.time);
					var nowDate = str.toLocaleDateString()+' '+str.getHours()+":"+str.getMinutes()+":"+str.getSeconds();
					content += "<span class='text-muted'>" + nowDate + "</span>";
					return content;
				}
			}).appendTo('#commentList ol');
		});

	});
}