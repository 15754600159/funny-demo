const input = document.querySelector('input'),
    eventObj = document.createEvent('Events');
let cpLock = false;
eventObj.initEvent('input', false, true);
input.addEventListener('compositionstart', () => {
    cpLock = true;
});
input.addEventListener('compositionend', () => {
    cpLock = false;
    // chrome的input事件在composition之前执行，所以需要手动触发一次input事件
    input.dispatchEvent(eventObj); 
});
input.addEventListener('input', (e) => {
    if (cpLock) return;
    console.log(11);
});
