$(() => {

    $('#insert').on('click', function () {

        var data = {
            item: {
                name: $('#inputProductName').val(),
                price: Number($('#inputProductPrice').val()),
                count: +$('#inputProductCount').val(),
                image: $('#inputProductImage').val(),
            }
        }

        $.post("127.0.0.1", data, function (response) {
            if (response) {
                if (response.result) {
                    $('#message').text('新增成功')
                    console.log(response.item)
                    $('#dialog').modal('show')
                } else {
                    $('#message').text('新增失敗')
                    console.log(response.message)
                    $('#dialog').modal('show')
                }
                console.log(response);
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }
        }, "json")
    })
})