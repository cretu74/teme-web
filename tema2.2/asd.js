function validateForm() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let regulaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regulaEmail.test(email)) {
        alert("Emailul nu este completat corespunzator.");
        return false;
    }

    let regulaParola = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regulaParola.test(password)) {
        alert("Parola nu este completată corespunzator.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Parolele nu se potrivesc.");
        return false;
    }
    
    alert("Formularul este valid!");
    return true; 
}
