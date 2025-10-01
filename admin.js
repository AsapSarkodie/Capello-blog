 //toggle nav from side
    let toggle = document.querySelector('.toggle-me');
    let adNav = document.querySelector('#ad-nav');
    let closeBtn = document.querySelector('.close');

    //show nav bar
    toggle.addEventListener('click', ()=>{
      adNav.classList.add('side')
    })

    //close nav bar
    closeBtn.addEventListener('click', ()=>{
      adNav.classList.toggle('side')
    });
