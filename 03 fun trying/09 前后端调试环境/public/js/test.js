$(function () {

    const input = document.querySelector('input'),
        eventObj = document.createEvent('Events');
    let cpLock = false;
    eventObj.initEvent('input', false, true);
    input.addEventListener('compositionstart', () => {
        cpLock = true;
    });
    input.addEventListener('compositionend', () => {
        cpLock = false;
        input.dispatchEvent(eventObj); // 针对chrome的
    });
    input.addEventListener('input', (e) => {
        if (cpLock) return;
        console.log(11);
    });

})