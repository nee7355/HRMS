export const getNestedValue = (obj, key) => {
    return key?.split(".").reduce((value, currentKey) => {
        return value?.[currentKey];
    }, obj);
};