
function addItemSubmit(){
    let confirmData = `
        등록인 : ${$("#addItem-regEmp").val()}
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
        $('#itemModal').modal('hide')
        let data = JSON.stringify({
            "regEmp":$('#addItem-regEmp').val(),
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
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-XSRF-TOKEN", $("#_csrf").val());
            },
            success:function(returnData){
                // console.log(returnData);
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
}

function fixItemSubmit(itemId){
    let confirmData = `
        등록인 : ${$("#fixItem-regEmp").val()}
        업체명 : ${$("#fixItem-companyName").val()}
        업체 주소 : ${$("#fixItem-companyAddress").val()}
        업체 상세 주소 : ${$("#fixItem-companyDetailAddress").val()}
        매장 연락처 : ${$("#fixItem-companyContact").val()}
        등록 링크 : ${$("#fixItem-infoUrl").val()}
        대표 핸드폰 번호 : ${$("#fixItem-phoneNumber").val()}
        운영 기간 : ${$("#fixItem-serviceTime").val()}
        주력 메뉴 : ${$("#fixItem-bestMenu").val()}
        통화한 사람 : ${$("#fixItem-talkPeople").val()}
        담당자 성함 : ${$("#fixItem-managerName").val()}
        통화내용 : ${$("#fixItem-talkDesc").val()}
        반론, 질문 : ${$("#fixItem-anyDesc").val()}
    `;
    if(confirm(`정말로 수정 하시겠습니까? ${confirmData}`) === true){
        $('#itemModal').modal('hide')
        let data = JSON.stringify({
            "id":itemId,
            "regEmp":$('#fixItem-regEmp').val(),
            "companyName":$("#fixItem-companyName").val(),
            "companyAddress":$("#fixItem-companyAddress").val(),
            "companyDetailAddress":$("#fixItem-companyDetailAddress").val(),
            "companyContact":$("#fixItem-companyContact").val(),
            "infoUrl":$("#fixItem-infoUrl").val(),
            "phoneNumber":$("#fixItem-phoneNumber").val(),
            "serviceTime":$("#fixItem-serviceTime").val(),
            "bestMenu":$("#fixItem-bestMenu").val(),
            "talkPeople":$("#fixItem-talkPeople").val(),
            "managerName":$("#fixItem-managerName").val(),
            "talkDesc":$("#fixItem-talkDesc").val(),
            "anyDesc":$("#fixItem-anyDesc").val()
        });
    
        $.ajax({
            url:"/api/update/item/one",
            type:"POST",
            contentType:"application/json",
            dataType:"json",
            data:data,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-XSRF-TOKEN", $("#_csrf").val());
            },
            success:function(returnData){
                // console.log(returnData);
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
}

function initializeInputData(){
    $("#addItem-regEmp").val("");
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
        return window.location.href=`/list?id=${btoa(authId[1])}&pw=${btoa(authPw[1])}&page=0&date=&name=`;
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
            <td scope="row">${i+1}</td>
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
            <td scope="row" >${i+1}</td>
            <td>${data.companyName}</td>
            <td>${data.companyAddress}</td>
            <td><button type="button" class="btn btn-outline-primary" onclick="modalOpen().fixMode('${data.id}')">수정하기</button></td>
        </tr>
    `;
    return html;
}

function lookupAddedTodayHandler(){
    let html =``;
    let startDate = new Date();
    startDate.setHours(00);
    startDate.setMinutes(00);
    startDate.setSeconds(00);
    let data = {
        "date":startDate.toUTCString()
    };
    $.ajax({
        url:"/api/get/list/addbytoday",
        type:"GET",
        contentType:"application/json",
        dataType:"json",
        data:data,
        success:function(returnData){
            TODAY_DATA = returnData
            for(let i = 0 ; i < returnData.length; i++){
                html += makeTodayAddedHtml(returnData[i],i);
            }
            $("#list-today-added-data").html(html);
        }
    })
}

