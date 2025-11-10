# Copilot Instructions for poc-langchain

## Project Overview
This is a proof-of-concept (POC) for validating minimal integration between LangChain, Google Places/Directions APIs, OpenAI, Supabase, and AWS. The project demonstrates a simple route calculation system with AI-generated summaries.

## Architecture & Tech Stack
- **Frontend**: HTML + Vanilla JS (no frameworks, no Tailwind)
- **Backend**: Next.js API Routes
- **Orchestration**: LangChain (Google APIs + OpenAI)
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4o mini
- **Maps**: Google Places API + Directions API + Static Maps API
- **Deploy**: Vercel (frontend + backend) + AWS

## Key Development Patterns

### Project Structure
```
poc-langchain/
├── pages/
│   ├── api/
│   │   └── route.js          # Main API endpoint for route calculation
│   └── index.js              # Simple HTML page with form
├── lib/
│   ├── langchain/
│   │   └── routeChain.js     # LangChain orchestration logic
│   ├── google/
│   │   ├── places.js         # Google Places API integration
│   │   ├── directions.js     # Google Directions API integration
│   │   └── staticMaps.js     # Google Static Maps API integration
│   ├── supabase/
│   │   └── client.js         # Supabase client and operations
│   └── openai/
│       └── summary.js        # OpenAI integration for route summaries
├── public/
│   └── index.html            # Simple frontend (no React)
├── .env.example              # Environment variables template
└── README.md                 # Setup and usage instructions
```

### Critical Data Flow
The application follows this specific sequence:
1. **User Input** → HTML form (origin/destination text inputs)
2. **API Call** → `/api/route` endpoint with location strings
3. **LangChain Pipeline**:
   - Google Places API → coordinate resolution
   - Google Directions API → route calculation (distance, duration, polyline)
   - Supabase → store input/output for cache/history
   - OpenAI → generate descriptive route summary
4. **Response** → JSON with `{origin_name, destination_name, distance, duration, map_image_url, summary}`
5. **Frontend Update** → Display results without page reload

### Environment Variables
```bash
GOOGLE_MAPS_API_KEY=your_key_here
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=your_openai_key
```

### Google APIs Integration
- **Places API**: Convert text inputs to coordinates within city boundaries
- **Directions API**: Calculate driving routes (distance, time, polyline)
- **Static Maps API**: Generate map image URLs or use polylines for display
- **Error Handling**: Graceful fallbacks for location not found scenarios

### Supabase Schema
Expected table structure for route history:
```sql
CREATE TABLE route_history (
  id SERIAL PRIMARY KEY,
  origin_input TEXT,
  destination_input TEXT,
  origin_name TEXT,
  destination_name TEXT,
  distance INTEGER,
  duration INTEGER,
  polyline TEXT,
  summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### LangChain Chain Design
The core orchestration follows this pattern:
```javascript
// Sequential chain execution
const routeChain = async (originText, destinationText) => {
  // 1. Places API calls (parallel)
  const [originCoords, destCoords] = await Promise.all([
    getPlaceCoordinates(originText),
    getPlaceCoordinates(destinationText)
  ]);
  
  // 2. Directions API call
  const routeData = await getDirections(originCoords, destCoords);
  
  // 3. Supabase storage
  await storeRouteHistory({...routeData, originText, destinationText});
  
  // 4. OpenAI summary generation
  const summary = await generateRouteSummary(routeData);
  
  return { ...routeData, summary };
};
```

### Frontend Constraints
- **No Frameworks**: Pure HTML + Vanilla JavaScript only
- **Simple Form**: Origin/destination inputs + "Calcular Rota" button
- **Results Display**: Show all results only after complete processing
- **Map Integration**: Use Google Static Maps URLs or render polylines

## Development Workflow
1. **Setup**: Configure Next.js project with API routes
2. **API Testing**: Test Google APIs and Supabase connections independently
3. **Chain Implementation**: Build LangChain orchestration step by step
4. **Frontend Integration**: Connect HTML form to API endpoint
5. **Deploy**: Vercel deployment with environment variables

## Common Commands
```bash
# Setup Next.js project
npx create-next-app@latest poc-langchain --no-src-dir --no-app
cd poc-langchain

# Install dependencies
npm install langchain @langchain/openai @supabase/supabase-js @googlemaps/google-maps-services-js

# Development server
npm run dev

# Deploy to Vercel
vercel --prod
```

## Testing Strategy
- **API Endpoints**: Test `/api/route` with various city inputs
- **Google APIs**: Validate coordinate resolution and route calculations
- **Supabase**: Verify data storage and retrieval
- **Error Scenarios**: Handle invalid locations, API failures, rate limits

## Notes for AI Assistants
- Keep frontend simple - no React components or modern frameworks
- Focus on sequential API calls rather than complex LangChain chains
- Prioritize error handling for external API dependencies
- Store complete route data for potential caching/replay functionality
- Generate meaningful route summaries that add value beyond raw data