async function memberListInit(){
    memberListObjectInit();
    await memberListDataConnect().getAdmins();
    await memberListDataConnect().getMembers();
    memberListHtml().memberTable().load();
    memberListHtml().adminTable().load();
}
memberListInit();