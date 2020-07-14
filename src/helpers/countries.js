var language = localStorage.getItem('language');

export const languageTranslate = () =>{
    switch (language){
        case "spanish":
            return "es";
        case "english":
            return "en";      
        case "dutch":
            return "nl";          
        default:
            return "en";      
    }
}