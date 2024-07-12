import * as yup from 'yup';

let schema = yup.object().shape({
email: yup.string().email('Not a proper email'), // pass your error message string
});

// check validity
schema
.validate({
email: 'not.a.valid.email',
})
.catch((err) => {
document.querySelector('#fInput').classList.add('red');
console.log(err.name); // ValidationError
console.log(err.errors); // ['Not a proper email']
});


