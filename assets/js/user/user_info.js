getUserInfo();
var form = layui.form;
var layer = layui.layer;
form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    }
})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            // 通过layui 的form.val方法快速为 输入框赋值
            form.val('formUserInfo', res.data)
        }
    })
}
// 重置功能
$('#btnReset').on('click', function (e) {
    //去除默认的重置功能
    e.preventDefault();
    // 重新调用获取用户方法 实现重置
    getUserInfo();
})
//提交功能
$('.layui-form').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status != 0) {
                return layer.msg('更新用户信息失败')
            }
            layer.msg('更新用户信息成功')
            window.parent.getUserInfo();
        }
    })
})
