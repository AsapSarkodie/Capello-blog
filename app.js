let menu = document.querySelector('#menu');
let dropdown = document.querySelector('.dropdown');
let body = document.querySelector('#HomePage');
let content = document.querySelector('.content');
let explore = document.querySelector('.sign');

//show dropdown
menu.addEventListener('click', (e)=>{
    if (e.target.classList.contains('menu') ) {
        dropdown.classList.toggle('show')
    }
});

//change content image
//change every 1.5 seconds
const images = [
    "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(image/15.jpg)",
    "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(image/pexels-rahimart-33930075.jpg)",
    "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(image/pexels-sandra-gopan-2152650968-32312788.jpg)",
    "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(image/pexels-silviopelegrin-33621286.jpg)",
    "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(image/girl.jpg)"
]
let index = 0;

const change =()=>{
    content.style.backgroundImage = images[index];
    index = (index + 1) % images.length;
}

setInterval(change, 7000)

// animate on scroll
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) =>{
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
        } else {
             entry.target.classList.remove('visible')
        }
    })
},{
  rootMargin: '12px',
  threshold: 0.2
})

let all = document.querySelectorAll('#animate');
all.forEach(el => observer.observe(el));

//Blog Page Javascript
 // Get all filter buttons and items
        const filterButtons = document.querySelectorAll('#filter-button');
        const items = document.querySelectorAll('.blog-card');

        // Add click event to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter the items
                items.forEach(item => {
                    if (filterValue === 'all') {
                        // Show all items
                        item.classList.remove('hidden');
                    } else {
                        // Show/hide based on category
                        if (item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    }
                });
            });
        });
    //pop up to read
    let popPage = document.querySelector('.sm-page');
    let popImg = document.querySelectorAll('.sm-image');
    let popType = document.querySelectorAll('.sm-ty');
    let popTitle = document.querySelectorAll('.sm-title');
    let popDate = document.querySelectorAll('.sm-date');
    let popDetails = document.querySelectorAll('.sm-details');
    let mainBlog = document.querySelector('.Blog');
    let closeBtn = document.querySelector('.close');

    items.forEach((item)=>{
        item.addEventListener('click', ()=>{
         //  mainBlog.style.height = 'auto'
           if (popPage.classList.contains('revealit')) {
               popPage.classList.remove('revealit')
           } else {
              popPage.classList.add('revealit')
           }
           //now add the contents to it
             let childImage = item.querySelector('.bc-img');
             let childTitle = item.querySelector('.title');
             let childDetails = item.querySelector('.details');
             let childType = item.querySelector('.type');
             let childDate = item.querySelector('.time');
             let moreDetils = document.querySelector('d-more');
              //loop title
              popTitle.forEach((title)=>{
              title.innerHTML = childTitle.innerHTML;  
            });
             //loop through image
             popImg.forEach((img)=>{
             img.src = childImage.src;
            });
             //loop through details
             popDetails.forEach((detail)=>{
              detail.innerHTML =  childDetails.innerHTML;
            });
            //loop throug types 
            popType.forEach((ty)=>{
            ty.innerHTML = childType.innerHTML;
            });
            //loop through time
            popDate.forEach((time)=>{
            time.innerHTML = childDate.innerHTML;
            });
        })
    });
    closeBtn.addEventListener('click', ()=>{
        if (popPage.classList.contains('revealit')) {
            popPage.classList.remove('revealit')
        } else {
            popPage.classList.add('revealit')
        }
    });

    //signnup just checking
     let input = document.querySelector('#me');
     let submit = document.querySelector('.sub');
     
     submit.addEventListener('click', ()=>{
        let user = input.value;
        if (user === 'Sarkodie') {
            alert(`welcome ${user}`)
        }

     });
    //THANK GOD
    
    


























let time = new Date();

timeBlog.innerHTML = `${(time.getMonth()) > 0 ? 0 + time.getMonth() : time.getMonth()  }, ${time.getDate()}, ${time.getFullYear()}`;