// 检查账户
interface ReturnCheck {
    success: boolean,
    message: string
}

export const checkAccount = (username: string): ReturnCheck => {
    if (username.trim() === "") {
        // trim()去除首位空格
        return {
            success: false,
            message: "账号不能为空",
        }
    } else if (username.includes(" ")) {
        return {
            success: false,
            message: "账号不能存在空格"
        }
    } else {
        return {
            success: true,
            message: "账户格式正确"
        }
    }
}

export const checkPassword = (password: string): ReturnCheck => {
    if(password.trim()===""){
        return {
            success: false,
            message: "密码不能为空"
        }
    }else if(password.includes(" ")) {
        return {
            success: false,
            message: "密码不能存在空格"
        }
    } else if(password.length < 6) {
        return {
            success: false,
            message: "密码长度不能小于6位"
        }
    } else {
        return {
            success: true,
            message: "密码格式符合要求"
        }
    }
}


export const checkPasswordConfirmation = (originPassword: string,confirmedPassword: string): ReturnCheck => {
    if(originPassword !== confirmedPassword){
        return {
            success: false,
            message: "两次密码不一致"
        }
    }
    return {
        success: true,
        message: "两次密码一致"
    }
}