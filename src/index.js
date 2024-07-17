import * as yup from 'yup';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const form = document.querySelector('.rss-form ');
  form.addEventListener('submit', (e) => {
  e.preventDefault();
})


let schema = yup.string().url().nullable().min(3);

const input = document.querySelector('#url-input');
input.value = `dfsdffd`;
// check validity
const url = schema.validate(input.value).then(console.log('good')).catch((e => {
  input.classList.add('is-invalid');
  console.log(e);
}));

const button = document.querySelector('button[type="submit"]');
button.addEventListener('click',(e)=>{
    input.focus();
    input.value = '';
});

