export const handlePassword = (password:string | undefined) => {
    if(!password){
        return {
            message:"please fill password"
        }
    }
    
    const regex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
    
    return regex.test(password)

}