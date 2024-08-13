document.querySelector(".popup .close-btn").addEventListener("click",function()
{
    document.querySelector(".popup").classList.remove("active");
});

    function handleLogin()
    {
        Event.preventDefault(); 
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        

        alert('Username:' + username + '\nPassword: ' + password);
    }

