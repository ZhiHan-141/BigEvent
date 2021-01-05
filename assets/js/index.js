$(function () {
    //页面刷新就获取用户信息
    // 调用函数获取
    getUserInfo();

    var layer = layui.layer;
    //退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //清除本地存储
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })

})
// 获取用户信息函数
function getUserInfo() {
    
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('用户验证失败！')
            }
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

