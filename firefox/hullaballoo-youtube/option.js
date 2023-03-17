console.log("options js");
const handleSave = async () => {
    const user = document.getElementById("user");
    const googleSpreadSheet = document.getElementById("google-sheet");

    await chrome.storage.sync.set({
        user: user.value,
        googleSpreadSheet: googleSpreadSheet.value,
    });
    console.log("saved");
};

async function restore_options() {
    document.getElementById("save").addEventListener("click", handleSave);

    // Use default value color = 'red' and likesColor = true.
    const items = await chrome.storage.sync.get();
    console.log("restore_options js", items);
    document.getElementById("user").value = items.user;
    document.getElementById("google-sheet").value = items.googleSpreadSheet;
}

document.addEventListener("DOMContentLoaded", restore_options);
// document.getElementById('save').addEventListener('click', handleSave);
