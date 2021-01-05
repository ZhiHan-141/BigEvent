$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //从本地获取
    var token = localStorage.getItem('token')
    // 配置请求头
    options.headers = {
        Authorization: token || ''
    }
    //用户验证功能
    //1、本地获取页面请求 无论成不成功都执行 complete
    options.complete = function (res) {
        console.log(res);
        //通过complete 中responseJSON属性进行判断 是否验证成功
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制跳转
            location.href = '/login.html';
            //强制清除本地存储
            localStorage.removeItem('token');
        }
    }
})