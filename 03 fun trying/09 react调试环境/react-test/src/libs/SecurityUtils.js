
function encrypt(username, password, appKey) {
    var timestamp = (new Date()).getTime();//"1525754085991"
    var message = username + " " + password +" "+timestamp;
    var key = window.CryptoJS.enc.Utf8.parse(appKey);
    var srcs = window.CryptoJS.enc.Utf8.parse(message);
    var encrypted = window.CryptoJS.AES.encrypt(srcs, key, {mode:window.CryptoJS.mode.ECB,padding: window.CryptoJS.pad.Pkcs7});
    var digest = window.CryptoJS.enc.Base64.parse(encrypted.toString()).toString(window.CryptoJS.enc.Hex);
    var arr = new Array();
    arr.push(digest);
    arr.push(timestamp);
    return arr;
}

window.encrypt = encrypt;
