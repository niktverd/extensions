console.log('background in running')

chrome.action.onClicked.addListener(async (tab) => {
    console.log('chrome.action.onClicked');
    if (!tab?.url.includes('youtube.com/watch') && !tab?.url.includes('youtube.com/shorts')) {
        console.log('skipped');
        return null;
    }


    // const items = await chrome.storage.sync.get()

    const {user} = await chrome.storage.sync.get();
    console.log({user})

    // const response = await fetch('https://localhost:3030/api/KZmi0zdjqi4bXAWSYoy2', {
    const response = await fetch('https://hullaballoo-backoffice-preprod.herokuapp.com/api/KZmi0zdjqi4bXAWSYoy2', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            videoUrl: tab.url,
            user,
        })
    });
    console.log({status: response.status});

    // const json = await response.json();

})