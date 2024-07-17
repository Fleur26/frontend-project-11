import * as yup from 'yup';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const state = {
  form: {
    state: 'valid',
    data: {
      url: '',
    },
    errors: [],
  },
};

function validation (url) {
  let schema = yup.string().url().nullable().min(3)
  .validate(url)
  .then(state.form.state = 'valid')
  .catch((e => {
    const input = document.querySelector('#url-input');
    state.form.state = 'invalid'
    state.form.errors = e; 
    input.classList.add('is-invalid');
  }));
  console.log(schema);
  return schema;
}


const form = document.querySelector('.rss-form ');
  form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#url-input');
  state.form.data.url = input.value;
  validation(state.form.data.url);
  input.focus();
  input.value = '';
})





