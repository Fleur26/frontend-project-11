import * as yup from 'yup';



let schema = yup.object().shape({
    website: string().url().nullable()
});

// check validity
let url = await schema.validate(await fetchUser());

if(!url){
    document.querySelector('#url-input').classList.add('red');
    console.log('not right');
}

const button = document.querySelector('#btn');
const input = document.querySelector('#url-input');
button.addEventListener('click',(e)=>{
    input.focus();
    input.value = '';
});
