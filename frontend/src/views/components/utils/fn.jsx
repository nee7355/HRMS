export const getNestedValue = (obj, key) => {
    return key?.split(".").reduce((value, currentKey) => {
        return value?.[currentKey];
    }, obj);
};

export const localTime = (time) => {
    const date = new Date(time)
    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: true
    })
}