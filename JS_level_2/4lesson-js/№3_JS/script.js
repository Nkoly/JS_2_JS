function inspectForm() {

    let regexpName = /[a-zА-я]/gi;
    let regexpTel = /\+7\(\d{3}\)\d{3}-\d{4}/;
    let regexpEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
    let regexpText = /[a-zА-я0-9]/;

    let name = document.getElementById('name');
    let tel = document.getElementById('tel');
    let email = document.getElementById('email');
    let text = document.getElementById('text');
    let error_name = document.querySelector('.error_name');
    let error_tel = document.querySelector('.error_tel');
    let error_email = document.querySelector('.error_email');
    let error_text = document.querySelector('.error_text');

    // a. Имя содержит только буквы.
    if (regexpName.test(name.value) === false) {
        name.style.borderColor = 'red';
        error_name.style.display = 'block';
    } else {
        name.style.borderColor = 'green';
    }

    //b. Телефон имеет вид +7(000)000-0000.
    if (regexpTel.test(tel.value) === false) {
        tel.style.borderColor = 'red';
        error_tel.style.display = 'block';
    } else {
        tel.style.borderColor = 'green';
    }

    //c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
    if (regexpEmail.test(email.value) === false) {
        email.style.borderColor = 'red';
        error_email.style.display = 'block';
    } else {
        email.style.borderColor = 'green';
    }

    //d. Текст произвольный.
    if (regexpText.test(text.value) === false) {
        text.style.borderColor = 'red';
        error_text.style.display = 'block';
    } else {
        text.style.borderColor = 'green';
    }
};

document.querySelector('.btn').addEventListener('click', inspectForm);