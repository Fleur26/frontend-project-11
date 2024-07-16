import * as yup from 'yup';


const form = document.querySelector('form');
console.log(form);
  form.addEventListener('submit', (e) => {
  e.preventDefault();
})

let schema = yup.object().shape({
    website: string().url().nullable()
});

const input = document.querySelector('#url-input');

// check validity
let url = await schema.validate(input.value).catch(e); //or then



const button = document.querySelector('button[type="submit"]');
button.addEventListener('click',(e)=>{
    input.focus();
    input.value = '';
});

