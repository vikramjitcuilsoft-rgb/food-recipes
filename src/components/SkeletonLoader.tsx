// components/SkeletonLoader.js
import '../styles/skeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="container">
      {/* Country List Section */}
      <div className="country-section">
        <div className="skeleton skeleton-title"></div>
        <div className="country-list">
          <div className="country-column">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="skeleton country-item"></div>
            ))}
          </div>
          <div className="country-column">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="skeleton country-item"></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recipe Section */}
      <div className="recipe-section">
        <div className="skeleton recipe-title"></div>
        <div className="recipe-meta">
          <div className="skeleton meta-item"></div>
          <div className="skeleton meta-item"></div>
        </div>
        
        <div className="skeleton section-subtitle"></div>
        <div className="ingredients-list">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="skeleton ingredient-item"></div>
          ))}
        </div>
        
        <div className="skeleton section-subtitle"></div>
        <div className="instructions-list">
          {Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={index} 
              className="skeleton instruction-item"
              style={{ width: `${100 - (index * 5)}%` }}
            ></div>
          ))}
        </div>
        
        <div className="skeleton video-placeholder"></div>
      </div>
      
      {/* Latest Meals Section */}
      <div className="latest-section">
        <div className="skeleton skeleton-title"></div>
        <div className="latest-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton latest-item"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;