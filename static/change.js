const options = document.getElementById('options');
const forms = {
    admin: document.getElementById('form-admin'),
    user: document.getElementById('form-user'),
    staff: document.getElementById('form-staff'),
    supplier: document.getElementById('form-supplier'),
   canteen: document.getElementById('form-canteen'),
}
options.addEventListener('change', function () {
    for (const formId in forms) {
        forms[formId].classList.add('hidden');
    }
    const selectedOption = options.value;
    if (selectedOption !== 'none') {
        forms[selectedOption].classList.remove('hidden');
    }
});

// const options = document.getElementById('options');
// const forms = {
//     admin: document.getElementById('form-admin'),
//     user: document.getElementById('form-user'),
//     staff: document.getElementById('form-staff'),
//     supplier: document.getElementById('form-supplier'),
//     canteen: document.getElementById('form-canteen'),
// };

// options.addEventListener('change', function () {
//     for (const formId in forms) {
//         forms[formId].classList.add('hidden');
//     }

//     const selectedOption = options.value;

//     if (selectedOption !== 'none') {
//         forms[selectedOption].classList.remove('hidden');
//     }
// });