export const baseUrl = (endpoint, action = '') => `http://localhost:3000/${endpoint}/${action}`


export const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export function industryColor(industry) {
    switch (industry) {
        case "health":
            return "text-green-800 bg-green-100";
        case "insurance":
            return "text-yellow-800 bg-yellow-100";
        case "entertainment":
            return "text-blue-800 bg-blue-100";
        default:
            return "text-gray-800 bg-gray-100";
    }
}