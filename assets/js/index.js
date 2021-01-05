$(function () {
    //页面刷新就获取用户信息
    // 调用函数获取
    getUserInfo();
})
// 获取用户信息函数
function getUserInfo() {
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
            console.log(res.data.user_pic);
            // 调用渲染头像函数
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    //获取用户名
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    //设置用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}