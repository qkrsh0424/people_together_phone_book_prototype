init();

async function init(){
    listObjectInit();
    await listDataConnectInitialize();
    listLoadHtmlInitialize();
}

async function listDataConnectInitialize(){
    window.scrollTo(0, 0);
    // if (getUrlParams().date) {
    //     await searchListByDate(getUrlParams().date);
    // } else {
    //     await searchListByCommon();
    //     setItemsSize(ITEMS_SIZE);
    // }
    await searchListByCommon();
    setItemsSize(ITEMS_SIZE);
}

function listLoadHtmlInitialize(){
    loadTableHtml();
}