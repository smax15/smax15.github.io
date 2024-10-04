const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
const hiddenElementsleft = document.querySelectorAll('.hidden-left');
hiddenElementsleft.forEach((el) => observer.observe(el));
const hiddenElementsup = document.querySelectorAll('.hidden-up');
hiddenElementsup.forEach((el) => observer.observe(el));