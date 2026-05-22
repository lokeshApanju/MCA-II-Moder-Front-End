document.addEventListener('DOMContentLoaded', function () {


    const form = document.getElementById('input_form')
    const copy = document.getElementById('copy')
    const save_pass = document.getElementById('save_pass')
    const output_pass = document.getElementById('output_pass')

    document.getElementById('input_form').addEventListener('submit', function (e) {
        e.preventDefault()

        let input_length = document.getElementById('input_lenght')
        let input_Uppercase = document.getElementById('input_Uppercase')
        let input_Number = document.getElementById('input_Number')
        let input_Character = document.getElementById('input_Character')
        let copyIcon = document.querySelector('#icon-hide')
        copyIcon.style.display = 'inline-block';


        //    console.log(input_length.value)

        let password = ""
        let str = "abcdefghijklmnopqrstuvwxyz"

        if (input_Uppercase) { str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ" }

        if (input_Number) {
            str += "0123456789"
        }

        if (input_Character) {
            str += "!@#$%^&*()_-+=[]{}|:;<>,.?/"
        }

        let passLength = parseInt(input_length.value)
        if (isNaN(passLength) || passLength <= 0) {
            passLength = 8
        }

        for (let i = 0; i < passLength; i++) {
            let random = Math.floor(Math.random() * str.length);
            password += str[random]
        }

        let output = document.getElementById('output')
        output.innerHTML = `<h3>Password:</h3> ${password}`


        copyIcon.addEventListener("click", function () {
            navigator.clipboard.writeText(password)
            copyIcon.style.color = "green"
            alert("Copied!")
        })

    })

})




