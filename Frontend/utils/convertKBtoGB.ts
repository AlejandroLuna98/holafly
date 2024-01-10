
export const convertKBtoGB =(kilobytes:number):number => {
    const gigabytes = kilobytes / (1024 * 1024);
    return parseFloat(gigabytes.toFixed(2));
}
