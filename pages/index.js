export default function Home() {
  return (
    <div>
      <head>
        <title>POC LangChain - Calculadora de Rotas</title>
        <meta name="description" content="POC para validação de integração LangChain com Google APIs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </head>

      <main className="container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="title">
              <i className="fas fa-route"></i>
              Calculadora de Rotas Inteligente
            </h1>
            <p className="subtitle">POC - LangChain + Google Maps + OpenAI + Supabase</p>
            <div className="tech-stack">
              <span className="tech-badge">Next.js</span>
              <span className="tech-badge">LangChain</span>
              <span className="tech-badge">OpenAI</span>
              <span className="tech-badge">Google Maps</span>
              <span className="tech-badge">Supabase</span>
            </div>
          </div>
        </header>

        {/* Main Form */}
        <section className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h2><i className="fas fa-map-marker-alt"></i> Calcular Nova Rota</h2>
              <p>Informe os pontos de origem e destino para calcular a melhor rota</p>
            </div>
            
            <form id="route-form" className="route-form">
              <div className="input-group">
                <label htmlFor="origin" className="input-label">
                  <i className="fas fa-play"></i>
                  Local de Partida
                </label>
                <input 
                  type="text" 
                  id="origin" 
                  name="origin" 
                  className="input-field"
                  placeholder="Ex: Avenida Paulista, São Paulo, SP"
                  required 
                />
                <span className="input-helper">Digite o endereço completo com cidade</span>
              </div>
              
              <div className="route-divider">
                <i className="fas fa-arrow-down"></i>
              </div>
              
              <div className="input-group">
                <label htmlFor="destination" className="input-label">
                  <i className="fas fa-flag-checkered"></i>
                  Local de Destino
                </label>
                <input 
                  type="text" 
                  id="destination" 
                  name="destination" 
                  className="input-field"
                  placeholder="Ex: Aeroporto Internacional de Guarulhos, SP"
                  required 
                />
                <span className="input-helper">Digite o endereço completo com cidade</span>
              </div>
              
              <button type="button" id="calculate-btn" className="calculate-btn">
                <i className="fas fa-route"></i>
                <span>Calcular Rota</span>
                <div className="btn-loader" style={{display: 'none'}}>
                  <i className="fas fa-spinner fa-spin"></i>
                </div>
              </button>
            </form>
          </div>
        </section>

        {/* Loading State */}
        <section id="loading" className="loading-section" style={{display: 'none'}}>
          <div className="loading-content">
            <div className="spinner">
              <div className="spinner-ring"></div>
              <i className="fas fa-car"></i>
            </div>
            <h3>Processando sua rota...</h3>
            <div className="loading-steps">
              <div className="step" data-step="places">
                <i className="fas fa-map-marker-alt"></i>
                <span>Localizando endereços</span>
              </div>
              <div className="step" data-step="directions">
                <i className="fas fa-route"></i>
                <span>Calculando rota</span>
              </div>
              <div className="step" data-step="ai">
                <i className="fas fa-brain"></i>
                <span>Gerando resumo inteligente</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section id="results" className="results-section" style={{display: 'none'}}>
          <div className="results-header">
            <h2><i className="fas fa-check-circle"></i> Rota Calculada</h2>
            <button id="new-route-btn" className="new-route-btn">
              <i className="fas fa-plus"></i> Nova Rota
            </button>
          </div>
          
          <div className="results-grid">
            {/* Route Info Card */}
            <div className="result-card route-info-card">
              <div className="card-header">
                <h3><i className="fas fa-info-circle"></i> Informações da Rota</h3>
              </div>
              <div className="card-content" id="route-info">
                {/* Dinamically populated */}
              </div>
            </div>

            {/* Map Card */}
            <div className="result-card map-card">
              <div className="card-header">
                <h3><i className="fas fa-map"></i> Visualização da Rota</h3>
              </div>
              <div className="card-content" id="route-map">
                {/* Dinamically populated */}
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="result-card summary-card">
              <div className="card-header">
                <h3><i className="fas fa-robot"></i> Resumo Inteligente</h3>
                <span className="ai-badge">IA</span>
              </div>
              <div className="card-content" id="route-summary">
                {/* Dinamically populated */}
              </div>
            </div>
          </div>
        </section>

        {/* Error State */}
        <section id="error" className="error-section" style={{display: 'none'}}>
          <div className="error-content">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Ops! Algo deu errado</h3>
            <p id="error-message">Mensagem de erro aqui</p>
            <button id="retry-btn" className="retry-btn">
              <i className="fas fa-redo"></i>
              Tentar Novamente
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p>
              <i className="fas fa-code"></i>
              Desenvolvido com Next.js, LangChain e APIs modernas
            </p>
            <div className="footer-links">
              <a href="https://github.com" target="_blank" rel="noopener">
                <i className="fab fa-github"></i> GitHub
              </a>
              <a href="#" onClick="showTechDetails()">
                <i className="fas fa-cog"></i> Detalhes Técnicos
              </a>
            </div>
          </div>
        </footer>

        {/* Tech Details Modal */}
        <div id="tech-modal" className="modal" style={{display: 'none'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h3><i className="fas fa-microchip"></i> Detalhes Técnicos</h3>
              <button className="modal-close" onClick="closeTechModal()">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="tech-detail">
                <h4>Pipeline de Processamento</h4>
                <ol>
                  <li><strong>Google Places API:</strong> Conversão de endereços para coordenadas</li>
                  <li><strong>Google Directions API:</strong> Cálculo de rota otimizada</li>
                  <li><strong>Supabase:</strong> Armazenamento de histórico e cache</li>
                  <li><strong>OpenAI GPT-4o mini:</strong> Geração de resumo inteligente</li>
                  <li><strong>LangChain:</strong> Orquestração do pipeline completo</li>
                </ol>
              </div>
              <div className="tech-detail">
                <h4>Tecnologias Frontend</h4>
                <ul>
                  <li>Next.js 14 com Pages Router</li>
                  <li>HTML5 + CSS3 + JavaScript Vanilla</li>
                  <li>Font Awesome Icons</li>
                  <li>Design Responsivo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Global state
          let isProcessing = false;
          let currentStep = 0;
          
          // DOM Elements
          const originInput = document.getElementById('origin');
          const destinationInput = document.getElementById('destination');
          const calculateBtn = document.getElementById('calculate-btn');
          const loadingSection = document.getElementById('loading');
          const resultsSection = document.getElementById('results');
          const errorSection = document.getElementById('error');
          
          // Initialize app when DOM is loaded
          document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            setupInputValidation();
          });
          
          function setupEventListeners() {
            // Main calculate button
            calculateBtn.addEventListener('click', calculateRoute);
            
            // Enter key support
            [originInput, destinationInput].forEach(input => {
              input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !isProcessing) {
                  calculateRoute();
                }
              });
            });
            
            // New route button
            document.getElementById('new-route-btn')?.addEventListener('click', resetForm);
            
            // Retry button
            document.getElementById('retry-btn')?.addEventListener('click', calculateRoute);
          }
          
          function setupInputValidation() {
            [originInput, destinationInput].forEach(input => {
              input.addEventListener('blur', validateInput);
              input.addEventListener('input', clearErrors);
            });
          }
          
          function validateInput(e) {
            const input = e.target;
            const value = input.value.trim();
            
            if (!value) {
              showInputError(input, 'Este campo é obrigatório');
              return false;
            }
            
            if (value.length < 3) {
              showInputError(input, 'Digite um endereço mais específico');
              return false;
            }
            
            clearInputError(input);
            return true;
          }
          
          function showInputError(input, message) {
            const group = input.closest('.input-group');
            group.classList.add('error');
            
            let errorElement = group.querySelector('.input-error');
            if (!errorElement) {
              errorElement = document.createElement('span');
              errorElement.className = 'input-error';
              group.appendChild(errorElement);
            }
            errorElement.textContent = message;
          }
          
          function clearInputError(input) {
            const group = input.closest('.input-group');
            group.classList.remove('error');
            const errorElement = group.querySelector('.input-error');
            if (errorElement) {
              errorElement.remove();
            }
          }
          
          function clearErrors() {
            document.querySelectorAll('.input-group.error').forEach(group => {
              group.classList.remove('error');
            });
            document.querySelectorAll('.input-error').forEach(error => {
              error.remove();
            });
          }
          
          async function calculateRoute() {
            if (isProcessing) return;
            
            const origin = originInput.value.trim();
            const destination = destinationInput.value.trim();
            
            // Validation
            if (!validateForm(origin, destination)) return;
            
            isProcessing = true;
            showLoading();
            hideOtherSections();
            
            try {
              // Animate loading steps
              animateLoadingSteps();
              
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
              
              await new Promise(resolve => setTimeout(resolve, 500)); // UX delay
              displayResults(data);
              
            } catch (error) {
              console.error('Route calculation error:', error);
              displayError(error.message);
            } finally {
              isProcessing = false;
              hideLoading();
            }
          }
          
          function validateForm(origin, destination) {
            let isValid = true;
            
            if (!origin) {
              showInputError(originInput, 'Local de partida é obrigatório');
              isValid = false;
            }
            
            if (!destination) {
              showInputError(destinationInput, 'Local de destino é obrigatório');
              isValid = false;
            }
            
            if (origin && destination && origin.toLowerCase() === destination.toLowerCase()) {
              showInputError(destinationInput, 'Destino deve ser diferente da origem');
              isValid = false;
            }
            
            return isValid;
          }
          
          function showLoading() {
            calculateBtn.disabled = true;
            calculateBtn.querySelector('span').style.display = 'none';
            calculateBtn.querySelector('.btn-loader').style.display = 'inline-block';
            loadingSection.style.display = 'block';
            currentStep = 0;
          }
          
          function hideLoading() {
            calculateBtn.disabled = false;
            calculateBtn.querySelector('span').style.display = 'inline';
            calculateBtn.querySelector('.btn-loader').style.display = 'none';
            loadingSection.style.display = 'none';
          }
          
          function hideOtherSections() {
            resultsSection.style.display = 'none';
            errorSection.style.display = 'none';
          }
          
          function animateLoadingSteps() {
            const steps = ['places', 'directions', 'ai'];
            
            const animateStep = (index) => {
              if (index < steps.length) {
                const stepElement = document.querySelector(\`[data-step="\${steps[index]}"]\`);
                stepElement.classList.add('active');
                
                setTimeout(() => {
                  stepElement.classList.add('completed');
                  animateStep(index + 1);
                }, 800);
              }
            };
            
            setTimeout(() => animateStep(0), 500);
          }
          
          function displayResults(data) {
            // Hide other sections
            hideOtherSections();
            hideLoading();
            
            // Populate route info
            displayRouteInfo(data);
            
            // Populate map
            displayRouteMap(data);
            
            // Populate AI summary
            displayRouteSummary(data);
            
            // Show results with animation
            resultsSection.style.display = 'block';
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          
          function displayRouteInfo(data) {
            const routeInfo = document.getElementById('route-info');
            const distanceKm = (data.distance / 1000).toFixed(1);
            const durationHours = Math.floor(data.duration / 3600);
            const durationMinutes = Math.floor((data.duration % 3600) / 60);
            
            let durationText = '';
            if (durationHours > 0) {
              durationText = \`\${durationHours}h \${durationMinutes}min\`;
            } else {
              durationText = \`\${durationMinutes} minutos\`;
            }
            
            routeInfo.innerHTML = \`
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-icon origin">
                    <i class="fas fa-play"></i>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Origem</span>
                    <span class="info-value">\${data.origin_name}</span>
                  </div>
                </div>
                
                <div class="info-item">
                  <div class="info-icon destination">
                    <i class="fas fa-flag-checkered"></i>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Destino</span>
                    <span class="info-value">\${data.destination_name}</span>
                  </div>
                </div>
                
                <div class="info-item">
                  <div class="info-icon distance">
                    <i class="fas fa-road"></i>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Distância</span>
                    <span class="info-value">\${distanceKm} km</span>
                  </div>
                </div>
                
                <div class="info-item">
                  <div class="info-icon duration">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div class="info-content">
                    <span class="info-label">Tempo Estimado</span>
                    <span class="info-value">\${durationText}</span>
                  </div>
                </div>
              </div>
            \`;
          }
          
          function displayRouteMap(data) {
            const routeMap = document.getElementById('route-map');
            
            if (data.map_image_url) {
              routeMap.innerHTML = \`
                <div class="map-container">
                  <img 
                    src="\${data.map_image_url}" 
                    alt="Mapa da rota de \${data.origin_name} até \${data.destination_name}"
                    class="route-map-image"
                    loading="lazy"
                  />
                  <div class="map-overlay">
                    <button class="map-fullscreen" onclick="openFullscreenMap('\${data.map_image_url}')">
                      <i class="fas fa-expand"></i>
                    </button>
                  </div>
                </div>
              \`;
            } else {
              routeMap.innerHTML = \`
                <div class="map-placeholder">
                  <i class="fas fa-map"></i>
                  <p>Mapa não disponível no momento</p>
                </div>
              \`;
            }
          }
          
          function displayRouteSummary(data) {
            const routeSummary = document.getElementById('route-summary');
            
            if (data.summary) {
              routeSummary.innerHTML = \`
                <div class="summary-content">
                  <div class="summary-text">
                    <i class="fas fa-quote-left"></i>
                    <p>\${data.summary}</p>
                  </div>
                  <div class="summary-footer">
                    <span class="summary-credit">
                      <i class="fas fa-brain"></i>
                      Gerado por IA (OpenAI GPT-4o mini)
                    </span>
                  </div>
                </div>
              \`;
            } else {
              routeSummary.innerHTML = \`
                <div class="summary-placeholder">
                  <i class="fas fa-robot"></i>
                  <p>Resumo inteligente não disponível</p>
                </div>
              \`;
            }
          }
          
          function displayError(message) {
            hideOtherSections();
            hideLoading();
            
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = message;
            
            errorSection.style.display = 'block';
            errorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          
          function resetForm() {
            // Clear inputs
            originInput.value = '';
            destinationInput.value = '';
            
            // Clear errors
            clearErrors();
            
            // Hide sections
            hideOtherSections();
            
            // Focus on origin input
            originInput.focus();
            
            // Scroll to form
            document.querySelector('.form-section').scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
          
          function openFullscreenMap(imageUrl) {
            const modal = document.createElement('div');
            modal.className = 'fullscreen-modal';
            modal.innerHTML = \`
              <div class="fullscreen-content">
                <img src="\${imageUrl}" alt="Mapa da rota em tela cheia" />
                <button class="fullscreen-close" onclick="this.parentElement.parentElement.remove()">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            \`;
            document.body.appendChild(modal);
          }
          
          function showTechDetails() {
            document.getElementById('tech-modal').style.display = 'flex';
          }
          
          function closeTechModal() {
            document.getElementById('tech-modal').style.display = 'none';
          }
          
          // Utility functions
          function formatDistance(meters) {
            if (meters < 1000) {
              return \`\${meters}m\`;
            }
            return \`\${(meters / 1000).toFixed(1)}km\`;
          }
          
          function formatDuration(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            
            if (hours > 0) {
              return \`\${hours}h \${minutes}min\`;
            }
            return \`\${minutes} minutos\`;
          }
        `
      }} />

      <style jsx>{`
        /* ===== RESET & BASE ===== */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        :root {
          --primary-color: #0070f3;
          --primary-dark: #0051cc;
          --secondary-color: #00d4aa;
          --success-color: #00c851;
          --warning-color: #ff8800;
          --error-color: #ff3333;
          --dark-color: #1a1a1a;
          --gray-100: #f8f9fa;
          --gray-200: #e9ecef;
          --gray-300: #dee2e6;
          --gray-400: #ced4da;
          --gray-500: #adb5bd;
          --gray-600: #6c757d;
          --gray-700: #495057;
          --gray-800: #343a40;
          --gray-900: #212529;
          --white: #ffffff;
          --border-radius: 12px;
          --border-radius-sm: 8px;
          --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          --box-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.15);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: var(--gray-800);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          min-height: 100vh;
        }
        
        /* ===== HEADER ===== */
        .header {
          text-align: center;
          margin-bottom: 3rem;
          color: var(--white);
        }
        
        .header-content {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: var(--border-radius);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        
        .title i {
          color: var(--secondary-color);
        }
        
        .subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }
        
        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
        }
        
        .tech-badge {
          background: rgba(255, 255, 255, 0.2);
          color: var(--white);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        /* ===== FORM SECTION ===== */
        .form-section {
          margin-bottom: 3rem;
        }
        
        .form-container {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 2rem;
          box-shadow: var(--box-shadow-lg);
          border: 1px solid var(--gray-200);
        }
        
        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .form-header h2 {
          color: var(--gray-800);
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .form-header h2 i {
          color: var(--primary-color);
        }
        
        .form-header p {
          color: var(--gray-600);
          font-size: 1rem;
        }
        
        .route-form {
          max-width: 500px;
          margin: 0 auto;
        }
        
        .input-group {
          margin-bottom: 2rem;
          position: relative;
        }
        
        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--gray-700);
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }
        
        .input-field {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid var(--gray-300);
          border-radius: var(--border-radius-sm);
          font-size: 1rem;
          transition: var(--transition);
          background: var(--white);
        }
        
        .input-field:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.1);
        }
        
        .input-helper {
          display: block;
          font-size: 0.875rem;
          color: var(--gray-500);
          margin-top: 0.5rem;
        }
        
        .input-group.error .input-field {
          border-color: var(--error-color);
        }
        
        .input-error {
          color: var(--error-color);
          font-size: 0.875rem;
          margin-top: 0.5rem;
          display: block;
        }
        
        .route-divider {
          text-align: center;
          margin: 1.5rem 0;
        }
        
        .route-divider i {
          color: var(--primary-color);
          font-size: 1.5rem;
        }
        
        .calculate-btn {
          width: 100%;
          background: linear-gradient(45deg, var(--primary-color), var(--primary-dark));
          color: var(--white);
          border: none;
          padding: 1.25rem 2rem;
          border-radius: var(--border-radius-sm);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          position: relative;
          overflow: hidden;
        }
        
        .calculate-btn:hover:not(:disabled) {
          background: linear-gradient(45deg, var(--primary-dark), var(--primary-color));
          transform: translateY(-2px);
          box-shadow: var(--box-shadow);
        }
        
        .calculate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .btn-loader {
          display: none;
        }
        
        /* ===== LOADING SECTION ===== */
        .loading-section {
          text-align: center;
          padding: 3rem 2rem;
          background: var(--white);
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          margin-bottom: 2rem;
        }
        
        .loading-content h3 {
          color: var(--gray-800);
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .spinner {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
        }
        
        .spinner-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 4px solid var(--gray-200);
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .spinner i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          color: var(--primary-color);
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .loading-steps {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: var(--border-radius-sm);
          transition: var(--transition);
          opacity: 0.5;
        }
        
        .step.active {
          opacity: 1;
          background: rgba(0, 112, 243, 0.1);
          color: var(--primary-color);
        }
        
        .step.completed {
          opacity: 1;
          background: rgba(0, 200, 81, 0.1);
          color: var(--success-color);
        }
        
        .step i {
          font-size: 1.5rem;
        }
        
        /* ===== RESULTS SECTION ===== */
        .results-section {
          margin-bottom: 3rem;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .results-header h2 {
          color: var(--white);
          font-size: 1.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .results-header h2 i {
          color: var(--success-color);
        }
        
        .new-route-btn {
          background: rgba(255, 255, 255, 0.2);
          color: var(--white);
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius-sm);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .new-route-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .result-card {
          background: var(--white);
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          overflow: hidden;
        }
        
        .card-header {
          background: var(--gray-100);
          padding: 1.5rem;
          border-bottom: 1px solid var(--gray-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .card-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-800);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .ai-badge {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: var(--white);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .card-content {
          padding: 2rem;
        }
        
        /* Route Info Card */
        .info-grid {
          display: grid;
          gap: 1.5rem;
        }
        
        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--gray-100);
          border-radius: var(--border-radius-sm);
        }
        
        .info-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: var(--white);
          flex-shrink: 0;
        }
        
        .info-icon.origin {
          background: linear-gradient(45deg, var(--success-color), #00a642);
        }
        
        .info-icon.destination {
          background: linear-gradient(45deg, var(--error-color), #cc0000);
        }
        
        .info-icon.distance {
          background: linear-gradient(45deg, var(--primary-color), var(--primary-dark));
        }
        
        .info-icon.duration {
          background: linear-gradient(45deg, var(--warning-color), #e67300);
        }
        
        .info-content {
          flex: 1;
          min-width: 0;
        }
        
        .info-label {
          display: block;
          font-size: 0.875rem;
          color: var(--gray-600);
          font-weight: 500;
        }
        
        .info-value {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--gray-800);
          word-wrap: break-word;
        }
        
        /* Map Card */
        .map-container {
          position: relative;
          text-align: center;
        }
        
        .route-map-image {
          width: 100%;
          height: auto;
          border-radius: var(--border-radius-sm);
          max-width: 100%;
        }
        
        .map-overlay {
          position: absolute;
          top: 1rem;
          right: 1rem;
        }
        
        .map-fullscreen {
          background: rgba(0, 0, 0, 0.7);
          color: var(--white);
          border: none;
          padding: 0.5rem;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          transition: var(--transition);
        }
        
        .map-fullscreen:hover {
          background: rgba(0, 0, 0, 0.9);
        }
        
        .map-placeholder {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--gray-500);
        }
        
        .map-placeholder i {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }
        
        /* Summary Card */
        .summary-content {
          position: relative;
        }
        
        .summary-text {
          position: relative;
          padding: 1rem 0;
        }
        
        .summary-text i {
          position: absolute;
          top: 0;
          left: 0;
          color: var(--primary-color);
          font-size: 1.5rem;
          opacity: 0.3;
        }
        
        .summary-text p {
          margin-left: 2rem;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--gray-700);
          font-style: italic;
        }
        
        .summary-footer {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--gray-200);
        }
        
        .summary-credit {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--gray-500);
        }
        
        .summary-placeholder {
          text-align: center;
          padding: 2rem 1rem;
          color: var(--gray-500);
        }
        
        .summary-placeholder i {
          font-size: 2rem;
          margin-bottom: 1rem;
          display: block;
        }
        
        /* ===== ERROR SECTION ===== */
        .error-section {
          text-align: center;
          padding: 3rem 2rem;
          background: var(--white);
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          margin-bottom: 2rem;
        }
        
        .error-content {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .error-icon {
          width: 80px;
          height: 80px;
          background: var(--error-color);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          font-size: 2rem;
        }
        
        .error-content h3 {
          color: var(--gray-800);
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .error-content p {
          color: var(--gray-600);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .retry-btn {
          background: var(--primary-color);
          color: var(--white);
          border: none;
          padding: 1rem 2rem;
          border-radius: var(--border-radius-sm);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .retry-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        /* ===== FOOTER ===== */
        .footer {
          margin-top: 4rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .footer-content {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: var(--border-radius);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .footer-content p {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }
        
        .footer-links a:hover {
          color: var(--white);
        }
        
        /* ===== MODALS ===== */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: var(--white);
          border-radius: var(--border-radius);
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--gray-200);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--gray-800);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .modal-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          color: var(--gray-500);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: var(--transition);
        }
        
        .modal-close:hover {
          background: var(--gray-100);
          color: var(--gray-700);
        }
        
        .modal-body {
          padding: 2rem;
        }
        
        .tech-detail {
          margin-bottom: 2rem;
        }
        
        .tech-detail h4 {
          color: var(--gray-800);
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        
        .tech-detail ol,
        .tech-detail ul {
          margin-left: 1.5rem;
        }
        
        .tech-detail li {
          margin-bottom: 0.5rem;
          color: var(--gray-600);
        }
        
        .fullscreen-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
        }
        
        .fullscreen-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }
        
        .fullscreen-content img {
          width: 100%;
          height: auto;
          border-radius: var(--border-radius-sm);
        }
        
        .fullscreen-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.25rem;
          color: var(--gray-800);
          transition: var(--transition);
        }
        
        .fullscreen-close:hover {
          background: var(--white);
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
          
          .title {
            font-size: 2rem;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .results-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          
          .results-grid {
            grid-template-columns: 1fr;
          }
          
          .loading-steps {
            flex-direction: column;
            gap: 1rem;
          }
          
          .footer-links {
            flex-direction: column;
            gap: 1rem;
          }
          
          .info-item {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
          
          .modal-content {
            width: 95%;
            margin: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .form-container {
            padding: 1.5rem;
          }
          
          .card-content {
            padding: 1.5rem;
          }
          
          .calculate-btn {
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}