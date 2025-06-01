# SkinSync 🎨

SkinSync is an AI-powered makeup recommendation platform that analyzes your skin tone, undertone, and features to provide personalized product suggestions. Using advanced facial analysis and machine learning, it helps you find the perfect makeup matches for your unique complexion.

## Features

- **Real-time Skin Analysis**: Capture your photo and get instant analysis of your:
  - Skin undertone (warm/cool/neutral)
  - Complexion type (fair to dark)
  - Skin characteristics

- **Smart Product Matching**: Get personalized recommendations for:
  - Foundation
  - Concealer
  - Compact Powder
  - Setting Powder
  - Blush
  - Highlighter

- **Privacy-First**: Your photos are analyzed instantly and never stored

- **Beautiful UI**: Modern, responsive interface with smooth animations

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Camera Integration**: React Webcam
- **Database**: Supabase
- **AI Analysis**: Custom Llama model via Edge Functions

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries and APIs
├── services/      # Business logic and services
├── store/         # Global state management
└── utils/         # Helper functions
```

## Database Schema

The application uses a Supabase database with the following main table:

### Products Table
- `id`: UUID (Primary Key)
- `category`: Product category
- `brand`: Brand name
- `name`: Product name
- `description`: Product description
- `color_name`: Color variant name
- `color_code`: Hex color code
- `undertone`: Skin undertone match
- `complexion`: Skin complexion match
- `purchase_url`: Product purchase link
- `image_url`: Product image URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning, modification, and distribution.

## Acknowledgments

- Icons by [Lucide React](https://lucide.dev)
- UI components inspired by modern design principles
- Face detection models from face-api.js