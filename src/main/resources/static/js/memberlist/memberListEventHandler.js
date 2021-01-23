function memberListEventHandler(){
    return{
        deleteUser: async function(userId){
            let isOkMessage = prompt('정말로 삭제 하시겠습니까? \n삭제를 원하시면 "지금 삭제" 를 입력해주세요')
            if (isOkMessage == '지금 삭제'){
                let member = MEMBERS.filter(r=>r.userId==userId)[0];
                await memberListDataConnect().deleteMember(member);
                await memberListDataConnect().getMembers();
                memberListHtml().memberTable().load();
            }else{
                return;
            }
        },
        resetPassword: function(){
            return{
                openModal: function(userId,admin='member'){
                    // console.log(admin);
                    memberListHtml().resetPasswordModal().load(userId,admin);
                    $('#i_adminPageModal').modal('show');
                },
                reset: async function(memberId, admin='member'){
                    let member = {}
                    if(admin == 'admin'){
                        member = ADMINS.filter(r=>r.userId==memberId)[0];
                    }else{
                        member = MEMBERS.filter(r=>r.userId==memberId)[0];
                    }
                    let newPassword = $('#wantedPassword').val();
                    await memberListDataConnect().resetMemberPassword(member, newPassword);
                    $('#i_adminPageModal').modal('hide');
                }
            }
            
        }
    }
}