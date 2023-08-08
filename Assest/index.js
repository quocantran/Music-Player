const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const head = $('.head h2');
const cdThumb = $('.cd-img');
const audio = $('.audio');
const play = $('.btn-play');
const progress = $('.progress');
const player =$(".player");
const nextBtn = $('.btn-next');
const prvBtn = $('.btn-prv');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.play-list');
const volumeBtn = $('.show-volume');
const volume = $('.volume');
const volumeRange = $('.set-volume');

const app = {
    isRepeating: false,
    isPlaying : false,
    currentIdx : 0,
    isRandom : false,
    isShowed : false,
    songs: [
        {
            name : "Em của ngày hôm qua",
            author : "Sơn Tùng MTP",
            path : "./Assest/Music/Em-Cua-Ngay-Hom-Qua-Son-Tung-M-TP.mp3",
            image : "https://bookkol.com/wp-content/uploads/2022/12/son-tung-mtp.jpg"
    
    
        },
        {   
            name :'KORDHELL - MURDER IN MY MIND',
            author : 'KORDHELL',
            image : 'https://yt3.googleusercontent.com/AIvG2BTWI8ujDL8BlyCq6P4lSpLU6vfvQZLsrFZ8FCjQOgRPVZHY0IyClzgwvkJALFJqF_yzyg=s900-c-k-c0x00ffffff-no-rj',
            path: './Assest/Music/Murder In My Mind (Sped Up) - Kordhell.mp3'
        },  
        {   
            name :"Close Eyes",
            author : 'DVRST',
            image : 'https://i1.sndcdn.com/artworks-a2RDnava1Qkh0ThL-CBn1Ww-t500x500.jpg',
            path: './Assest/Music/Close Eyes - DVRST.mp3'
        },  
        {   
            name :'Cupid',
            author : 'Twin Ver.',
            image : 'https://i.scdn.co/image/ab67616d0000b273276186e29f0629d0cdd4603a',
            path: './Assest/Music/Cupid (Sped Up) (Twin Ver.) - Đang Cập Nhật.mp3'
        },  
        {   
            name :'Rave - Dxrk ダーク',
            author : 'Dxrk ダーク',
            image : 'data:image/jpeg;base64,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',
            path: './Assest/Music/Rave - Dxrk ダーク.mp3'
        },  
        {   
            name :'Hoa Cỏ Lau - Remix',
            author : 'Phong Max',
            image : 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/f/d/c/c/fdcc328384a8e579122513b6ce23cfac.jpg',
            path: './Assest/Music/Hoa Cỏ Lau (Official Remix) - Phong Max.mp3'
        },
        {   
            name :'Making My Way - Remix',
            author : 'Sơn Tùng MTP',
            image : 'https://i1.sndcdn.com/artworks-vVV3zxIIBvCfCLMH-4RQl1w-t500x500.jpg',
            path: './Assest/Music/Making My Way (Japan Remix) - Sơn Tùng M-TP.mp3'
        },
        {   
            name :'Gió - Speed up(Lofi chill)',
            author : 'Jank Kprox',
            image : 'https://avatar-ex-swe.nixcdn.com/song/2023/03/28/8/e/4/5/1679987170862_640.jpg',
            path: './Assest/Music/Gio (Speed Up) - Jank, KProx - NhacHay360.mp3'
        },
        {   
            name :'Wolves - Japan Remix',
            author : 'Selena Gomez',
            image : 'https://upload.wikimedia.org/wikipedia/en/7/73/Selena_Gomez_and_Marshmello_Wolves.jpg',
            path: './Assest/Music/Wolves (Japan Remix) - Selena Gomez, Marshmello.mp3'
        },
        {   
            name :'Sahara - Hensonn',
            author : 'Hensonn',
            image : 'https://i.ytimg.com/vi/eGLrA4ivxRc/sddefault.jpg',
            path: './Assest/Music/Sahara - Hensonn.mp3'
        },
        {   
            name :'Set Fire To The Rain - Japan Remix',
            author : 'Adele,BTS',
            image : 'https://i.ytimg.com/vi/i-qVse0-j38/maxresdefault.jpg',
            path: './Assest/Music/Mashup_ Set Fire To The Rain, Fake Love (Japan Remix) - Adele, BTS (Bangtan Boys).mp3'
        },

    ],

    defineProperties : function (){
        Object.defineProperty(this, "currentSong",{
            get : function () {
                return this.songs[this.currentIdx];
            }
        })
    },

    render : function(){
        const html = this.songs.map((song,idx) => {
            return `
            <div class="song ${idx === app.currentIdx ? 'active' : ''}" index = ${idx}>
            <div class="thumb" style="background-image: url(${song.image});">
                
                
            </div>
            <div class="title">
                <h3 class="name-song">
                    ${song.name}
                </h3>
                <p class="author">
                    ${song.author}
                </p>

            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
            `
        });
        const playList = $('.play-list');
        
        playList.innerHTML = html.join('');

    },

    events : function() {
        // handle zoom cdThumb;
        const cdThumb = $('.cd');
        const cdWd = cdThumb.offsetWidth;
        document.onscroll = (e)=>{
            const getScroll = window.scrollY || document.documentElement.scrollTop;
            const newWd = cdWd- getScroll;
            if(newWd > 0)
                cdThumb.style.width = newWd + 'px';
            else cdThumb.style.width = 0;

            cdThumb.style.opacity = newWd/cdWd;
        }


        //cdThumb rotate
        const cdThumbRotate = cdThumb.animate({
            transform : `rotate(360deg)`
        },{
            iterations : Infinity,
            duration : 10000,
        })

        cdThumbRotate.pause();

        // handle click playBtn;
        play.onclick = ()=>{
            if(!app.isPlaying){
                app.isPlaying = true;
                audio.play();
                player.classList.add('playing');
                cdThumbRotate.play();
            }else{
                app.isPlaying = false;
                audio.pause();
                player.classList.remove('playing');
                cdThumbRotate.pause();
            }
        }

        // ontimeupdate event handler

        audio.ontimeupdate = ()=>{
            if(audio.duration>0){
                progress.value = Math.floor(audio.currentTime / audio.duration * 100);
            }
            
            
        }

        // videoTimeupdate event handler
        progress.oninput = (e)=>{
            const newTime = audio.duration / 100*e.target.value;
            audio.currentTime = newTime;
        }

        //next Song update event handler

        nextBtn.onclick = ()=>{
            if(!app.isRandom){
                this.nextSong()
                player.classList.add('playing');
                cdThumbRotate.play();
                app.isPlaying = true;
                
                app.render();
            }else{
                app.randomSong();
                player.classList.add('playing');
                cdThumbRotate.play();
                app.isPlaying = true;
                
                app.render();
            }
            console.log(app.currentIdx);
            audio.play();
            app.render();
            app.scrollToView();
            
            
        }

        prvBtn.onclick = ()=>{
            app.prvSong();
            player.classList.add('playing');
            cdThumbRotate.play();
            app.isPlaying = true;
            audio.play();
            app.render();
            app.scrollToView();
        }

        //random event handler
        randomBtn.onclick = ()=>{
            if(!app.isRandom) {
                randomBtn.classList.add('active');
                app.isRandom = true;
            }else{
                randomBtn.classList.remove('active');
                app.isRandom = false
            }
            
            
        }

        //repeating event handler

        const repeat = repeatBtn.animate({
            transform : `rotate(360deg)`
        },{
            iterations : Infinity,
            duration : 4000,
        })
        repeat.pause();

        repeatBtn.onclick = ()=>{
            if(!app.isRepeating) {
                repeatBtn.classList.add('active');
                app.isRepeating = true;
                repeat.play();
            }else{
                repeatBtn.classList.remove('active');
                app.isRepeating = false;
                repeat.pause();
            }
        }

        //End song handler

        audio.onended = ()=>{
            if(!app.isRepeating) {
                nextBtn.click();
            }else{
                audio.play();
            }
           
        }

        // handle click song

        playList.onclick = (e)=>{
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode && !e.target.closest('.option')){
                if(songNode){
                    app.currentIdx = Number(songNode.getAttribute('index'));
                    app.loadCurrentSong();
                    app.isPlaying = true;
                    cdThumbRotate.play();
                    player.classList.add('playing');
                
                    audio.play();
                    app.render();
                }
                
            }
            if(e.target.closest('.option')){
                
            }
        }
        // volume handle change
        volumeBtn.onclick = ()=>{
            if(!app.isShowed){
                volume.classList.add('active');
                app.isShowed = true;
            }else{
                volume.classList.remove('active');
                app.isShowed = false;
            }
        }

        volumeRange.oninput = (e)=>{
            const volumeValue = e.target.value;
            audio.volume = volumeValue;
        }
        // blur out the volume
        document.addEventListener('click',(e)=>{
            if(!volumeBtn.contains(e.target)){
                app.isShowed = false;
                volume.classList.remove('active');
            }
        })

        
        
        


    },

    loadCurrentSong : function(){
        
        head.innerHTML = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;

    },

    nextSong : function(){
        
        app.currentIdx++;
        
        if(app.currentIdx >= app.songs.length) app.currentIdx = 0;
        app.loadCurrentSong();
        
        
        
    },

    randomSong : function(){
        let isFound = false;
        while(!isFound){
            const randomIdx = Math.floor(Math.random() * app.songs.length);
            if(randomIdx !== app.currentIdx){
                app.currentIdx = randomIdx;
                isFound = true;
            }
        }
        app.loadCurrentSong();
    },
    scrollToView : function(){
        const song = $('.song.active');
        setTimeout(()=>{
            song.scrollIntoView({
                behavior :'smooth',
                block : 'center'
                
        })},300)
        
    }, 

    prvSong : function(){
        
        app.currentIdx--;
        
        if(app.currentIdx < 0) app.currentIdx = app.songs.length-1;
        app.loadCurrentSong();
        
     
    },

    start : function(){
        
        this.defineProperties();
        this.render();

        this.loadCurrentSong();
        this.events();
    }
        
    

    

}
app.start();