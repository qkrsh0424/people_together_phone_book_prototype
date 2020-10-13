function jsonToBase64(json){
    // return btoa(JSON.stringify(json));

    // **JSON -> String -> URI -> base64**
    return btoa(unescape(encodeURIComponent(JSON.stringify(json))))
}

function base64ToJson(str){
    // return JSON.parse(atob(str));

    // **base64 -> URI -> String -> JSON**
    return JSON.parse(decodeURIComponent(escape(atob(str))).toString());
}