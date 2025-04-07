import { useState } from "react";

export default function Home() {
  const [mensagem, setMensagem] = useState("");

  return (
    <main style={{ padding: 20 }}>
      <h1>🚀 Painel de Reclamações Real Maia</h1>
      <p>Primeira versão publicada com sucesso.</p>
      <textarea
        rows="4"
        placeholder="Escreva algo..."
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      />
      <br />
      <button onClick={() => alert("Mensagem enviada!")}>
        Enviar
      </button>
    </main>
  );
}