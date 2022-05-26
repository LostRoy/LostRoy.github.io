//加载名言
$.get('https://v1.hitokoto.cn', function (res) {
    $('.word').html(res.hitokoto + '<br/> -「<strong>' + res.from + '</strong>」')
})

function backround() {
    //加载背景
    var url = 'https://home.guominjie.com:9000/cros?url=' + encodeURIComponent('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8')
    var imgUrls = JSON.parse(sessionStorage.getItem('imgUrls'))
    var index = sessionStorage.getItem('index')
    var $main = $('.main')
    if (imgUrls == null) {
        imgUrls = new Array()
        index = 0
        $.get(url, function (result) {
            console.log('bing result:', result)
            if (!result.data || result.data == 'null') {
                return
            }
            images = JSON.parse(result.data).images
            for (let i = 0; i < images.length; i++) {
                const item = images[i]
                imgUrls.push(item.url)
            }
            var imgUrl = imgUrls[index]
            var url = 'https://www.bing.com' + imgUrl
            $main.css('background', "url('" + url + "') center center / cover no-repeat #666")
            $main.css('background-size', 'cover')
            sessionStorage.setItem('imgUrls', JSON.stringify(imgUrls))
            sessionStorage.setItem('index', index)
        })
    } else {
        if (index == 7) index = 0
        else index++
        var imgUrl = imgUrls[index]
        var url = 'https://www.bing.com' + imgUrl
        $main.css('background', "url('" + url + "') center center / cover no-repeat #666")
        // $main.css('background-size', 'cover')
        sessionStorage.setItem('index', index)
    }
}

$(function () {
	backround()
    // setInterval(backround, 5000)
})
