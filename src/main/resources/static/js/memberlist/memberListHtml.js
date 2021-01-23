function memberListHtml(){
    return{
        memberTable: function(){
            return{
                load: function(){
                    let html = ``;
                    MEMBERS.forEach((r,index) => {
                        html += `
                            <tr>
                                <th scope="row">${index+1}</th>
                                <td style="min-width:100px">${r.username}</td>
                                <td style="min-width:100px">${r.itemSize}</td>
                                <td style="min-width:200px">
                                    <button type="button" class="btn btn-outline-info btn-sm m-1" onclick="memberListEventHandler().resetPassword().openModal('${r.userId}')">비밀번호 재설정</button>
                                    <button type="button" class="btn btn-outline-danger btn-sm m-1" onclick="memberListEventHandler().deleteUser('${r.userId}')">삭제</button>
                                </td>
                            </tr>
                        `;
                    });
                    $('#i_member_table_body').html(html)

                }
            }
        },
        adminTable: function(){
            return{
                load: function(){
                    let html = ``;
                    ADMINS.forEach((r,index) => {
                        html += `
                            <tr>
                                <th scope="row">${index+1}</th>
                                <td style="min-width:100px">${r.own=='OWNER' ? `<b style="color:red;">(나) </b>`:''}${r.username}</td>
                                <td style="min-width:100px">${r.itemSize}</td>
                                <td style="min-width:200px">
                                    ${r.own=='OWNER' ? `<button type="button" class="btn btn-outline-info btn-sm m-1" onclick="memberListEventHandler().resetPassword().openModal('${r.userId}', 'admin')">비밀번호 재설정</button>`: ''}
                                </td>
                            </tr>
                        `;
                    });
                    $('#i_admin_table_body').html(html)

                }
            }
        },
        resetPasswordModal: function(){
            return{
                load: function(memberId, admin='member'){
                    let html = `
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">비밀번호 재설정</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="modalDelBtn" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="modalLabel">재설정할 비밀번호</div>
                                <input type="password" class="modalInput" name="wantedPassword" id="wantedPassword">
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                                    <button type="button" class="btn sendBtn" onclick="memberListEventHandler().resetPassword().reset('${memberId}', '${admin}')">재설정</button>
                                </div>
                            </div>
                        </div>
                    `;
                    $('#i_adminPageModalDialog').html(html);
                }
            }
        }
    }
}