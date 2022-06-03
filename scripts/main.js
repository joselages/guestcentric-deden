
const body = document.body;
const menu = {
    btn: document.querySelector('.js-menuBtn'),
    el: document.querySelector('.js-menuEl'),
    lastScrollPos: 0,
    toggle() {

        menu.resetScrollPos();

        menu.el.classList.toggle('-active');
        menu.btn.classList.toggle('-active');
        body.classList.toggle('-no-scroll');
    },
    resetScrollPos() {
        if(body.classList.contains('-no-scroll')){
            setTimeout(() => window.scrollTo(0, menu.lastScrollPos), 0);
            return;
        }

        menu.lastScrollPos = window.scrollY;
        
    },
    init(){
        menu.btn.addEventListener('click', menu.toggle )
    }
};

const header = {
    el: document.querySelector('.js-header'),
    elToObserve: document.querySelector('.js-heroSection'),
    options:{
        threshold: 0.8,    
    },
    handleIntersection(entries){
        entries.map((entry) => {
           if(entry.isIntersecting){
                header.el.classList.remove('-solid-bg')
           } else {
                header.el.classList.add('-solid-bg')
           }
        });
    },
    observe(){
        const observer = new IntersectionObserver( header.handleIntersection, header.options );
        observer.observe(header.elToObserve);
    }
};

const parallax = {
    el: {
        1: document.querySelector('.js-parallax1'),
        2: document.querySelector('.js-parallax2'),
        3: document.querySelector('.js-parallax3'),
    },
    move(ev){
        
        const offsetX = ev.clientX - window.innerWidth/2
        const offsetY = ev.clientY - window.innerHeight/2

        for(key in parallax.el){
            parallax.el[key].style.transform = `translate3D(${offsetX/350 }%,${offsetY/350}%,0)`;
        }

    },
    init(){
        body.addEventListener('mousemove', ev => parallax.move(ev));
    }
}

const slider = {
    special:{
        state: 1,
        arrowL: document.querySelector('.js-arrowL'),
        arrowR: document.querySelector('.js-arrowR'),
        parentEl: document.querySelector('.js-dedenSlider'),
        items: document.querySelectorAll('.js-dedenSliderItem'),
        count: 0,
        toggleArrows(){

            if(slider.special.state < 1) {
                slider.special.arrowL.classList.add('-disabled');
                slider.special.arrowR.classList.remove('-disabled');
            } else if(slider.special.state >= slider.special.count - 1) {
                slider.special.arrowR.classList.add('-disabled');
                slider.special.arrowL.classList.remove('-disabled');
            } else {
                slider.special.arrowL.classList.remove('-disabled');
                slider.special.arrowR.classList.remove('-disabled');
            }

        },
        update(){
            slider.special.parentEl.style.setProperty('--sliderStep', slider.special.state);
            slider.special.toggleArrows();
            for(let i = 0; i < slider.special.count; i++){
                
                if(i === slider.special.state){
                    slider.special.items[i].classList.add('-active');
                    continue;
                }

                slider.special.items[i].classList.remove('-active');
            }
        },
        init(){
            slider.special.count = slider.special.items.length;

            for(let i = 0; i < slider.special.count; i++){
                slider.special.items[i].style.setProperty('--itemIdx',i);
            }

            slider.special.parentEl.style.setProperty('--childrenCount', slider.special.count);
            slider.special.update(); 
            
            slider.special.arrowL.addEventListener('click', () => {
                slider.special.toggleArrows()
                if(slider.special.state < 1) return;
                slider.special.state--;
                slider.special.update(); 
            });

            slider.special.arrowR.addEventListener('click', () => {
                if(slider.special.state >= slider.special.count - 1) return;
                slider.special.state++;
                slider.special.update(); 
            });

        }
    },
    hero:{
        state: 0,
        count: 0,
        parentEl: document.querySelector('.js-heroSection'),
        arrowL:document.querySelector('.js-arrowHeroL'),
        arrowR:document.querySelector('.js-arrowHeroR'),
        bgImg: [
            './images/colorful_houses.jpg',
            './images/water_park.jpg'
        ],
        bgPosArr:[],
        toggleArrows(){

            if(slider.hero.state < 1) {
                slider.hero.arrowL.classList.add('-disabled');
                slider.hero.arrowR.classList.remove('-disabled');
            } else if(slider.hero.state >= slider.hero.count - 1) {
                slider.hero.arrowR.classList.add('-disabled');
                slider.hero.arrowL.classList.remove('-disabled');
            } else {
                slider.hero.arrowL.classList.remove('-disabled');
                slider.hero.arrowR.classList.remove('-disabled');
            }
    
        },
        update(){
            slider.hero.toggleArrows()
            for(let i = 0; i< slider.hero.count; i++){

                let bgPos = '120vw center';

                if(i === slider.hero.state){
                    bgPos = '0vw center';
                }

                slider.hero.bgPosArr[i] = bgPos;
            }
            slider.hero.parentEl.style.backgroundPosition = slider.hero.bgPosArr.join(',');
        },
        create(){
            let bgImgString =''; 
            for(let i = 0; i< slider.hero.count; i++){
                bgImgString += `url(${slider.hero.bgImg[i]}),`;
                slider.hero.bgPosArr.push('0vw center');
            }

            slider.hero.parentEl.style.backgroundPosition = slider.hero.bgPosArr.join(',');
            slider.hero.parentEl.style.backgroundImage = bgImgString.slice(0, -1);
        },
        init(){

            slider.hero.count = slider.hero.bgImg.length;
            slider.hero.create();
            slider.hero.toggleArrows()

            slider.hero.arrowL.addEventListener('click', () => {
                if(slider.hero.state < 1){
                    return;
                }
                slider.hero.state--;
                slider.hero.update();
            })

            
            slider.hero.arrowR.addEventListener('click', () => {
                if(slider.hero.state >= slider.hero.count - 1){
                    return;
                }
                slider.hero.state++;
                slider.hero.update();
            })

        }
    }

};




menu.init();
header.observe();
parallax.init();
slider.special.init();
slider.hero.init();