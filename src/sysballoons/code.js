let audio;
let source = `https://archive.org/download/WindowsVista.InboxMedium.SoundScheme/notify.mp3?tunnel=1`
let balloonCount = 0;
function sba_send(sb_title, sb_body, sb_icon) {
    const balloonWrapper = $(`
        <div class="sb_wrapper">
            <div class="sb_balloon">
                <img class="sb_icon" draggable='false'src="${sb_icon !== 'noicon' ? sb_icon : ''}" width="16" height="16" style="${sb_icon === 'noicon' ? 'display:none;' : ''}">
                <b class="sb_title">${sb_title}</b>
                <br>
                <span class="sb_body">${sb_body}</span>
                <div class="progress-bar-sb"></div>
            </div>
            <svg class="sb_handle" xmlns="http://www.w3.org/2000/svg" width="17.25" height="17.212" fill="#ffffe1">
                <path d="M1.207.255H.603l.427.427 15.5 15.5.427.427v-.604-15.5-.25h-.25z" stroke="#000" stroke-width=".5"/>
                <path d="M-.398.683h18.2v-.859h-18.2z"/>
            </svg>
        </div>
    `);

    $('body').append(balloonWrapper);
    balloonCount++;
    repositionBalloons();
    audio = new Audio(source);
    audio.play();
    setTimeout(() => {
        balloonWrapper.addClass('removing');
        balloonCount--;
        repositionBalloons();

        balloonWrapper[0].style.animation = 'translateoff 1s cubic-bezier(0.25, 1.46, 0.53, 1) forwards';
        balloonWrapper[0].addEventListener('animationend', function(event) {
            if (event.animationName === 'translateoff') {
                balloonWrapper.remove();
            }
        });
    }, 3000);
       return "SysBalloon succesfully created."
}

function repositionBalloons() {
    $('.sb_wrapper').not('.removing').each(function(index) {
        $(this).css('bottom', `${71 + index * 70}px`);
    });
}

$(document).ready(function() {
    $("head").append(`
        <style>
            .sb_wrapper {
                width: fit-content;
                position: fixed;
                right: 25px;
                bottom: 71px;
                z-index: 2;
                opacity: 0;
                animation: translate 1s cubic-bezier(0.25, 1.46, 0.53, 1) forwards;
                transition: bottom 1s cubic-bezier(0.25, 1.46, 0.53, 1);
            }
            .sb_balloon {
                user-select: none;
                background: linear-gradient(90deg, #0032 20%, #5551 35%, #5552 60%, #0032 70%);
                max-height: 60px;
                padding: 8px;
                border: 1px solid #d3d3d3;
                outline: 1px solid #000;
                border-radius: 6px;
                font-family: "Segoe UI", Arial, sans-serif;
                font-size: 11px;
                backdrop-filter: blur(276px) saturate(0.6);
                overflow: hidden;
            }
            .sb_handle {
                display: none;
            }
            .sb_title {
                vertical-align: middle;
                margin-bottom: 1px;
            }
            .sb_icon {
                vertical-align: middle;
                margin-right: 2px;
                margin-bottom: 1px;
                border-radius: 2px;
            }
            .progress-bar-sb {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 4px;
                background-color: var(--select-color-primary);
                filter: saturation(2);
                width: 100%;
                animation: progress-bar-sba 3s linear forwards;
            }
            @keyframes translate {
                from {
                    transform: translateX(50px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes progress-bar-sba {
                from { width: 100%; }
                to { width: 0%; }
            }
            @keyframes translateoff {
                from {
                    transform: translateX(0px);
                    opacity: 1;
                }
                to {
                    transform: translateX(50px);
                    opacity: 0;
                }
            }
        </style>
    `);
    setTimeout(() => sba_send("Hello, world!", "Telegram: @imancatt", `https://img.icons8.com/ios7/512/FFFFFF/telegram-app.png`), 1555);
});

window.sba_send = sba_send;
