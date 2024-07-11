//import  './styles.scss';
//import  'bootstrap';

function checkLink (link){
    const splitLink = link.split('/');
    return false;
}

let promise = new Promise(function(resolve, reject) {
 const button = document.body.querySelector('.btn');
 button.addEventListener("click", (e) => {
    const check = checkLink('l/link');
    
    resolve(check);
 })
}).then(
    function(result) { 
        if(result){
            const form = document.querySelector('.form-control');
            console.log(form);
            form.classList.add('red');
        }
     },
)

