(function ($) {
    $(function () {

        var liverSlider = $('#onboardingSlider')
        liverSlider.slick({
            infinite: false,
            prevArrow: $('.slider-navigation button.prev'),
            nextArrow: $('.button-wrap .skip, .slider-navigation button.next'),
            dots: false,
            autoplay: false,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnDotsHover: false,
        });

        //ticking machine
        var percentTime;
        var tick;
        var time = .1;
        var progressBarIndex = 0;

        $('.progressBarContainer .progressBar').each(function (index) {
            var progress = "<div class='inProgress inProgress" + index + "'></div>";
            $(this).html(progress);
        });

        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;
            tick = setInterval(interval, 10);
        }

        function resumeProgressbar() {
            tick = setInterval(interval, 10);
        }

        function interval() {
            if (($('.onboarding-slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
                progressBarIndex = $('.onboarding-slider .slick-track div[aria-hidden="false"]').data("slickIndex");
                startProgressbar();
            } else {
                percentTime += 1 / (time + 3);
                $('.inProgress' + progressBarIndex).css({
                    width: percentTime + "%"
                });
                if (percentTime >= 100) {
                    liverSlider.slick('slickNext');
                    progressBarIndex++;
                    if (progressBarIndex > 2) {
                        progressBarIndex = 0;
                    }
                    startProgressbar();
                }
            }
        }

        function resetProgressbar() {
            $('.inProgress').css({
                width: 0 + '%'
            });
            clearInterval(tick);
        }
        startProgressbar();
        // End ticking machine

        var colorSettings = {
                button: ['#FFFFFF', '#FF3C6E', '#FFFFFF', '#FF3C6E'],
                sectionText: ['rgba(255, 255, 255, 0.8)', 'rgba(51, 53, 62, 0.6)', 'rgba(255, 255, 255, 0.8)', 'rgba(51, 53, 62, 0.6)', 'rgba(255, 255, 255, 0.8)'],
                skipText: ['rgba(255, 255, 255, 0.7)', 'rgba(51, 53, 62, 0.4)', 'rgba(255, 255, 255, 0.7)', 'rgba(51, 53, 62, 0.4)'],
                section: ['#FF4864', '#FFE3EA', '#FF4864', '#FFE3EA', '#FF4864'],
                contentText: ['#FFFFFF', '#33353E', '#FFFFFF', '#33353E', '#FFFFFF', '#33353E'],
                highlihgted: ['#ffb84f', '#FF4864', '#ffb84f', '#FF4864', '#ffb84f'],
                progressBarContainer: ['rgba(255, 255, 255, .3)', 'rgba(51, 53, 62, .15)', 'rgba(255, 255, 255, .3)', 'rgba(51, 53, 62, .15)'],
                progressBar: ['#FFFFFF', '#FF3C6E', '#FFFFFF', '#FF3C6E']
            },
            changeColors = function (slide) {
                var container = liverSlider.parents('.container'),
                    progressBarContainer = liverSlider.siblings('.progressBarContainer').find('.progressBar').get(),
                    progressBar = liverSlider.siblings('.progressBarContainer').find('.inProgress').get(),
                    skipBtn = liverSlider.siblings('.button-wrap').find('a.skip').get(0),
                    highlihgtedText = liverSlider.find('.highlighted').get(),
                    contents = liverSlider.find('.contents').get(),
                    contentTextColor = colorSettings.contentText[slide],
                    highlihgtedTextColor = colorSettings.highlihgted[slide],
                    textColor = colorSettings.sectionText[slide],
                    bgColor = colorSettings.section[slide],
                    skipTextColor = colorSettings.skipText[slide],
                    porgressContainerBarBg = colorSettings.progressBarContainer[slide],
                    progressBarBg = colorSettings.progressBar[slide];


                TweenMax.to(container, 0.5, {
                    css: {
                        color: textColor,
                        backgroundColor: bgColor
                    },
                    ease: Sine.easeOut
                });

                TweenMax.to(progressBarContainer, 0.5, {
                    css: {
                        backgroundColor: porgressContainerBarBg
                    },
                    ease: Sine.easeOut
                });

                TweenMax.to(progressBar, 0.1, {
                    css: {
                        backgroundColor: progressBarBg
                    },
                    ease: Sine.easeOut
                });

                TweenMax.to(skipBtn, 0.5, {
                    css: {
                        color: skipTextColor
                    },
                    ease: Sine.easeOut
                });

                TweenMax.to(highlihgtedText, 0.5, {
                    css: {
                        color: highlihgtedTextColor
                    },
                    ease: Sine.easeOut
                });

                TweenMax.to(contents, 0.5, {
                    css: {
                        color: contentTextColor
                    },
                    ease: Sine.easeOut
                });


            };

        changeColors(0);

        liverSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            changeColors(nextSlide);

            var lastSlide = slick.slideCount - 1;
            var secondToLastSlide = slick.slideCount - 2;
            if (slick.slideCount >= 2) {
                //$('a.skip').hide();
                if (currentSlide === secondToLastSlide && nextSlide == lastSlide) {
                    $('a.skip').hide();
                    $('.progressBarContainer').hide();
                    $('.signup.btn').show();
                    liverSlider.slick('slickPause');
                } else if (currentSlide === lastSlide && nextSlide == secondToLastSlide) {
                    $('a.skip').show();
                    $('.progressBarContainer').show();
                    $('.signup.btn').hide();
                };
            }
        });

        liverSlider.on('afterChange', function (event, slick, currentSlide, nextSlide) {
            if (currentSlide == 0) {
                $('a.skip').show();
            }
        });


        // hold slide function
        var touchStartTimeStamp = 0;
        var touchEndTimeStamp = 0;

        window.addEventListener('touchstart', onTouchStart, false);
        window.addEventListener('touchend', onTouchEnd, false);

        var timer;

        function onTouchStart(e) {
            touchStartTimeStamp = e.timeStamp;
            clearInterval(tick);
            liverSlider.slick('slickPause');
        }

        function onTouchEnd(e) {
            touchEndTimeStamp = e.timeStamp;
            resumeProgressbar();
        }
        // End hold slide function


        $('.signup.btn').click(function () {
            $('div.main').fadeOut(500)
        });



    });
})(jQuery);