import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var Hammer: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public siteKey: string = '6LcA8J0UAAAAAL7GznZ6gyjgoln1pZkhL4hikl43';
  public tab: string = 'detail';
  public img: string = '';
  public currentIndex: number = 0;

  public modelPhotos = [ 
    { img: './assets/img/img1.jpg' }, 
    { img: 'http://memoflores.com/fotos-de-boudoir-02.jpg' },
    { img: './assets/img/img2.jpg' }, 
    { img: './assets/img/img3.jpg' },
    { img: './assets/img/img4.jpg' },  
    { img: './assets/img/img5.jpg' },
    { img: 'https://i.pinimg.com/736x/25/99/29/2599295c134bd149971e89f219fa8b64.jpg' }, 
    { img: 'https://pbs.twimg.com/media/DV7PNzlUQAAK8Zr.jpg' },
    { img: './assets/img/img6.jpg' },
    { img: './assets/img/img7.jpg' },
    { img: './assets/img/img9.jpg' },
    { img: './assets/img/img11.jpg' },
  ];

  public comment: any = {};

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(){
    window.scrollTo(0, 0);
    this.initCarruselEvent();
  }

  openModalPhotos(index){
    this.img = this.modelPhotos[index].img;
    this.currentIndex = index;

    $('#photos').modal('show');
    $("#photos").appendTo("body");
  }

  openModalComment(){
    $('#comment').modal('show');
    $("#comment").appendTo("body");
  }

  initCarruselEvent() {
    var carrusel = $('#carrusel')[0];
    var mc = new Hammer(carrusel);

    mc.on("swipeleft", () => {
      this.nextImg();
    });

    mc.on("swiperight", () => {
      this.prevImg();
    });
  }

  prevImg() {
    if(this.currentIndex > 0) {
      this.currentIndex--;
      this.img = this.modelPhotos[this.currentIndex].img;
    }else{
      this.currentIndex = this.modelPhotos.length - 1;
      this.img = this.modelPhotos[this.currentIndex].img;
    }
  }

  nextImg(){
    if(this.currentIndex < (this.modelPhotos.length - 1)) {
      this.currentIndex++;
      this.img = this.modelPhotos[this.currentIndex].img;
    }else{
      this.currentIndex = 0;
      this.img = this.modelPhotos[0].img;
    }
  }


  goToImportant(){
    $('html, body').animate({
      scrollTop: $("#important").offset().top
    }, 800);
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

}
