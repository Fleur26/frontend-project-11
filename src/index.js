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

function render (state) {
  const input = document.querySelector('#url-input');
  const submit = document.querySelector('.rss-form ');

  submit.disabled = state.form.state === 'valid';
  if(state.form.state === 'valid'){
    input.classList.remove('is-invalid')
    submit.disabled = true;
  }
  else{
    input.classList.add('is-invalid');
    console.log(state.form.state);
  }
}

function validation (url) {
  let schema = yup.string().url().nullable().min(3)
  .validate(url)
  .then((e => {
    state.form.state = 'valid';
    console.log(state.form.state);
}))
  .catch((e => {
    state.form.state = 'invalid'
    state.form.errors = e; 
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
  render(state);
  input.focus();
  input.value = '';
})





