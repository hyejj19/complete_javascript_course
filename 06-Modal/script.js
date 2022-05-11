'use strict';

const btnShowModal = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');


//Open Modal
const handleModalOpen = function() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
for(let i = 0; i < btnShowModal.length; i++){
    btnShowModal[i].addEventListener('click',handleModalOpen);
}

//Close Modal
const handleModalClose = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
overlay.addEventListener('click',handleModalClose);
btnCloseModal.addEventListener('click',handleModalClose);

//Close Modal Pressing ESC.
document.addEventListener('keydown',function(e){
    if(e.key==='Escape' && !modal.classList.contains('hidden'))
    handleModalClose();
    
})