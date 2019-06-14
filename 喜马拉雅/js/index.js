var phone = sessionStorage.sso_phone_number;
var contactid = sessionStorage._contatid;
var projectid = sessionStorage._projectid;
var channelCode = sessionStorage._channelCode;
var acobj ={};
//$(function () {
//	var cid = $.getUrlParam("contactid");
//	var pprojectid = getprojiectid();
//	var pchannelCode = $.getUrlParam("channelCode");
//	console.log(cid, pprojectid, pchannelCode);
//	if (!(cid == "null" || cid == null || cid == undefined || cid == '')) {
//		contactid = cid;
//		sessionStorage._contatid = contactid;
//	}
//	if (!(pprojectid == "null" || pprojectid == null || pprojectid == undefined || pprojectid == '')) {
//		sessionStorage._projectid = pprojectid;
//		projectid = pprojectid;
//	}
//	if (!(pchannelCode == "null" || pchannelCode == null || pchannelCode == undefined
//		|| pchannelCode == '')) {
//		sessionStorage._channelCode = pchannelCode;
//		channelCode = pchannelCode;
//	}
//})

$('.to2_1').click(function() {
	$('.hint').hide();
	$('#s2').show();
})

$('.to2_2').click(function() {
	$('.hint').hide();
	$('#s3').show();
})





