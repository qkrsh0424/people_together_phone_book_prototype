function memberListDataConnect(){
    return{
        getAdmins: async function(){
            await $.ajax({
                url: '/api/user/get/admin/all',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success: function(returnData){
                    // console.log(returnData)
                    if(returnData.message =='SUCCESS'){
                        ADMINS = returnData.data;
                    }
                },
                error: function(error){
                    console.log(error)
                }
            });
        },
        getMembers: async function(){
            await $.ajax({
                url: '/api/user/get/member/all',
                type:'GET',
                contentType:'application/json',
                dataType:'json',
                success: function(returnData){
                    // console.log(returnData)
                    if(returnData.message =='SUCCESS'){
                        MEMBERS = returnData.data;
                    }
                },
                error: function(error){
                    console.log(error)
                }
            });
        },
        deleteMember: async function(member){
            let data = JSON.stringify(member);
            await $.ajax({
                url: '/api/user/delete/member/one',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function(xhr){
                    xhr.setRequestHeader('X-XSRF-TOKEN', $('#_csrf').val());
                },
                success: function(returnData){
                    if(returnData.message == 'USER_INVALID'){
                        alert('세션이 만료되었습니다.');
                        window.location.reload();
                        return;
                    }
                    if(returnData.message == 'ERROR'){
                        alert('페이지 권한 에러');
                        window.location.reload();
                        return;
                    }

                },
                error: function(error){
                    console.log(error);
                    alert('페이지 에러 : 페이지를 새로고침 해주세요.')
                }
            });
        },
        resetMemberPassword: async function(member, newPassword){
            let data = JSON.stringify({
                'member': member,
                'newPassword': newPassword
            });
            // console.log(data)
            await $.ajax({
                url: '/api/user/update/member/password',
                type:'POST',
                contentType:'application/json',
                dataType:'json',
                data:data,
                beforeSend: function(xhr){
                    xhr.setRequestHeader('X-XSRF-TOKEN', $('#_csrf').val());
                },
                success: function(returnData){
                    if(returnData.message=='SUCCESS'){
                        alert('비밀번호가 재설정 되었습니다. 로그인 상태 유저는 로그아웃 처리 됩니다.')
                        window.location.reload();
                        return;
                    }
                    if(returnData.message == 'ERROR'){
                        alert('페이지 권한 에러');
                        window.location.reload();
                        return;
                    }

                },
                error: function(error){
                    console.log(error);
                    alert('페이지 에러 : 페이지를 새로고침 해주세요.')
                }
            });
        }
    }
}