import React from 'react';

const Card = ({ data, handleBookmark, isBookmarked }) => {
  return (
    <div className='cardContainer'>
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) return null;

        return (
          <div
            className='card'
            key={index}
          >
            <div className="card-image-container">
              <img src={curItem.urlToImage} alt={curItem.title} />
              <div className="card-overlay">
                <span className="card-category">News</span>
              </div>
            </div>
            <div className='content'>
              <a
                href={curItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                style={{ cursor: 'pointer' }}
              >
                {curItem.title}
              </a>
              <p>{curItem.description}</p>
              <div className="card-footer">
                <div className="card-meta">
                  <span className="publish-date">
                    {new Date(curItem.publishedAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="source">{curItem.source.name}</span>
                </div>
                <button
                  onClick={() => handleBookmark(curItem.url)}
                  className={isBookmarked[curItem.url] ? 'bookmarked' : ''}
                >
                  <span className="bookmark-icon">
                    {isBookmarked[curItem.url] ? '★' : '☆'}
                  </span>
                  <span className="bookmark-text">
                    {isBookmarked[curItem.url] ? 'Saved' : 'Save'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
