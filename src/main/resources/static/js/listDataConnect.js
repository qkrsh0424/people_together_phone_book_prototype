async function searchListByDate(currentSelectedDate) {
    $("#startDate").val(currentSelectedDate);
    let startDate = new Date(currentSelectedDate);
    let data = {
        "date": startDate.toUTCString()
    };
    await $.ajax({
        url: "/api/get/list/bydate",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: data,
        success: function (returnData) {
            ITEMS = returnData.items;
        }
    })
}

async function searchListByCommon() {
    let num = Number(getUrlParams().page ? getUrlParams().page : "0");
    let startDate = getUrlParams().date;
    let name = decodeURIComponent(getUrlParams().name);
    let company = getUrlParams().company ? decodeURIComponent(getUrlParams().company) : '';

    $("#startDate").val(startDate);
    $("#memberName").val(name);
    $("#companyName").val(company);

    let data = {
        "number": num,
        "date": startDate ? new Date(startDate).toUTCString() : 'none',
        "name": name ? name : '',
        "company": company ? company : ''
    }

    // TODO : companyName 서버 통신 작성.
    await $.ajax({
        url: "/api/get/list/bynum",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: data,
        success: function (returnData) {
            ITEMS = returnData.items;
            ITEMS_SIZE = returnData.size;
        },
        error: function (error) {
            console.log(error);
            alert("server connect error");
        }
    })
}

$("#fixItemSave").submit(function (event) {
    event.preventDefault();

    let data = JSON.stringify({
        "id": $("#fixItem-id").val(),
        "regEmp": $("#fixItem-regEmp").val(),
        "companyName": $("#fixItem-companyName").val(),
        "companyAddress": $("#fixItem-companyAddress").val(),
        "companyDetailAddress": $("#fixItem-companyDetailAddress").val(),
        "companyContact": $("#fixItem-companyContact").val(),
        "infoUrl": $("#fixItem-infoUrl").val(),
        "phoneNumber": $("#fixItem-phoneNumber").val(),
        "serviceTime": $("#fixItem-serviceTime").val(),
        "bestMenu": $("#fixItem-bestMenu").val(),
        "talkPeople": $("#fixItem-talkPeople").val(),
        "managerName": $("#fixItem-managerName").val(),
        "talkDesc": $("#fixItem-talkDesc").val(),
        "anyDesc": $("#fixItem-anyDesc").val()
    });
    $.ajax({
        url: "/api/update/item/one",
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-XSRF-TOKEN", $("#_csrf").val());
        },
        success: function (returnData) {
            if (returnData.message === 'success') {
                alert("수정되었습니다.");
                window.location.reload();
            }
        },
        error: function (error) {
            console.log(error);
            alert("server connect failed");
        }
    });
})

async function deleteItemOne(itemId) {
    let data = JSON.stringify({
        "id": itemId
    })
    await $.ajax({
        url: "/api/delete/item/one",
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-XSRF-TOKEN", $("#_csrf").val());
        },
        success: function (returnData) {
            if (returnData.message === 'success') {
                alert("삭제되었습니다.");
            }
        },
        error: function (error) {
            console.log(error);
            alert("server connect failed");

        }
    });
}