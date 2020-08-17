$(function() {
    $('#go-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#go-login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})