document.getElementById("enviar").addEventListener("click", function() {
    const pergunta = document.getElementById("pergunta").value;

    fetch("https://seu-servidor.com/responder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pergunta })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("resposta").innerText = "Resposta: " + data.resposta;
    });
});
