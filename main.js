$(document).ready(function () {
    // AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    let screenW = $(window).width();

    $(window).resize(function () {
        screenW = $(window).width();

        if (screenW >= 1200) {
            $('#nav-close').click(function () {
                $('aside').css('right', ('-20vw'));
            });
        } else {
            $('aside').css('right', ('-100vw'));
            $('#nav-close').click(function () {
                $('aside').css('right', ('-100vw'));
            });
        }
    });

    //打開側邊欄
    $('.hamburger').click(function () {
        $('aside').css('right', ('0'))
    });

    // 關閉側邊欄
    if (screenW >= 1200) {
        $('#nav-close').click(function () {
            $('aside').css('right', ('-20vw'));
        });
    } else {
        $('#nav-close').click(function () {
            $('aside').css('right', ('-100vw'));
        });
    }

    // navbar color
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $('nav').css({ 'backgroundColor': 'rgba(256, 256, 256)', 'boxShadow': '0px 1px 5px rgba(0, 0, 0,.1)' });
        } else {
            $('nav').css({ 'backgroundColor': 'transparent', 'boxShadow': 'none' });
        }

        animation();
    });

    // swiper
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            414: {
                slidesPerView: 1,
            },
        }
    });

    // video lightbox
    $('section.video').click(function () {
        $('.layer').css('transform', 'scale(1)');
        $('.layer .wrap').css('transform', 'scale(1)');
        $('iframe').css('display', 'block');
        $('iframe').css({ 'transform': 'scale(1)' });
    });

    $('#mv-close-btn').click(function () {
        $('.layer .wrap').css('transform', 'scale(0)');
        $('.layer').css({ 'transform': 'scale(0)', 'transition': 'all .5s .8s' });
        $('iframe').css({ 'transform': 'scale(0)', 'transition': 'all .8s' });


        setTimeout(function () {
            $('.layer').css('transition', 'none');
            $('.layer .wrap').css('transition', ' all .8s');
        }, 800);
    });

    // lazy load 
    let rowCount;
    $('#btn-more').click(function () {
        let row = document.createElement('div');
        rowCount = $('.award .row').length;
        let cardText = $('.card-text')[0];
        let cardImg = $('.card-img')[0];
        let i = 0;

        if (rowCount < 8) {
            $(row).addClass('row').insertBefore($('.award .btn-center'));
            if (rowCount % 2 == 0) {
                while (i < 3) {
                    let newCard = document.createElement('div');
                    newCard = cardText.cloneNode(true);
                    row.append(newCard);
                    i++;
                }
            } else {
                while (i < 3) {
                    let newCard = document.createElement('div');
                    newCard = cardImg.cloneNode(true);
                    row.append(newCard);
                    i++;
                }
                if (rowCount == 7)
                    $('.btn-center').css('visibility', 'hidden');
            }
        }

    });

    $(window).scroll(() => {
        let scrollTop = Math.ceil($(window).scrollTop());
        let btnOffset = Math.ceil($('#btn-more').offset().top - 1000);



        if (scrollTop >= btnOffset) {
            let row = document.createElement('div');
            rowCount = $('.award .row').length;
            let cardText = $('.card-text')[0];
            let cardImg = $('.card-img')[0];
            let i = 0;

            if (rowCount < 8) {
                $(row).addClass('row').insertBefore($('.award .btn-center'));
                let newCard = document.createElement('div');
                newCard = cardText.cloneNode(true);

                if (rowCount % 2 == 0) {
                    while (i < 3) {
                        let newCard = document.createElement('div');
                        newCard = cardText.cloneNode(true);
                        row.append(newCard);
                        i++;
                    }
                } else {
                    while (i < 3) {
                        let newCard = document.createElement('div');
                        newCard = cardImg.cloneNode(true);
                        row.append(newCard);
                        i++;
                    }
                    // if (rowCount == 7)
                    //     $('.btn-center').css('visibility', 'hidden');
                }
            }
        }
    });

    let cylinderL = $('.cylinderL');
    let clTop = parseInt(cylinderL.css('top'));

    let cylinderR = $('.cylinderR');
    let crTop = parseInt(cylinderR.css('top'));

    let circle = $('.circle');
    let cTop = parseInt(circle.css('top'));
    let offsetHeight = $('.award')[0].offsetHeight;




    function animation() {
        let sectionTop = Math.round($('.award')[0].offsetTop);
        let scrollTop = Math.round($(window).scrollTop());
        // console.log("st:", scrollTop);

        let abc = document.querySelector('.award').lastElementChild.previousElementSibling;
        let triggerTop = abc.getBoundingClientRect();
        var bodyRect = document.body.getBoundingClientRect();
        offset = triggerTop.top - bodyRect.top;
        // console.log(offset);

        if (sectionTop < scrollTop && offset > scrollTop) {
            let shift = scrollTop - sectionTop;
            let top = shift + clTop;
            cylinderL.css('top', `${top + 100}px`);
            setTimeout(() => {
                let newCRTop = shift + crTop;
                cylinderR.css('top', `${newCRTop + 100}px`);
            }, 100);


            let time;
            if (screenW < 1200) {
                time = 0;
            } else {
                time = 200;
            }

            setTimeout(() => {
                let newCTop = shift + cTop;
                circle.css('top', `${newCTop + 100}px`);
            }, time);
        }
    }


});