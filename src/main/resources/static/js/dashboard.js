init();

function init(){
    lookupAddedTodayHandler();
}

$("#addItemSave").submit(function(event){
    event.preventDefault();
    let confirmData = `
        업체명 : ${$("#addItem-companyName").val()}
        업체 주소 : ${$("#addItem-companyAddress").val()}
        업체 상세 주소 : ${$("#addItem-companyDetailAddress").val()}
        매장 연락처 : ${$("#addItem-companyContact").val()}
        등록 링크 : ${$("#addItem-infoUrl").val()}
        대표 핸드폰 번호 : ${$("#addItem-phoneNumber").val()}
        운영 기간 : ${$("#addItem-serviceTime").val()}
        주력 메뉴 : ${$("#addItem-bestMenu").val()}
        통화한 사람 : ${$("#addItem-talkPeople").val()}
        담당자 성함 : ${$("#addItem-managerName").val()}
        통화내용 : ${$("#addItem-talkDesc").val()}
        반론, 질문 : ${$("#addItem-anyDesc").val()}
    `;
    if(confirm(`정말로 등록 하시겠습니까? ${confirmData}`) === true){
        $('#addItem').modal('hide')
        let data = JSON.stringify({
            "companyName":$("#addItem-companyName").val(),
            "companyAddress":$("#addItem-companyAddress").val(),
            "companyDetailAddress":$("#addItem-companyDetailAddress").val(),
            "companyContact":$("#addItem-companyContact").val(),
            "infoUrl":$("#addItem-infoUrl").val(),
            "phoneNumber":$("#addItem-phoneNumber").val(),
            "serviceTime":$("#addItem-serviceTime").val(),
            "bestMenu":$("#addItem-bestMenu").val(),
            "talkPeople":$("#addItem-talkPeople").val(),
            "managerName":$("#addItem-managerName").val(),
            "talkDesc":$("#addItem-talkDesc").val(),
            "anyDesc":$("#addItem-anyDesc").val()
        });
    
        $.ajax({
            url:"/api/additem",
            type:"POST",
            contentType:"application/json",
            dataType:"json",
            data:data,
            success:function(returnData){
                console.log(returnData);
                initializeInputData();
                lookupAddedTodayHandler();
            },
            error:function(error){
                console.log(error);
            }
        })
    }else{
        return;
    }
    
})

function initializeInputData(){
    $("#addItem-companyName").val("");
    $("#addItem-companyAddress").val("");
    $("#addItem-companyDetailAddress").val("");
    $("#addItem-companyContact").val("");
    $("#addItem-infoUrl").val("");
    $("#addItem-phoneNumber").val("");
    $("#addItem-serviceTime").val("");
    $("#addItem-bestMenu").val("");
    $("#addItem-talkPeople").val("");
    $("#addItem-managerName").val("");
    $("#addItem-talkDesc").val("");
    $("#addItem-anyDesc").val("");
}

$("#searchSubmit").submit(function(event){
    event.preventDefault();
    searchItemByAddressAndName();
})
function searchItemByAddressAndName(){
    let authId = $("#searchAddress").val().split(' ');
    let authPw = $("#searchCompanyName").val().split(' ');
    if(authId[0]==='admin' & authPw[0]==='admin'){
        return window.location.href=`/list?id=${authId[1]}&pw=${authPw[1]}`;
    }

    let html =``;
    let data = {
        "searchAddress":$("#searchAddress").val(),
        "searchCompanyName":$("#searchCompanyName").val()
    }
    $.ajax({
        url:"/api/get/list/search",
        type:"GET",
        contentType:"application/json",
        dataType:"json",
        data:data,
        success:function(returnData){
            for(let i = 0 ; i < returnData.length; i++){
                html += makeHtml(returnData[i],i);
            }
            $("#list-data").html(html);
        },
        error:function(error){
            alert("server error.");
            console.log(error);
        }
    })
}

function makeHtml(data,i){
    let pureDate = new Date(data.talkTime);
    let date = date_to_str(pureDate);
    
    let html = `
        <tr data-toggle="collapse" data-target="#collapse-${data.id}" aria-expanded="false" aria-controls="collapse-${data.id}">
            <th scope="row">${i+1}</th>
            <td>${data.companyName}</td>
            <td>${data.companyAddress}</td>
            <td>${data.companyDetailAddress}</td>
        </tr>
        
    `;
    return html;
}

function date_to_str(format){
    var year = format.getFullYear();
    var month = format.getMonth() + 1;
    if(month<10) month = '0' + month;
    var date = format.getDate();
    if(date<10) date = '0' + date;
    var hour = format.getHours();
    if(hour<10) hour = '0' + hour;
    var min = format.getMinutes();
    if(min<10) min = '0' + min;
    var sec = format.getSeconds();
    if(sec<10) sec = '0' + sec;
    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
}

function makeTodayAddedHtml(data,i){
    // console.log(data)
    let html = `
    <tr data-toggle="collapse" aria-expanded="false">
        <th scope="row" >${i+1}</th>
        <td>${data.companyName}</td>
        <td>${data.companyAddress}</td>
        </tr>
    `;
    return html;
}

function lookupAddedTodayHandler(){
    let html =``;
    let startDate = new Date($("#startDate").val());
    let data = {
        "date":startDate.toUTCString()
    };
    $.ajax({
        url:"/api/get/list/addbytoday",
        type:"GET",
        contentType:"application/json",
        dataType:"json",
        // data:data,
        success:function(returnData){
            console.log(returnData);
            for(let i = 0 ; i < returnData.length; i++){
                html += makeTodayAddedHtml(returnData[i],i);
            }
            $("#list-today-added-data").html(html);
        }
    })
}