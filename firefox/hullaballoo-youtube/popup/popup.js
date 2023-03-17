// https://blog.logrocket.com/creating-chrome-extension-react-typescript/s

const sendMessageId = document.getElementById("sendmessageid");
const videoUrl = document.getElementById("videoUrl");
let subcategoriesArray = [];
if (sendMessageId) {
    chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
            videoUrl.value = tabs[0].url;
            const subcategoriesResponse = await fetch(
                "https://hullaballoo-backoffice-preprod.herokuapp.com/api/KZmi0zdlh38g54jqi4bXAWSYoy2"
            );
            const subcategoriesJson = await subcategoriesResponse.json();
            console.log(subcategoriesJson);
            const subcategories = document.getElementById("subcategories");
            subcategoriesJson.subcategories.forEach(async (sc) => {
                const { prevSCString } = await chrome.storage.sync.get();
                console.log(prevSCString);
                subcategoriesArray = JSON.parse(prevSCString || "[]");

                const el = document.createElement("button");
                el.id = sc;
                el.innerText = sc;
                el.className = subcategoriesArray.includes(sc) ? "active" : "inactive";
                el.onclick = async () => {
                    const btn = document.getElementById(sc);
                    btn.classList.toggle("inactive");
                    btn.classList.toggle("active");
                    if (subcategoriesArray.includes(sc)) {
                        subcategoriesArray = subcategoriesArray.filter(
                            (item) => item !== sc
                        );
                    } else {
                        subcategoriesArray.push(sc);
                    }
                    console.log({ subcategoriesArray });
                    await chrome.storage.sync.set({
                        prevSCString: JSON.stringify(subcategoriesArray),
                    });
                };
                subcategories.appendChild(el);
            });
        }
    );
    // chrome.tabs.getSelected(null, function (tab) {
    //     videoUrl.value = tab.url;
    // });
    sendMessageId.onclick = async () => {
        sendmessageid.disabled = true;
        const { user, googleSpreadSheet } = await chrome.storage.sync.get();

        chrome.runtime.sendMessage({ x: 123 });
        fetch(
            "https://hullaballoo-backoffice-preprod.herokuapp.com/api/KZmi0zdjqi4bXAWSYoy2",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    videoUrl: videoUrl.value,
                    loader: user,
                    categoryDefinedByStaff: subcategoriesArray,
                    googleSpreadSheet,
                }),
            }
        )
            .then(function (response) {
                sendmessageid.disabled = false;

                return response.json();
            })
            .then(function (json) {
                console.log(json);
                const resultContainer = document.getElementById(
                    "result-container"
                );
                resultContainer.style.display = "block";

                const videoInfoValue = document.getElementById(
                    "video-info-value"
                );
                if (json.videoId) {
                    if (json.alreadyAdded) {
                        videoInfoValue.innerText = `videoId = "${json.videoId}" was on server earlier`;
                        videoInfoValue.style.color = "red";
                    } else {
                        videoInfoValue.innerText = `videoId = "${json.videoId}" has been loaded successfully`;
                        videoInfoValue.style.color = "green";
                    }
                } else {
                    videoInfoValue.innerText = `no-data`;
                    videoInfoValue.style.color = "black";
                }

                const durationInfoValue = document.getElementById(
                    "duration-info-value"
                );

                if (json.matchDuration !== undefined) {
                    if (json.matchDuration) {
                        durationInfoValue.innerText = `no match (${json.durationValue})`;
                        durationInfoValue.style.color = "red";
                    } else {
                        durationInfoValue.innerText = `ok (${json.durationValue})`;
                        durationInfoValue.style.color = "green";
                    }
                } else {
                    durationInfoValue.innerText = `no-data`;
                    durationInfoValue.style.color = "black";
                }

                const orientationInfoValue = document.getElementById(
                    "orientation-info-value"
                );

                if (json.isVertical !== undefined) {
                    if (!json.isVertical) {
                        orientationInfoValue.innerText = `no match (auto) | will be checked manually`;
                        orientationInfoValue.style.color = "orangered";
                    } else {
                        orientationInfoValue.innerText = `ok (auto) | will be checked manually`;
                        orientationInfoValue.style.color = "blue";
                    }
                } else {
                    orientationInfoValue.innerText = `no-data`;
                    orientationInfoValue.style.color = "black";
                }

                const categoryInfoValue = document.getElementById(
                    "category-info-value"
                );

                if (json.matchCategory !== undefined) {
                    if (json.matchCategory) {
                        categoryInfoValue.innerText = `match`;
                        categoryInfoValue.style.color = "green";
                    } else {
                        categoryInfoValue.innerText = `it will be checked manually`;
                        categoryInfoValue.style.color = "orangered";
                    }
                } else {
                    categoryInfoValue.innerText = `no-data`;
                    categoryInfoValue.style.color = "black";
                }
            });
    };
}

// {
//     "ok": true,
//     "videoId": "NcEow7v_Avg",
//     "isVertical": true,
//     "matchCategory": false
// }