function modalOpen(){
    return {
        regMode: function(){
            let html = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addItemLabel">업체등록</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class="modalDelBtn" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modalLabel">등록인</div>
                        <input type="text" class="modalInput" name="addItem-regEmp" id="addItem-regEmp"
                            value="${$('#i_username').val()}" disabled>
                        <div class="modalLabel">업체명</div>
                        <input type="text" class="modalInput" name="addItem-companyName" id="addItem-companyName">
                        <div class="modalLabel">업체주소</div>
                        <input type="text" class="modalInput" name="addItem-companyAddress" id="addItem-companyAddress">
                        <div class="modalLabel">업체상세주소</div>
                        <input type="text" class="modalInput" name="addItem-companyDetailAddress"
                            id="addItem-companyDetailAddress">
                        <div class="modalLabel">매장연락처</div>
                        <input type="text" class="modalInput" name="addItem-companyContact" id="addItem-companyContact">
                        <div class="modalLabel">등록링크</div>
                        <input type="text" class="modalInput" name="addItem-infoUrl" id="addItem-infoUrl">
                        <div class="modalLabel">대표핸드폰번호</div>
                        <input type="text" class="modalInput" name="addItem-phoneNumber" id="addItem-phoneNumber">
                        <div class="modalLabel">운영기간</div>
                        <input type="text" class="modalInput" name="addItem-serviceTime" id="addItem-serviceTime">
                        <div class="modalLabel">주력메뉴</div>
                        <input type="text" class="modalInput" name="addItem-bestMenu" id="addItem-bestMenu">
                        <div class="modalLabel">통화한 사람</div>
                        <input type="text" class="modalInput" name="addItem-talkPeople" id="addItem-talkPeople">
                        <div class="modalLabel">담당자 성함</div>
                        <input type="text" class="modalInput" name="addItem-managerName" id="addItem-managerName">
                        <div class="form-group">
                            <label class="modalLabel" for="addItem-talkDesc">통화내용</label>
                            <textarea class="modalInput" id="addItem-talkDesc" name="addItem-talkDesc"
                                rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="modalLabel" for="addItem-anyDesc">반론,질문</label>
                            <textarea class="modalInput" id="addItem-anyDesc" name="addItem-anyDesc"
                                rows="3"></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                            <button type="button" class="btn sendBtn" onclick="addItemSubmit()">등록하기</button>
                        </div>
                    </div>
                </div>
            `
            $('#modalDialog').html(html);
            $('#itemModal').modal('show');
        },
        fixMode: function(itemId){
            item = TODAY_DATA.filter(r=>r.id==itemId)[0];
            let html = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="fixItemLabel">수정하기</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class="modalDelBtn" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modalLabel">등록인</div>
                        <input type="text" class="modalInput" name="fixItem-regEmp" id="fixItem-regEmp"
                            value="${item.regEmp}" disabled>
                        <div class="modalLabel">업체명</div>
                        <input type="text" class="modalInput" name="fixItem-companyName" id="fixItem-companyName" value="${item.companyName}">
                        <div class="modalLabel">업체주소</div>
                        <input type="text" class="modalInput" name="fixItem-companyAddress" id="fixItem-companyAddress" value="${item.companyAddress}">
                        <div class="modalLabel">업체상세주소</div>
                        <input type="text" class="modalInput" name="fixItem-companyDetailAddress"
                            id="fixItem-companyDetailAddress" value="${item.companyDetailAddress}">
                        <div class="modalLabel">매장연락처</div>
                        <input type="text" class="modalInput" name="fixItem-companyContact" id="fixItem-companyContact" value="${item.companyContact}">
                        <div class="modalLabel">등록링크</div>
                        <input type="text" class="modalInput" name="fixItem-infoUrl" id="fixItem-infoUrl" value="${item.infoUrl}">
                        <div class="modalLabel">대표핸드폰번호</div>
                        <input type="text" class="modalInput" name="fixItem-phoneNumber" id="fixItem-phoneNumber" value="${item.phoneNumber}">
                        <div class="modalLabel">운영기간</div>
                        <input type="text" class="modalInput" name="fixItem-serviceTime" id="fixItem-serviceTime" value="${item.serviceTime}">
                        <div class="modalLabel">주력메뉴</div>
                        <input type="text" class="modalInput" name="fixItem-bestMenu" id="fixItem-bestMenu" value="${item.bestMenu}">
                        <div class="modalLabel">통화한 사람</div>
                        <input type="text" class="modalInput" name="fixItem-talkPeople" id="fixItem-talkPeople" value="${item.talkPeople}">
                        <div class="modalLabel">담당자 성함</div>
                        <input type="text" class="modalInput" name="fixItem-managerName" id="fixItem-managerName" value="${item.managerName}">
                        <div class="form-group">
                            <label class="modalLabel" for="fixItem-talkDesc">통화내용</label>
                            <textarea class="modalInput" id="fixItem-talkDesc" name="fixItem-talkDesc"
                                rows="3">${item.talkDesc}</textarea>
                        </div>
                        <div class="form-group">
                            <label class="modalLabel" for="fixItem-anyDesc">반론,질문</label>
                            <textarea class="modalInput" id="fixItem-anyDesc" name="fixItem-anyDesc"
                                rows="3">${item.anyDesc}</textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                            <button type="button" class="btn sendBtn" onclick="fixItemSubmit('${item.id}')">수정하기</button>
                        </div>
                    </div>
                </div>
            `
            $('#modalDialog').html(html);
            $('#itemModal').modal('show');

        }
    }
}