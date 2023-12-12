/**
 * 
 * @param name string
 * @returns randomly generated member ID
 */
export const memberIDGenerator = (name: string): number => {
    const length = name?.length;
    let characters = "123456789";
    let str = "";
    for(let i = 0 ; i < length ; i++){
        str += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let memberId = parseInt(str);

    return memberId;
}