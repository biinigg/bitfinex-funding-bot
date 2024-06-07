

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const GetHist =async ()=>{
    const res =  await fetch(`${API_URL}/api/frrs`).then(res => res.json());
    if (!res || res.length === 0) {
        return;
    }

    const data = {};
    res.forEach(ccyData => {
        data[ccyData.ccy] = ccyData;
    });
    return data;
}

export default GetHist;