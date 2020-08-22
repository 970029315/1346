$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tql-art-cate', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var index = null

    $('#btnadd').on('click', function() {
        index = layer.open({
            type: 1,
            title: '在线调试',
            area: ['500px', '250px'],
            content: $('#aaa1').html()
        })
    })

    $('body').on('submit', '#aaa', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('爬')
                layer.close(index)
            }
        })
    })
    var index1 = null
    $('body').on('click', ".btn-edit", function() {
        index1 = layer.open({
            type: 1,
            title: '修改',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(index1)
                initArtCateList()
            }
        })
    })
    $('body').on('click', '.btn-del', function(e) {
        var id = $(this).attr('data-id')
        layer.confirm('s', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })

    })
})