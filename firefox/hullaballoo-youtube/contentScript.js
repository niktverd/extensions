(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideoId = '';


    function forwardRequest(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, (response) => {
                if (!response) return reject(chrome.runtime.lastError);
                return resolve(response);
            });
        });
    }


    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, videoId } = obj;
        console.log({ type, videoId });
        currentVideoId = videoId;
        if (currentVideoId) {
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        const hullaballoBtnExists = document.getElementsById('hullaballoBtn');
        
        if (!hullaballoBtnExists) {
            const hullaballoo = document.createElement('img');
            hullaballoo.src = chrome.runtime.getUrl('images/start.png');
            hullaballoo.id = 'hullaballoBtn';
            hullaballoo.title = 'hullaballoBtn';

            const startId = document.getElementById('start');
            startId.appendChild(hullaballoo);
        }
    }
})();
