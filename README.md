AKIKO : E-COMMERCE RECOMMENDATION SYSTEM ✨

AKIKO is a modern e-commerce recommendation system built with React, designed to provide users with personalized product suggestions based on their interactions. It features a sleek, responsive UI, dynamic product display, quick view options, and content-based recommendation logic implemented directly on the frontend using TF-IDF and Cosine Similarity.

Features 🚀

Product Catalog: Browse a simulated collection of electronic products. 📱

User Interaction Tracking: Add products to your "Style Palette" (interactions) to influence recommendations. ❤️

Favorite Products: Mark products as favorites for easy access. ⭐

Personalized Recommendations: Get dynamic product suggestions based on your interacted items. 🎁

Search & Filter: Easily find products by name, description, or category. 🔍

Quick View Modal: A modal to quickly view product details, add to cart, mark as favorite, and see related products without leaving the main page. 🛍️

Responsive Design: Optimized for various screen sizes (mobile, tablet, desktop). 📏

Toast Notifications: Provides real-time feedback for user actions. 🍞

Skeleton Loaders: Enhanced user experience during data loading. ⏳

Technologies Used 💻

React: Frontend library for building user interfaces. ⚛️

JavaScript: Core language for frontend logic and recommendation algorithm. 📜

HTML5 & CSS3: For structuring and styling the web application. 🎨

Tailwind CSS: Used for utility-first styling (in a standard setup, this would be configured). 💨

Font Awesome: For various icons used throughout the application. 🖼️

Custom TF-IDF & Cosine Similarity Implementation: The core recommendation logic is implemented directly in JavaScript on the frontend. 📊

Getting Started 🏁

Follow these steps to set up and run AKIKO on your local machine.

Prerequisites ✅

Node.js (LTS version recommended) and npm (Node Package Manager) 🟢

VS Code (or any other code editor) 📝

Installation ⬇️

Clone or Download the Project:

If you have a Git repository, clone it:

git clone <your-repository-url>

cd akiko-ecommerce-recommender



Otherwise, create a new React project:

npx create-react-app akiko-ecommerce-recommender

cd akiko-ecommerce-recommender



Install Dependencies:

Install the necessary React dependencies:

npm install



Install Tailwind CSS (if not already configured):

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p



Then, configure your tailwind.config.js to include your source files (usually src/**/*.{js,jsx,ts,tsx} and public/index.html). Also, add the Tailwind directives to your src/index.css file:

/* src/index.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add Google Fonts */

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
}



Copy the Application Code:

Replace the content of src/App.js (or src/App.jsx) with the provided React code from the Canvas. Ensure your src/index.js renders the App component correctly.

Running the Application ▶️

In the project directory, run:

npm start



This command runs the app in development mode.

Open http://localhost:3000 to view it in your browser.

The page will automatically reload if you make edits.

You will also see any lint errors in the console.

Project Structure 🏗️

The project is structured as a single React component (App.js) for simplicity, with internal CSS for styling.

App.js: Contains the main application logic, state management, and renders all components.

ProductCard Component: Displays individual product information. 🖼️

ProductQuickViewModal Component: Handles the modal display for detailed product view. 👁️

SkeletonCard Component: Placeholder for loading product cards. 💀

Toast Component: For displaying temporary notification messages. 💬

ProductRecommenderJS Class: Implements the TF-IDF vectorization and Cosine Similarity for content-based recommendations. 🧠

Recommendation Logic 💡

The recommendation system is content-based, meaning it recommends products similar to those a user has interacted with (e.g., clicked, viewed).

TF-IDF Vectorization: Product features (category, description, name, rating, reviews) are combined into a single text document for each product. A custom TfidfVectorizerJS then converts these text documents into numerical TF-IDF vectors. Stop words are removed during preprocessing. 🔢

Cosine Similarity: When a user interacts with a product, the system calculates the cosine similarity between that product's TF-IDF vector and all other products' vectors. 📐

Aggregated Recommendations: If a user interacts with multiple products, the similarity scores for potential recommendations are aggregated. Products with higher aggregated similarity scores (and that the user hasn't already interacted with) are then recommended. 📈

Fallback: If no interactions are recorded for a user or no new recommendations can be found, the system defaults to showing the highest-rated or most-reviewed products as a "popular products" fallback. 🔄

Simulated Data 🧪

The productsData array in App.js simulates an e-commerce product catalog. In a real-world application, this data would typically be fetched from a backend API or a database. 💾

Getting Started with Create React App ⚛️

This project was bootstrapped with Create React App.

Available Scripts ⚙️

In the project directory, you can run:

npm start 🟢

Runs the app in the development mode.

Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.

You may also see any lint errors in the console.

npm test 🧪

Launches the test runner in the interactive watch mode.

See the section about running tests for more information.

npm run build 📦

Builds the app for production to the build folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed! 🚀

See the section about deployment for more information.

npm run eject eject ↩️

Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Learn More 📚

You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Code Splitting ✂️

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size 🔍

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App 🌐

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration 🛠️

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment ☁️

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify ⚠️

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify