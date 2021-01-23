function logout(){
    $.ajax({
        url:'/api/logout',
        type: "POST",
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-XSRF-TOKEN", $("#_csrf").val());
        },
        success: function (data) {
            window.location.href='/';
        },
        error: function (error) {
            console.log(error);
            alert("error");
        }
    })
}