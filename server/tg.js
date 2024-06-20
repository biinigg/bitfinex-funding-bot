const config = require("./config");
const tgUrl=`https://api.telegram.org/bot${config.TG_TOKEN}/sendMessage`
const chat_id=config.TG_CHAT_ID
const push =async (text)=>{
    const hd={'Content-Type': 'application/json'};
    const response = await fetch(`${tgUrl}?chat_id=${chat_id}&text=${text}`,hd);
    const data = await response.json();
    return { data };
}

module.exports = {
    push
};