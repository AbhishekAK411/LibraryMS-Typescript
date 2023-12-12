export const tokenGenerator = (): string => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?"
    let length = characters?.length;
    let token:string;

    for(let i = 0 ; i <= 100 ; i++){
        token += characters.charAt(Math.floor(Math.random() * length));
    }
    if(token?.length){
        return token;
    }
}