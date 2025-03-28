chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "resolverPergunta",
        title: "Resolver Pergunta",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "resolverPergunta") {
        fetch("https://seu-servidor.com/responder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pergunta: info.selectionText })
        })
        .then(response => response.json())
        .then(data => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: (resposta) => {
                    alert("Resposta: " + resposta);
                },
                args: [data.resposta]
            });
        });
    }
});
