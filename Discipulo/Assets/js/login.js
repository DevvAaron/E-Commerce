function updateFormContainerHeight(formId) {
    const form = document.getElementById(formId);
    const formContainer = document.querySelector('.form-container');
    formContainer.style.height = `${form.offsetHeight}px`;
}

document.getElementById("Register-btn").addEventListener("click", function(){
    document.getElementById("title").innerHTML = "Registrate";
    document.getElementById("btn-text").innerHTML = "Ya tienes una cuenta?";
    document.getElementById("Login-btn").style.display = "block";
    document.getElementById("Register-btn").style.display = "none";
    
    document.querySelector('.form-container').style.overflow = "hidden";

    document.getElementById("form-login").classList.add("slide-left");
    document.getElementById("form-register").classList.add("slide-right");
  
    updateFormContainerHeight("form-register");

    setTimeout(() => {
        document.querySelector('.form-container').style.overflow = "visible";
    }, 500);
});

document.getElementById("Login-btn").addEventListener("click", function(){
    document.getElementById("title").innerHTML = "Iniciar Sesión";
    document.getElementById("btn-text").innerHTML = "No estás registrado?";
    document.getElementById("Login-btn").style.display = "none";
    document.getElementById("Register-btn").style.display = "block";

    document.querySelector('.form-container').style.overflow = "hidden";

    document.getElementById("form-login").classList.remove("slide-left");
    document.getElementById("form-register").classList.remove("slide-right");
    
    updateFormContainerHeight("form-login");

    setTimeout(() => {
        document.querySelector('.form-container').style.overflow = "visible";
    }, 500); 
});

window.addEventListener('load', function() {
    updateFormContainerHeight("form-login");
});

window.addEventListener('resize', function() {
    const activeForm = document.getElementById("form-register").classList.contains("slide-right") 
        ? "form-register" 
        : "form-login";
    updateFormContainerHeight(activeForm);
});
