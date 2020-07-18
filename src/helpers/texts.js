const language = localStorage.getItem('language');


//NOT FOUND PAGE
export const pageNotFoundText = () =>{
    switch (language){
        case "spanish":
            return "Ups! Página no encontrada!";
        case "english":
            return "Ups! Page not found!";      
        case "dutch":
            return "Ups! Page not found (en dutch)!";          
        default:
            return "Ups! Page not found!";      
    }
}

export const homeText = () =>{
    switch (language){
        case "spanish":
            return "Inicio";
        case "english":
            return "Home";      
        case "dutch":
            return "Home in dutch";          
        default:
            return "Home";      
    }
}

export const goBackText = () =>{
    switch (language){
        case "spanish":
            return "Volver";
        case "english":
            return "Go back";      
        case "dutch":
            return "Go back in dutch";          
        default:
            return "Go back";      
    }
}

//LANGUAGES SECTION
export const spanishText = () =>{
    switch (language){
        case "spanish":
            return "Español";
        case "english":
            return "Spanish";      
        case "dutch":
            return "Español in dutch";          
        default:
            return "Spanish";      
    }
}

export const englishText = () =>{
    switch (language){
        case "spanish":
            return "Inglés";
        case "english":
            return "English";      
        case "dutch":
            return "English in dutch";          
        default:
            return "English";      
    }
}

export const dutchText = () =>{
    switch (language){
        case "spanish":
            return "Holandés";
        case "english":
            return "Dutch";      
        case "dutch":
            return "Dutch in dutch";          
        default:
            return "Dutch";      
    }
}

//ADD RECIPIES
export const newRecipieText = () =>{
    switch (language){
        case "spanish":
            return "Nueva receta";
        case "english":
            return "New recipie";      
        case "dutch":
            return "New recipie in dutch";          
        default:
            return "New recipie";      
    }
}

export const nameText = () =>{
    switch (language){
        case "spanish":
            return "Nombre";
        case "english":
            return "Name";      
        case "dutch":
            return "Name in dutch";          
        default:
            return "Name";      
    }
}

export const descriptionText = () =>{
    switch (language){
        case "spanish":
            return "Descripción";
        case "english":
            return "Description";      
        case "dutch":
            return "Description in dutch";          
        default:
            return "Description";      
    }
}

//PROFILE
export const emailText = () =>{
    switch (language){
        case "spanish":
            return "Email";
        case "english":
            return "Email";      
        case "dutch":
            return "Email in dutch";          
        default:
            return "Email";      
    }
}


export const signOutText = () =>{
    switch (language){
        case "spanish":
            return "Cerrar sesión";
        case "english":
            return "Sign out";      
        case "dutch":
            return "Sign out in dutch";          
        default:
            return "Sign out";      
    }
}

export const editProfileText = () =>{
    switch (language){
        case "spanish":
            return "Editar perfil";
        case "english":
            return "Edit profile";      
        case "dutch":
            return "Edit profile in dutch";          
        default:
            return "Edit profile";      
    }
} 

export const deleteText = () =>{
    switch (language){
        case "spanish":
            return "Eliminar";
        case "english":
            return "Delete";      
        case "dutch":
            return "Delete in dutch";          
        default:
            return "Delete";      
    }
} 

//SIGN IN
export const signInText = () =>{
    switch (language){
        case "spanish":
            return "Iniciar sesión";
        case "english":
            return "Sign in";      
        case "dutch":
            return "Sign in in dutch";          
        default:
            return "Sign in";      
    }
} 

export const signInWithGoogleText = () =>{
    switch (language){
        case "spanish":
            return "Iniciar sesión con google";
        case "english":
            return "Sign in with google";      
        case "dutch":
            return "Sign in with google in dutch";          
        default:
            return "Sign in with google";      
    }
} 

//EDIT PROFILE
export const changeProfilePictureText = () =>{
    switch (language){
        case "spanish":
            return "Cambiar foto de perfil";
        case "english":
            return "Change profile picture";      
        case "dutch":
            return "Change profile picture in dutch";          
        default:
            return "Change profile picture";      
    }
} 

export const countryOfOriginText = () =>{
    switch (language){
        case "spanish":
            return "País de origen";
        case "english":
            return "Country or origin";      
        case "dutch":
            return "Country or origin in dutch";          
        default:
            return "Country or origin";      
    }
} 

export const cookingTimeInMinutesText = () =>{
    switch (language){
        case "spanish":
            return "Tiempo de preparación (minutos)";
        case "english":
            return "Cooking time (in minutes)";      
        case "dutch":
            return "Cooking time (in minutes) in dutch";          
        default:
            return "Cooking time (in minutes)";      
    }
} 

export const chooseAPictureText = () =>{
    switch (language){
        case "spanish":
            return "Elija una imagen";
        case "english":
            return "Choose a picture";      
        case "dutch":
            return "Choose a picture in dutch";          
        default:
            return "Choose a picture";      
    }
} 
export const changePictureText = () =>{
    switch (language){
        case "spanish":
            return "Cambiar la imagen";
        case "english":
            return "Change picture";      
        case "dutch":
            return "Change picture in dutch";          
        default:
            return "Change picture";      
    }
} 
export const dropAFileOr = () =>{
    switch (language){
        case "spanish":
            return "Arrastre un archivo o";
        case "english":
            return "Drop a file or";      
        case "dutch":
            return "Drop a file or in dutch";          
        default:
            return "Drop a file or";      
    }
} 

export const clickHereText = () =>{
    switch (language){
        case "spanish":
            return "Haga click aquí";
        case "english":
            return "Click here";      
        case "dutch":
            return "Click here in dutch";          
        default:
            return "Click here";      
    }
} 

export const chooseACountryText = () =>{
    switch (language){
        case "spanish":
            return "Elija un país";
        case "english":
            return "Choose a country";      
        case "dutch":
            return "Choose a country in dutch";          
        default:
            return "Choose a country";      
    }
} 

export const numberOfServingsText = () =>{
    switch (language){
        case "spanish":
            return "Numero de porciones";
        case "english":
            return "Number of servings";      
        case "dutch":
            return "Number of servings in dutch";          
        default:
            return "Number of servings";      
    }
} 

export const seeMoreText = () =>{
    switch (language){
        case "spanish":
            return "Ver más";
        case "english":
            return "See more";      
        case "dutch":
            return "See more in dutch";          
        default:
            return "See more";      
    }
} 

export const startToSearchRecipiesText = () =>{
    switch (language){
        case "spanish":
            return "¡Empezar a buscar recetas!";
        case "english":
            return "Start to search for recipies!";      
        case "dutch":
            return "Start to search for recipies! in dutch";          
        default:
            return "Start to search for recipies!";      
    }
} 

export const searchText = () =>{
    switch (language){
        case "spanish":
            return "Buscar";
        case "english":
            return "Search";      
        case "dutch":
            return "Search in dutch";          
        default:
            return "Search";      
    }
}

export const noResultsForTheSearchText = () =>{
    switch (language){
        case "spanish":
            return "No se encontraron resultados para la busqueda...";
        case "english":
            return "No results for the search";      
        case "dutch":
            return "No results for the search in dutch";          
        default:
            return "No results for the search";      
    }
}


export const lastSearchesText = () =>{
    switch (language){
        case "spanish":
            return "Últimas búsquedas";
        case "english":
            return "Last searches";      
        case "dutch":
            return "Last searches in dutch";          
        default:
            return "Last searches";      
    }
}



