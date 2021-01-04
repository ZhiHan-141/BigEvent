$(function () {
    //页面刷新就获取用户信息
    //从本地获取
    var token = localStorage.getItem('token')
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // 配置请求头
        headers: {
            Authorization: token || ''
        },
        success: function (res) {
                console.log(res);
        }
    })
})