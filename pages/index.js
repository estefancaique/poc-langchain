export default function Home() {
  return (
    <div>
      <head>
        <title>POC LangChain - Calculadora de Rotas</title>
        <meta name="description" content="POC para validação de integração LangChain com Google APIs" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main>
        <h1>Calculadora de Rotas</h1>
        <p>POC - LangChain + Google Maps + OpenAI + Supabase</p>
        
        <div id="route-form">
          <div>
            <label htmlFor="origin">Local de Partida:</label>
            <input 
              type="text" 
              id="origin" 
              name="origin" 
              placeholder="Ex: Avenida Paulista, São Paulo"
              required 
            />
          </div>
          
          <div>
            <label htmlFor="destination">Local de Destino:</label>
            <input 
              type="text" 
              id="destination" 
              name="destination" 
              placeholder="Ex: Aeroporto de Guarulhos, São Paulo"
              required 
            />
          </div>
          
          <button type="button" onClick="calculateRoute()" id="calculate-btn">
            Calcular Rota
          </button>
        </div>

        <div id="loading" style={{display: 'none'}}>
          <p>Processando... Por favor aguarde.</p>
        </div>

        <div id="results" style={{display: 'none'}}>
          <h2>Resultados</h2>
          <div id="route-info"></div>
          <div id="route-map"></div>
          <div id="route-summary"></div>
        </div>

        <div id="error" style={{display: 'none'}}>
          <h2>Erro</h2>
          <p id="error-message"></p>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{
        __html: `
          async function calculateRoute() {
            const origin = document.getElementById('origin').value;
            const destination = document.getElementById('destination').value;
            
            if (!origin || !destination) {
              alert('Por favor, preencha ambos os campos.');
              return;
            }
            
            // Show loading, hide results and errors
            document.getElementById('loading').style.display = 'block';
            document.getElementById('results').style.display = 'none';
            document.getElementById('error').style.display = 'none';
            document.getElementById('calculate-btn').disabled = true;
            
            try {
              const response = await fetch('/api/route', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ origin, destination })
              });
              
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.error || 'Erro ao calcular rota');
              }
              
              displayResults(data);
            } catch (error) {
              displayError(error.message);
            } finally {
              document.getElementById('loading').style.display = 'none';
              document.getElementById('calculate-btn').disabled = false;
            }
          }
          
          function displayResults(data) {
            const routeInfo = document.getElementById('route-info');
            const routeMap = document.getElementById('route-map');
            const routeSummary = document.getElementById('route-summary');
            
            routeInfo.innerHTML = \`
              <h3>Informações da Rota</h3>
              <p><strong>Origem:</strong> \${data.origin_name}</p>
              <p><strong>Destino:</strong> \${data.destination_name}</p>
              <p><strong>Distância:</strong> \${(data.distance / 1000).toFixed(1)} km</p>
              <p><strong>Tempo Estimado:</strong> \${Math.round(data.duration / 60)} minutos</p>
            \`;
            
            if (data.map_image_url) {
              routeMap.innerHTML = \`
                <h3>Mapa da Rota</h3>
                <img src="\${data.map_image_url}" alt="Mapa da rota" style="max-width: 100%; height: auto;" />
              \`;
            }
            
            if (data.summary) {
              routeSummary.innerHTML = \`
                <h3>Resumo da Rota</h3>
                <p>\${data.summary}</p>
              \`;
            }
            
            document.getElementById('results').style.display = 'block';
          }
          
          function displayError(message) {
            document.getElementById('error-message').textContent = message;
            document.getElementById('error').style.display = 'block';
          }
        `
      }} />

      <style jsx>{`
        main {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
        
        h1 {
          color: #333;
          text-align: center;
        }
        
        #route-form > div {
          margin: 1rem 0;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        
        input[type="text"] {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        button {
          background-color: #0070f3;
          color: white;
          padding: 0.8rem 2rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
        }
        
        button:hover {
          background-color: #0051cc;
        }
        
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        #loading {
          text-align: center;
          color: #666;
        }
        
        #results {
          margin-top: 2rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        
        #error {
          margin-top: 2rem;
          padding: 1rem;
          border: 1px solid #ff0000;
          border-radius: 8px;
          background-color: #ffe6e6;
          color: #cc0000;
        }
      `}</style>
    </div>
  );
}