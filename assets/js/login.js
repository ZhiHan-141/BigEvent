$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //发起注册事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var username = $('#form_reg [name=username]').val();
        var password = $('#form_reg [name=password]').val();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            type: 'POST',
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#link_login').click();
            }
        })
    })
    //登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        // var myname = $('#form_login [name=username]').val();
        // var mypwd = $('#form_login [name=username]').val();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            // data: {
            //     username: myname,
            //     password: pwd
            // },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})