 //toggle nav from side
    let toggle = document.querySelector('#menu');
    let adNav = document.querySelector('#ad-nav');
    let closeBtn = document.querySelector('.close');
    let submit = document.querySelector('#btn-sub');
    let title = document.querySelector('#title');
    let category = document.querySelector('#category');
    let content = document.querySelector('#content');
    let form = document.querySelector('form');
    //show nav bar
    toggle.addEventListener('click', ()=>{
      adNav.classList.add('side')
    })

    //close nav bar
    closeBtn.addEventListener('click', ()=>{
      adNav.classList.toggle('side')
    });
    //submit form
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      let inside = title.value.trim();
      let cat = content.value.trim();
      if (inside === '') {
        title.style.border = '1px solid red';
        alert('title is empty')
      }else{
        title.style.border = '1px solid darkcyan';
      };
     
      if (cat === '') {
        content.style.border = '1px solid red';
        alert('content is empty')
      }else{
        content.style.border = '1px solid darkcyan';
      };

      return
     
    });
