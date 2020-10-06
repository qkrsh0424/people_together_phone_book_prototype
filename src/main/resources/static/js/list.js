const ITEM_LIST_SIZE = 10;
// const AUTH_LIST_PATH = "@{/list?id=}"
init();

function init() {
    setInitializeList();
}

function setInitializeList() {
    window.scrollTo(0, 0);
    if (getUrlParams().date) {
        searchListByDate(getUrlParams().date);
    } else {
        searchListByCommon();
    }

}

function searchListByDate(currentSelectedDate){
    $("#startDate").val(currentSelectedDate);

    let startDate = new Date(currentSelectedDate);
    let html = ``;
    let data = {
        "date": startDate.toUTCString()
    };
    $.ajax({
        url: "/api/get/list/bydate",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: data,
        success: function (returnData) {
            for (let i = 0; i < returnData.items.length; i++) {
                html += makeHtml(returnData.items[i], i);
            }
            $("#list-data").html(html);
        }
    })
}

function searchListByCommon(){
    let num = Number(getUrlParams().page ? getUrlParams().page : "0");
    let html = ``;
    let data = {
        "number": num
    }

    $.ajax({
        url: "/api/get/list/bynum",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        data: data,
        success: function (returnData) {
            for (let i = 0; i < returnData.items.length; i++) {
                html += makeHtml(returnData.items[i], num * ITEM_LIST_SIZE + i);
            }
            setItemsSize(returnData.size);
            $("#list-data").html(html);
        },
        error: function (error) {
            console.log(error);
            alert("server connect error");
        }
    })
}

function setItemsSize(size) {
    let html = ``;
    let number = Math.ceil(size / ITEM_LIST_SIZE);

    for (let i = 0; i < number; i++) {
        html += `
            <a type="button" class="btn btn-secondary" href="/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&page=${i}">${i + 1}</a>
        `;
    }
    $("#list-data-number").html(html);
}

function makeHtml(data, i) {
    let pureDate = new Date(data.talkTime);
    let date = date_to_str(pureDate);
    let html = `
        <input hidden id="itemData-${data.id}" value=${JSON.stringify(data)}></input>
        <tr>
            <th scope="row">${i + 1}</th>
            <td><button class="btn btn-primary" onclick="viewItemHandler(${data.id})">보기</button><button class="btn btn-primary" onclick="fixItemHandler(${data.id})">수정</button><button class="btn btn-danger" onclick="deleteItemHandler(${data.id})">삭제</button></td>
            <td>${data.companyName}</td>
            <td>${data.companyAddress}</td>
            <td>${data.companyDetailAddress}</td>
            <td>${data.companyContact}</td>
            <td>${data.infoUrl}</td>
            <td>${data.phoneNumber}</td>
            <td>${data.serviceTime}</td>
            <td>${data.bestMenu}</td>
            <td>${date}</td>
            <td>${data.talkPeople}</td>
            <td>${data.managerName}</td>
            <td>${data.talkDesc}</td>
            <td>${data.anyDesc}</td>
        </tr>
        <tr>
            <td colspan="15">
                <div class="collapse" id="collapse-${data.id}">
                    <div class="card card-body">
                    <p>업체명 : ${data.companyName}</p>
                    <p>업체주소 : ${data.companyAddress}</p>
                    <p>상세주소 : ${data.companyDetailAddress}</p>
                    <p>매장연락처 : ${data.companyContact}</p>
                    <p>정보링크(URL) : ${data.infoUrl}</p>
                    <p>대표핸드폰번호 : ${data.phoneNumber}</p>
                    <p>운영기간 : ${data.serviceTime}</p>
                    <p>주력메뉴 : ${data.bestMenu}</p>
                    <p>통화시간 : ${date}</p>
                    <p>통화한사람 : ${data.talkPeople}</p>
                    <p>담당자 성함 : ${data.managerName}</p>
                    <p>통화내용 : ${data.talkDesc}</p>
                    <p>반론,질문 : ${data.anyDesc}</p>
                    </div>
                </div>
            </td>
        <tr/>
        
    `;
    return html;
}

function date_to_str(format) {
    var year = format.getFullYear();
    var month = format.getMonth() + 1;
    if (month < 10) month = '0' + month;
    var date = format.getDate();
    if (date < 10) date = '0' + date;
    var hour = format.getHours();
    if (hour < 10) hour = '0' + hour;
    var min = format.getMinutes();
    if (min < 10) min = '0' + min;
    var sec = format.getSeconds();
    if (sec < 10) sec = '0' + sec;
    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
}

function lookupDateHandler() {
    window.location.href=`/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&date=${$("#startDate").val()}`;

}

function lookupAllHandler() {
    window.location.href=`/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}`;
}

function fixItemHandler(itemId) {

    let data = JSON.parse($(`#itemData-${itemId}`).val());
    $("#fixItem-id").val(data.id)
    $("#fixItem-companyName").val(data.companyName)
    $("#fixItem-companyAddress").val(data.companyAddress)
    $("#fixItem-companyDetailAddress").val(data.companyDetailAddress)
    $("#fixItem-companyContact").val(data.companyContact)
    $("#fixItem-infoUrl").val(data.infoUrl)
    $("#fixItem-phoneNumber").val(data.phoneNumber)
    $("#fixItem-serviceTime").val(data.serviceTime)
    $("#fixItem-bestMenu").val(data.bestMenu)
    $("#fixItem-talkPeople").val(data.talkPeople)
    $("#fixItem-managerName").val(data.managerName)
    $("#fixItem-talkDesc").val(data.talkDesc)
    $("#fixItem-anyDesc").val(data.anyDesc)
    $("#fixItem").modal("show");
}

function viewItemHandler(itemId) {
    $(`#collapse-${itemId}`).collapse("toggle");
}

$("#fixItemSave").submit(function (event) {
    event.preventDefault();

    let data = JSON.stringify({
        "id": $("#fixItem-id").val(),
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

function deleteItemHandler(itemId) {
    let data = JSON.stringify({
        "id": itemId
    })
    $.ajax({
        url: "/api/delete/item/one",
        type: "post",
        contentType: "application/json",
        dataType: "json",
        data: data,
        success: function (returnData) {
            if (returnData.message === 'success') {
                alert("삭제되었습니다.");
                // window.location.reload();
                setHtml2();
            }
        },
        error: function (error) {
            console.log(error);
            alert("server connect failed");
        }
    });
}

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
    return params;
}