export const uniqueIDGenerator = (arg: string): number => {
    const length = arg?.length;
    let characters = "123456789";
    let str = "";
    for(let i = 0 ; i < length ; i++){
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let uniqueID = parseInt(str);

    return uniqueID;
}