Create a responsive web application for personalized makeup product recommendations using facial analysis. The name of the app is "SkinSync". 

The app should:

Frontend Requirements:
- Implement a single-page architecture (SPA) using React or Vue.js
- Design a modern, minimalist UI with flat colors and dark mode support
- Ensure cross-browser compatibility, especially for iOS Safari and Android Chrome
- Use CSS Grid/Flexbox for responsive layouts
- Implement smooth transitions and animations

Camera Integration:
- Access device camera using WebRTC API
- Create a centered face-capture frame with guidelines
- Implement real-time face detection to ensure proper positioning
- Add a capture button with haptic feedback

Analysis Animation:
- Display an engaging "scanning" overlay animation on the captured face
- Show a progress indicator with particle effects
- Include subtle sound effects for enhanced user experience
- Implement smooth transitions between capture and results

Product Database:
- Use supabase as the database
- Create a structured JSON database containing:
  - Product categories: Foundation, Concealer, Compact Powder, Setting Powder, Blush, Highlighter
  - For each product: Brand, Name, Color codes, Price, Purchase URL, Image URL
  - Minimum 10 popular brands with their complete color ranges
  - Color matching metadata for AI analysis

AI Integration:
- Connect to Meta's LLaMA API for color analysis
- Implement color matching algorithm considering:
  - Skin undertone
  - Face complexion
  - Product color ranges
- Return top 3 recommendations per category

Results Display:
- Show recommendations in swipeable cards
- Include product images, descriptions, and prices
- Implement "Try On" AR feature if possible
- Add "Purchase" buttons that open product URLs in new tabs

Technical Requirements:
- Implement proper error handling for camera/API failures
- Ensure secure API communications
- Optimize image processing for mobile devices
- Cache product data for offline functionality
- Implement analytics for user interactions

Accessibility:
- Support screen readers
- Implement keyboard navigation
- Maintain WCAG 2.1 compliance
- Provide clear visual feedback

Performance Targets:
- Initial load under 3 seconds
- Camera initialization under 1 second
- Analysis completion under 5 seconds
- 60fps animations
