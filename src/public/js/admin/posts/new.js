const form = document.querySelector('#form');

form.addEventListener('submit', (e)=> {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const category = document.querySelector('#category').value;
  const body = document.querySelector('#body').value;
  const items = [title, category, body];
  
  if(!title || !category || !body){
    alert('Por favor, preencha os dados corretamente!')
  }else{
    form.submit();
  }
})