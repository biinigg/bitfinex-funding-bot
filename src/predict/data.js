const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
export const loadData = async () => {
    const response = await fetch(`${API_URL}/api/frr/hist`);
    const data = await response.json();
    console.log("hist:", data);
    const volume = data[0].results.volumes;
    const rate = data[0].results.rates;

    return { volume, rate };
};