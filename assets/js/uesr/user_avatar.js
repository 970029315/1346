$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#btnimage').on('click', function() {
        console.log(1);
        $('#file').click()
    })
    var layer = layui.layer
    $('#file').on('change', function(e) {
        var file = e.target.files[0]
        if (file == undefined) {
            return layer.msg('图呢')
        }
        var newimgurl = URL.createObjectURL(file)
        $image.cropper('destroy').attr('src', newimgurl).cropper(options)
    })
    $('#btnupload').on('click', function() {
        var dataurl = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')
        console.log((dataurl));
        console.log(typeof dataurl);
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataurl
            },
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                layer.msg('成了')
                window.parent.getUserInfo()
            }
        })
    })
})