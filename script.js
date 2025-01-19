document.addEventListener('DOMContentLoaded', async () => {
  const moviesContainer = document.getElementById('movies');
  const searchResultsContainer = document.getElementById('search-results');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerText = 'Loading...';
  document.body.appendChild(loader);

  const apiKey = '4894504f5229b6f5635dc54350d77694';

  const categories = [
    { name: 'Trending Movies', endpoint: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}` },
    { name: 'Trending TV Shows', endpoint: `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}` },
  { name: 'Popular Movies', endpoint: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1` },
  { name: 'Popular TV Shows', endpoint: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1` },
  { name: 'Top Rated Movies', endpoint: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1` },
  { name: 'Top Rated TV Shows', endpoint: `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1` },
  { name: 'Action Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28` },
  { name: 'Action TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10759` },
  { name: 'Adventure Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=12` },
  { name: 'Adventure TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10759` },
  { name: 'Animation Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16` },
  { name: 'Animation TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=16` },
  { name: 'Comedy Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35` },
  { name: 'Comedy TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=35` },
  { name: 'Crime Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=80` },
  { name: 'Crime TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=80` },
  { name: 'Documentary Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=99` },
  { name: 'Documentary TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=99` },
  { name: 'Drama Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18` },
  { name: 'Drama TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=18` },
  { name: 'Family Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10751` },
  { name: 'Family TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10751` },
  { name: 'Fantasy Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=14` },
  { name: 'Fantasy TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10765` },
  { name: 'History Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=36` },
  { name: 'History TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=36` },
  { name: 'Horror Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27` },
  { name: 'Music Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10402` },
  { name: 'Mystery Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=9648` },
  { name: 'Mystery TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=9648` },
  { name: 'Romance Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749` },
  { name: 'Romance TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10749` },
  { name: 'Science Fiction Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878` },
  { name: 'Science Fiction TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10765` },
  { name: 'Thriller Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53` },
  { name: 'War Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10752` },
  { name: 'Western Movies', endpoint: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=37` },
  { name: 'Western TV Shows', endpoint: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=37` }
  ];

  const showLoader = () => {
    loader.style.display = 'block';
  };

  const hideLoader = () => {
    loader.style.display = 'none';
  };

  const createMovieCard = (item, isMovie) => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';

    const img = document.createElement('img');
    img.src = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '';
    img.alt = item.title || item.name;
    movieElement.appendChild(img);

    movieElement.onclick = async (event) => {
      const rect = event.target.getBoundingClientRect();
      if (isMovie) {
        window.location.href = `https://embed.su/embed/movie/${item.id}`;
      } else {
        await showTvSeasons(item, rect);
      }
    };

    return movieElement;
  };

  const showTvSeasons = async (tvItem, rect) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${tvItem.id}?api_key=${apiKey}`);
      const tvData = await response.json();

      const seasons = tvData.seasons || [];
      const seasonWindow = document.createElement('div');
      seasonWindow.className = 'season-window';
      seasonWindow.style.backgroundColor = 'black';  // Make background black

      seasonWindow.innerHTML = `
        <h3 style="color: white;">${tvItem.name}</h3>
        <button class="close-btn" style="background-color: black; color: white;">Close</button>
      `;

      const closeButton = seasonWindow.querySelector('.close-btn');
      closeButton.onclick = () => {
        seasonWindow.remove();
      };

      seasonWindow.style.position = 'absolute';
      seasonWindow.style.top = `${rect.top + window.scrollY}px`;
      seasonWindow.style.left = `${rect.right + 10}px`;

      seasons.forEach((season) => {
        const seasonButton = document.createElement('button');
        seasonButton.className = 'season-btn';
        seasonButton.style.backgroundColor = 'black';  // Make buttons black
        seasonButton.style.color = 'white';  // Make button text white
        seasonButton.innerText = season.name;

        // Add purple hover effect to buttons
        seasonButton.onmouseover = () => {
          seasonButton.style.backgroundColor = '#6A1B9A';  // Purple color on hover
        };
        seasonButton.onmouseout = () => {
          seasonButton.style.backgroundColor = 'black';  // Revert to black on mouse out
        };
        
        seasonButton.onclick = async () => {
          await showEpisodes(tvItem.id, season.season_number, seasonWindow);
        };
        seasonWindow.appendChild(seasonButton);
      });

      document.body.appendChild(seasonWindow);
    } catch (error) {
      console.error('Error fetching TV seasons:', error);
    }
  };

  const showEpisodes = async (tvId, seasonNumber, seasonWindow) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${apiKey}`
      );
      const seasonData = await response.json();

      const episodes = seasonData.episodes || [];
      const episodeList = document.createElement('div');
      episodeList.className = 'episode-list';

      episodeList.innerHTML = `<h4 style="color: white;">Episodes</h4>`;
      episodes.forEach((episode) => {
        const episodeElement = document.createElement('div');
        episodeElement.innerHTML = `
          <p style="color: white;">Episode ${episode.episode_number}: ${episode.name}</p>
          <button class="watch-btn" style="background-color: black; color: white;">Watch</button>
        `;

        const watchButton = episodeElement.querySelector('.watch-btn');
        watchButton.onclick = () => {
          const embedUrl = `https://embed.su/embed/tv/${tvId}/${seasonNumber}/${episode.episode_number}`;
          window.open(embedUrl, '_blank');
        };

        episodeList.appendChild(episodeElement);
      });

      const existingEpisodeList = seasonWindow.querySelector('.episode-list');
      if (existingEpisodeList) existingEpisodeList.remove();

      seasonWindow.appendChild(episodeList);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const handleSearch = async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    searchResultsContainer.innerHTML = '';
    try {
      showLoader();
      const searchEndpoint = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&api_key=${apiKey}`;
      const response = await fetch(searchEndpoint);
      const data = await response.json();

      const results = data.results || [];
      if (results.length === 0) {
        searchResultsContainer.innerHTML = `<p>No results found.</p>`;
        return;
      }

      results.forEach((item) => {
        const isMovie = !!item.title;
        const movieCard = createMovieCard(item, isMovie);
        searchResultsContainer.appendChild(movieCard);
      });
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      hideLoader();
    }
  };

  const fetchAndDisplayCategories = async () => {
    for (const category of categories) {
      const section = document.createElement('section');
      section.className = 'category';
      section.innerHTML = `
        <h2>${category.name}</h2>
        <div class="scroll-container">
          <button class="scroll-btn left-btn">◀</button>
          <div class="movies"></div>
          <button class="scroll-btn right-btn">▶</button>
        </div>
      `;

      const categoryContainer = section.querySelector('.movies');
      moviesContainer.appendChild(section);

      try {
        showLoader();
        const response = await fetch(category.endpoint);
        const data = await response.json();

        const items = data.results || [];
        items.forEach((item) => {
          const isMovie = !!item.title;
          const movieCard = createMovieCard(item, isMovie);
          categoryContainer.appendChild(movieCard);
        });
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        hideLoader();
      }

      const leftButton = section.querySelector('.left-btn');
      const rightButton = section.querySelector('.right-btn');

      leftButton.onclick = () => {
        categoryContainer.scrollBy({ left: -300, behavior: 'smooth' });
      };

      rightButton.onclick = () => {
        categoryContainer.scrollBy({ left: 300, behavior: 'smooth' });
      };
    }
  };

  // Handle search toggle
  const toggleButton = document.getElementById('toggle-search-results');
  
  // Ensure the elements exist
  if (!toggleButton || !searchResultsContainer || !moviesContainer) {
    console.error('Missing required elements in the HTML.');
    return;
  }

  toggleButton.addEventListener('click', () => {
    if (searchResultsContainer.style.display === 'none' || !searchResultsContainer.style.display) {
      // Show search results and hide categories
      searchResultsContainer.style.display = 'block';
      moviesContainer.style.display = 'none';
    } else {
      // Hide search results and show categories
      searchResultsContainer.style.display = 'none';
      moviesContainer.style.display = 'block';
    }
  });

  searchButton.addEventListener('click', handleSearch);
  await fetchAndDisplayCategories();

  // Add navigation buttons for search results
  const searchLeftButton = document.createElement('button');
  searchLeftButton.className = 'search-nav-btn left';
  searchLeftButton.innerText = '◀';
  searchResultsContainer.appendChild(searchLeftButton);

  const searchRightButton = document.createElement('button');
  searchRightButton.className = 'search-nav-btn right';
  searchRightButton.innerText = '▶';
  searchResultsContainer.appendChild(searchRightButton);

  const searchResultsMovies = searchResultsContainer.querySelector('.movies');

  searchLeftButton.onclick = () => {
    searchResultsMovies.scrollBy({ left: -300, behavior: 'smooth' });
  };

  searchRightButton.onclick = () => {
    searchResultsMovies.scrollBy({ left: 300, behavior: 'smooth' });
  };
});
