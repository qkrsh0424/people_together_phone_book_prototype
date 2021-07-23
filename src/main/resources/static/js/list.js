function loadTableHtml(){
    let html = ``;
    ITEMS.forEach((r,index)=>{
        html += makeHtml(r, index);
    });
    $("#list-data").html(html);
}

function setItemsSize(size) {
    // console.log(size);
    //url에서 현재 페이지를 받아온다
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const currentPage = Number(urlParams.get('page'));
    //맨마지막페이지랑 보여줄 페이지 버튼 갯수 계산
    let html = ``;
    let totalPage = Math.ceil(size / ITEM_LIST_SIZE) - Number(1);
    //보여줄 페이지 버튼의 맨마지막 번호
    let lastPage = currentPage + 2;
    if (lastPage > totalPage){
        lastPage = totalPage;
    }
    //보여줄 페이지 버튼의 맨첫번째 번호
    let firstPage = lastPage - 4;
    if (firstPage < 0) {
        firstPage = 0;
    }

    // console.log("size:", size)
    // console.log("totalPage:", totalPage)
    // console.log("currentPage:", currentPage)
    // console.log("firstPage:", firstPage)
    // console.log("lastPage:", lastPage)

    html += `<li class="page-item page-first-item"><a type="button" class="btn pageBtn" href="/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&page=${0}&date=${getUrlParams().date ? getUrlParams().date : ''}&name=${getUrlParams().name ? getUrlParams().name : ''}"><i class="fas fa-angle-double-left"></i></a><li> `
    for (var i = firstPage; i <= lastPage; i++) {
        if(currentPage==i){
            html += `<li class="page-number-item"><a type="button" class="btn pageBtn text-danger" href="/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&page=${i}&date=${getUrlParams().date ? getUrlParams().date : ''}&name=${getUrlParams().name ? getUrlParams().name : ''}">${i + 1}</a><li>`;    
        }else{
            html += `<li class="page-number-item"><a type="button" class="btn pageBtn" href="/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&page=${i}&date=${getUrlParams().date ? getUrlParams().date : ''}&name=${getUrlParams().name ? getUrlParams().name : ''}">${i + 1}</a><li>`;
        }
            
    }
    html += `<li class="page-item page-last-item"><a type="button" class="btn pageBtn" href="/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&page=${totalPage}&date=${getUrlParams().date ? getUrlParams().date : ''}&name=${getUrlParams().name ? getUrlParams().name : ''}"><i class="fas fa-angle-double-right"></i></a><li> `

    $("#list-data-number").html(html);
    pagenationNum(currentPage+1, totalPage+1);
}

function makeHtml(data, i) {
    let pureDate = new Date(data.talkTime);
    let date = date_to_str(pureDate);
    let html = `
        <input hidden id="itemData-${data.id}" value=${jsonToBase64(data)}></input>
        <tr>
            <td class="list-data" scope="row">${(((getUrlParams().page?Number(getUrlParams().page):0) * ITEM_LIST_SIZE)+i+1)}</td>
            <td><button class="btn sendBtn" onclick="showResultBox().set('${jsonToBase64(data)}')">상세보기</button>
            <td>${data.regEmp}</td>
            <td>${data.companyName}</td>
            <td>${data.companyAddress}</td>
            <td>${data.companyDetailAddress}</td>
            <td>${data.phoneNumber}</td>
            <td>${data.companyContact}</td>
            <td>${data.talkPeople}</td>
            <td>${data.managerName}</td>
        </tr>
    `;
    return html;
}

// result-box

function showResultBox() {
    return {
        set: function(itemId){
            let html = ``;
            html = makeHtml2(itemId);
            $("#list-table-box").html(html);
        },
        clear: function(){
            let html = `
                <div class="result-logo-box">
                    <div class="result-logo">
                        <h1>PEOPLE TOGETHER</h1>
                    </div>
                </div>
            `;
            $("#list-table-box").html(html);
        }
    }
    
}

function makeHtml2(itemId) {

    let data = base64ToJson(itemId)
    let pureDate = new Date(data.talkTime);
    let date = date_to_str(pureDate);
    let html = `

        <div class="result-box" id="result-box">
            <div class="result-box-header ">
                <th>상세보기</th>
            </div>
            <div class="result-box-body" id="result-box-body">
                    <div id="copy-${data.id}">
                        <p>등록인 : ${data.regEmp}</p>
                        <p>업체명 : ${data.companyName}</p>
                        <p>업체주소 : ${data.companyAddress}</p>
                        <p>상세주소 : ${data.companyDetailAddress}</p>
                        <p>대표핸드폰번호 : ${data.phoneNumber}</p>
                        <p>매장연락처 : ${data.companyContact}</p>
                        <p>정보링크(URL) : ${data.infoUrl}</p>
                        <p>운영기간 : ${data.serviceTime}</p>
                        <p>주력메뉴 : ${data.bestMenu}</p>
                        <p>통화시간 : ${date}</p>
                        <p>통화한사람 : ${data.talkPeople}</p>
                        <p>담당자 성함 : ${data.managerName}</p>
                        <p>통화내용 : ${data.talkDesc}</p>
                        <p>반론,질문 : ${data.anyDesc}</p>
                    </div>
                    <div class="modal-footer">
                    <button class="btn sendBtn" onclick="copyItemHandler(${data.id})">복사</button>
                    <button class="btn searchBtn" onclick="fixItemHandler(${data.id})">수정</button>
                    <button class="btn btn-danger" onclick="deleteItemHandler(${data.id})">삭제</button>
                </div>
            </div>
        </div>
`
    return html;

}

async function deleteItemHandler(itemId){
    await deleteItemOne(itemId);
    await listDataConnectInitialize();
    listLoadHtmlInitialize();
    showResultBox().clear();
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
    window.location.href = `/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&date=${$("#startDate").val()}`;

}
function lookupDetailHandler(){
    window.location.href = `/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&page=0&date=${$('#startDate').val()}&name=${$('#memberName').val()}&company=${$('#companyName').val()}`;
}

function lookupAllHandler() {
    // console.log($("#startDate").val())
    window.location.href = `/list?id=${getUrlParams().id}&pw=${getUrlParams().pw}&page=0&date=&name=&company=`;
}

function copyItemHandler(itemId) {
    let data = base64ToJson($(`#itemData-${itemId}`).val());
    var getCopyText = document.getElementById(`copy-${data.id}`);
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = getCopyText.innerText;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    // var textEl = getCopyText.innerText;
    // copyText(textEl);
}

// function copyText(text) {
//     navigator.clipboard.writeText(text);
// }

function fixItemHandler(itemId) {

    let data = base64ToJson($(`#itemData-${itemId}`).val());
    $("#fixItem-id").val(data.id)
    $("#fixItem-regEmp").val(data.regEmp)
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

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
    return params;
}

function pagenationNum(currentPage, totalPage){
    if(totalPage==0){
        $('#i_list_data_number_of').html('');
        return ;
    }
    let html = `
        ${currentPage} / ${totalPage}
    `;
    $('#i_list_data_number_of').html(html);
}