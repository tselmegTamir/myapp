// let registrationForm = document.getElementById("registration-form")

// registrationForm.addEventListener("submit", function(e){
//     e.preventDefault();
    
//     let username = document.getElementById("username-register").value;
//     let email = document.getElementById("email-register").value;
//     let password = document.getElementById("password-register").value;
//     let errors = [];
    
//     if(!username) errors.push("Та нэрээ бичнэ үү.");
//     console.log(username);
//     for(i = 0; i < username.length; i++){
//         let char = username.charAt(i);
//         console.log(char);
//         if(!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9') || char == '_' || char == '-')){
//             errors.push("Нэр зөвхөн латин үсэг, тоо, _ болон - тэмдэгтээс бүрдэх ёстой.");
//             break;
//         }
//     }

//     if(!email) errors.push("Та имэйлээ бичнэ үү.");
//     for(i = 0; i < email.length; i++){
//         let char = email.charAt(i);
//         if(char == ' '){
//             errors.push("Имэйлд хоосон зай оруулахгүй.");
//             break;
//         }
//         if(char == '@') var at_position = i;
//         if(char == '.') var dot_position = i;
//     }
//     if(at_position < 1 || dot_position < at_position + 2 || dot_position + 2 >= email.length){
//         errors.push("Имэйл буруу байна.");
//     }

//     if(!password) errors.push("Нууц үгээ оруулна уу.");
//     if(password && password.length < 8) errors.push("Ядаж 8 оронтой нууц үг оруулна уу.");

//     if(errors.length){
//         let message = "";
//         errors.forEach(function(error){
//             message += error + "\n";
//         });
//         errors = [];
//         alert(message);
//         console.log("aldaa bnda\n");
//     }else{
//         registrationForm.submit();
//     }
// });
