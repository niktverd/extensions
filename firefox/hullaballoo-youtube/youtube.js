chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("youtube is running");

    const tables = document.getElementById("contents");
    const rows = tables.getElementsByTagName("ytd-video-renderer");

    console.log("serachRows length = ", rows.length);
    // return;
    const data = [];

    for (let iR in rows) {
        const row = rows[iR];
        if (!row.getElementsByTagName) continue;
        // name +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const names = row.getElementsByTagName("h3");
        if (names.length < 1) continue;
        // console.log("row.innerText = ", row.innerText);
        const name = names[0].innerText;
        // console.log("names.length = ", names.length, name);
        // url +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const urls = row.getElementsByTagName("a");
        if (urls.length < 1) continue;
        const url1 = `https://www.youtube.com${urls[0].getAttribute("href")}`;
        const url = url1.split("&")[0];
        // console.log("urls.length = ", urls.length, url);
        // views +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // ytd-video-meta-block
        const metaBlocks = row.getElementsByTagName("ytd-video-meta-block");
        if (metaBlocks.length < 1) continue;
        let views = -1;
        if (metaBlocks[0]) {
            const someText = metaBlocks[0].innerText;

            let textViews = someText.slice(0, 10);
            let isComma = textViews.includes(",") | textViews.includes(".");

            console.log(isComma, textViews);
            textViews = textViews.replace("тыс", "000");
            textViews = textViews.replace("млн", "000000");
            textViews = textViews.replace("млр", "000000000");
            textViews = textViews.replace(/\D/g, "");
            if (isComma) views = Number(textViews) / 10;
            else views = Number(textViews);
            // console.log(textViews, Number(textViews));
        }
        const dataRow = {};

        // const cells = iRR.getElementsByTagName("td");
        dataRow.name = name;
        dataRow.url = url;
        dataRow.views = views;

        data.push({ ...dataRow });
    }

    console.log(data);

    sendResponse(data);
    // const div = "<div>Heelog</div>";
    // div.textContent = "Hellog";
    // console.log( div )
    // tables[0].appendChild(div);
});
