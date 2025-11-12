import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>POC LangChain - Calculadora de Rotas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
            40%, 43% { transform: translate3d(0, -20px, 0); }
            70% { transform: translate3d(0, -10px, 0); }
            90% { transform: translate3d(0, -4px, 0); }
          }
          
          @keyframes pulse {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
          
          @media (max-width: 768px) {
            .route-grid { 
              grid-template-columns: 1fr !important; 
              gap: 1rem !important; 
            }
            .metrics-grid { 
              grid-template-columns: 1fr !important; 
            }
            .actions-flex {
              flex-direction: column !important;
            }
          }
        `}</style>
      </Head>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "2rem"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <header style={{
            textAlign: "center",
            marginBottom: "3rem",
            background: "rgba(255, 255, 255, 0.2)",
            padding: "2rem",
            borderRadius: "16px"
          }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              🚀 Calculadora de Rotas Premium
            </h1>
            <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
              POC • LangChain + Google Maps + OpenAI + Supabase
            </p>
          </header>

          <section style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: "2rem",
            borderRadius: "16px",
            marginBottom: "2rem"
          }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
              📍 Calcular Nova Rota
            </h2>
            
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                  🟢 Local de Partida
                </label>
                <input
                  id="origin"
                  type="text"
                  placeholder="Ex: Avenida Paulista, São Paulo, SP"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    fontSize: "1rem",
                    border: "2px solid rgba(255, 255, 255, 0.5)",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{
                textAlign: "center",
                fontSize: "2rem",
                margin: "1.5rem 0"
              }}>
                ⬇️
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
                  🏁 Local de Destino
                </label>
                <input
                  id="destination"
                  type="text"
                  placeholder="Ex: Aeroporto Internacional de Guarulhos, SP"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    fontSize: "1rem",
                    border: "2px solid rgba(255, 255, 255, 0.5)",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <button
                id="calculate-btn"
                type="button"
                style={{
                  width: "100%",
                  padding: "1.2rem 2rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "white",
                  background: "linear-gradient(45deg, #4CAF50, #45a049)",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                🚀 Calcular Rota Premium
              </button>
            </div>
          </section>

          <section id="loading" style={{
            display: "none",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.2)",
            padding: "3rem 2rem",
            borderRadius: "16px",
            marginBottom: "2rem"
          }}>
            <div style={{ 
              fontSize: "4rem", 
              marginBottom: "1rem",
              animation: "bounce 2s infinite"
            }}>🚗</div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              Processando sua rota...
            </h3>
            <div style={{ 
              fontSize: "0.95rem", 
              opacity: 0.8,
              marginBottom: "2rem"
            }}>
              Estamos calculando a melhor rota para você
            </div>
            
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem"
            }}>
              <div style={{
                width: "10px",
                height: "10px",
                backgroundColor: "#4CAF50",
                borderRadius: "50%",
                animation: "pulse 1.4s ease-in-out infinite both",
                animationDelay: "-0.32s"
              }}></div>
              <div style={{
                width: "10px", 
                height: "10px",
                backgroundColor: "#2196F3",
                borderRadius: "50%",
                animation: "pulse 1.4s ease-in-out infinite both",
                animationDelay: "-0.16s"
              }}></div>
              <div style={{
                width: "10px",
                height: "10px", 
                backgroundColor: "#FF9800",
                borderRadius: "50%",
                animation: "pulse 1.4s ease-in-out infinite both"
              }}></div>
            </div>

            <div style={{
              fontSize: "0.85rem",
              opacity: "0.6",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem"
            }}>
              <div>✓ Conectando com Google Maps...</div>
              <div>✓ Analisando tráfego em tempo real...</div>
              <div>✓ Gerando insights com IA...</div>
            </div>
          </section>

          <section id="results" style={{
            display: "none",
            background: "rgba(255, 255, 255, 0.2)",
            padding: "2rem",
            borderRadius: "16px",
            marginBottom: "2rem"
          }}>
            <div style={{ 
              textAlign: "center", 
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "2px solid rgba(255, 255, 255, 0.2)"
            }}>
              <h2 style={{ 
                fontSize: "2rem", 
                margin: "0 0 0.5rem 0",
                background: "linear-gradient(135deg, #4CAF50, #2196F3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                ✅ Rota Otimizada
              </h2>
              <p style={{ 
                margin: 0, 
                opacity: 0.8, 
                fontSize: "1rem" 
              }}>
                Análise completa da sua viagem
              </p>
            </div>
            <div id="route-details"></div>
          </section>

          <section id="error" style={{
            display: "none",
            textAlign: "center",
            background: "rgba(255, 0, 0, 0.2)",
            padding: "2rem",
            borderRadius: "16px",
            marginBottom: "2rem"
          }}>
            <h3>⚠️ Erro</h3>
            <p id="error-message"></p>
            <button id="retry-btn" style={{
              padding: "0.8rem 1.5rem",
              background: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}>
              🔄 Tentar Novamente
            </button>
          </section>

        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener("DOMContentLoaded", function() {
            
            async function calculateRoute() {
              const origin = document.getElementById("origin").value.trim();
              const destination = document.getElementById("destination").value.trim();
              
              if (!origin || !destination) {
                alert("Por favor, preencha os dois campos!");
                return;
              }

              document.getElementById("loading").style.display = "block";
              document.getElementById("results").style.display = "none";
              document.getElementById("error").style.display = "none";

              try {
                const response = await fetch("/api/route", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ origin, destination }),
                });

                const data = await response.json();
                
                setTimeout(() => {
                  document.getElementById("loading").style.display = "none";
                  
                  if (data.error) {
                    document.getElementById("error-message").textContent = data.error;
                    document.getElementById("error").style.display = "block";
                  } else {
                    displayResults(data);
                  }
                }, 2000);

              } catch (error) {
                console.error("Erro:", error);
                document.getElementById("loading").style.display = "none";
                document.getElementById("error-message").textContent = "Erro de conexão!";
                document.getElementById("error").style.display = "block";
              }
            }

            function formatDistance(meters) {
              if (!meters) return "Não disponível";
              const km = (meters / 1000).toFixed(1);
              return \`\${km} km\`;
            }

            function formatDuration(seconds) {
              if (!seconds) return "Não disponível";
              const hours = Math.floor(seconds / 3600);
              const minutes = Math.floor((seconds % 3600) / 60);
              
              if (hours > 0) {
                return \`\${hours}h \${minutes}min\`;
              }
              return \`\${minutes} minutos\`;
            }

            function formatLocation(location) {
              if (!location) return "Não informado";
              // Limitar o tamanho do endereço para melhor UX
              if (location.length > 60) {
                return location.substring(0, 57) + "...";
              }
              return location;
            }

            function displayResults(data) {
              const details = document.getElementById("route-details");
              
              // Obter os valores originais dos inputs para uso no Google Maps
              const originInput = document.getElementById("origin").value.trim();
              const destinationInput = document.getElementById("destination").value.trim();
              
              // Criar cards visuais para melhor apresentação
              details.innerHTML = \`
                <!-- Localizações -->
                <div class="route-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                  <div style="background: rgba(76, 175, 80, 0.2); padding: 1.2rem; border-radius: 12px; border-left: 4px solid #4CAF50;">
                    <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                      <span style="font-size: 1.5rem; margin-right: 0.5rem;">🟢</span>
                      <strong style="color: #E8F5E8;">ORIGEM</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.4; font-size: 0.95rem; opacity: 0.95;">
                      \${formatLocation(data.origin_name)}
                    </p>
                  </div>
                  
                  <div style="background: rgba(255, 107, 107, 0.2); padding: 1.2rem; border-radius: 12px; border-left: 4px solid #FF6B6B;">
                    <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                      <span style="font-size: 1.5rem; margin-right: 0.5rem;">🏁</span>
                      <strong style="color: #FFE8E8;">DESTINO</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.4; font-size: 0.95rem; opacity: 0.95;">
                      \${formatLocation(data.destination_name)}
                    </p>
                  </div>
                </div>

                <!-- Métricas da Rota -->
                <div class="metrics-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                  <div style="text-align: center; background: rgba(255, 255, 255, 0.15); padding: 1.5rem; border-radius: 16px; backdrop-filter: blur(10px);">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">📏</div>
                    <div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.3rem; color: #FFE135;">
                      \${formatDistance(data.distance_meters || data.distance)}
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">
                      Distância Total
                    </div>
                  </div>
                  
                  <div style="text-align: center; background: rgba(255, 255, 255, 0.15); padding: 1.5rem; border-radius: 16px; backdrop-filter: blur(10px);">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">⏱️</div>
                    <div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 0.3rem; color: #64B5F6;">
                      \${formatDuration(data.duration_seconds || data.duration)}
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">
                      Tempo Estimado
                    </div>
                  </div>
                </div>

                <!-- Resumo da IA -->
                \${data.summary ? \`
                  <div style="
                    background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%);
                    border: 1px solid rgba(255,255,255,0.3);
                    border-radius: 16px;
                    padding: 2rem;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                    margin-top: 1rem;
                    position: relative;
                    overflow: hidden;
                  ">
                    <div style="position: absolute; top: -2px; left: -2px; right: -2px; height: 4px; background: linear-gradient(90deg, #4CAF50, #2196F3, #FF9800, #4CAF50); border-radius: 16px 16px 0 0;"></div>
                    
                    <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                      <div style="
                        width: 48px; 
                        height: 48px; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                        margin-right: 1rem;
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
                      ">🤖</div>
                      <div>
                        <h3 style="margin: 0; font-size: 1.2rem; font-weight: 700; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                          Análise Inteligente da Rota
                        </h3>
                        <p style="margin: 0; font-size: 0.85rem; opacity: 0.7; margin-top: 0.2rem;">
                          Powered by OpenAI GPT-4o mini
                        </p>
                      </div>
                    </div>
                    
                    <div style="
                      background: rgba(255,255,255,0.1);
                      border-radius: 12px;
                      padding: 1.5rem;
                      border-left: 4px solid #4CAF50;
                    ">
                      <p style="
                        margin: 0; 
                        line-height: 1.7; 
                        font-size: 1rem;
                        text-align: justify;
                        text-justify: inter-word;
                      ">\${data.summary}</p>
                    </div>
                  </div>
                \` : \`
                  <div style="
                    text-align: center; 
                    padding: 2rem; 
                    background: rgba(255,152,0,0.1); 
                    border-radius: 12px; 
                    border-left: 4px solid #FF9800;
                    margin-top: 1rem;
                  ">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">🤖</div>
                    <p style="margin: 0; opacity: 0.8;">
                      Resumo inteligente sendo processado...
                    </p>
                  </div>
                \`}

                <!-- Ações Rápidas -->
                <div class="actions-flex" style="display: flex; gap: 1rem; margin-top: 2rem; justify-content: center;">
                  <button onclick="openGoogleMaps('\${originInput}', '\${destinationInput}')" 
                    style="
                      background: linear-gradient(45deg, #4CAF50, #45a049);
                      color: white;
                      border: none;
                      padding: 0.8rem 1.5rem;
                      border-radius: 8px;
                      font-weight: 600;
                      cursor: pointer;
                      transition: all 0.3s ease;
                      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(76, 175, 80, 0.4)';"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(76, 175, 80, 0.3)';"
                  >
                    🗺️ Abrir no Google Maps
                  </button>
                  
                  <button onclick="document.getElementById('origin').value=''; document.getElementById('destination').value=''; document.getElementById('results').style.display='none';" 
                    style="
                      background: rgba(255, 255, 255, 0.2);
                      color: white;
                      border: 1px solid rgba(255, 255, 255, 0.3);
                      padding: 0.8rem 1.5rem;
                      border-radius: 8px;
                      font-weight: 600;
                      cursor: pointer;
                      transition: all 0.3s ease;
                    "
                    onmouseover="this.style.background='rgba(255, 255, 255, 0.3)';"
                    onmouseout="this.style.background='rgba(255, 255, 255, 0.2)';"
                  >
                    🔄 Nova Consulta
                  </button>
                </div>
              \`;
              document.getElementById("results").style.display = "block";
            }

            // Função para abrir Google Maps com redirect confiável
            function openGoogleMaps(origin, destination) {
              // Usar formato de query parameters para melhor compatibilidade
              const baseUrl = 'https://www.google.com/maps/dir/';
              const fullUrl = baseUrl + '?api=1&origin=' + encodeURIComponent(origin) + '&destination=' + encodeURIComponent(destination) + '&travelmode=driving';
              
              console.log('Abrindo Google Maps:', fullUrl);
              window.open(fullUrl, '_blank');
            }

            document.getElementById("calculate-btn").addEventListener("click", calculateRoute);
            document.getElementById("retry-btn").addEventListener("click", calculateRoute);
            
            document.addEventListener("keypress", (e) => {
              if (e.key === "Enter" && (e.target.id === "origin" || e.target.id === "destination")) {
                calculateRoute();
              }
            });
          });
        `
      }} />
    </>
  );
}
