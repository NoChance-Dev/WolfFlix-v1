document.addEventListener('DOMContentLoaded', async () => {
  const moviesContainer = document.getElementById('movies');
  const searchResultsContainer = document.getElementById('search-results');  // The section below the categories
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const homeButtonContainer = document.getElementById('home-button-container');
  const watchAdFreeButton = document.getElementById('watch-ad-free-button');
  const adFreeMessage = document.getElementById('ad-free-message');
  const apiKey = '4894504f5229b6f5635dc54350d77694';

  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerText = 'Loading...';
  document.body.appendChild(loader);

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

  const createEpisodeWindow = (posterElement) => {
    const episodeWindow = document.createElement('div');
    episodeWindow.className = 'episode-window';
    episodeWindow.style.position = 'absolute';

    const posterRect = posterElement.getBoundingClientRect();
    const documentTop = window.scrollY;
    const documentLeft = window.scrollX;

    let x = posterRect.right + documentLeft + 10;
    let y = posterRect.top + documentTop;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (x + 300 > viewportWidth) {
      x = posterRect.left + documentLeft - 310;
    }
    if (y + 400 > viewportHeight) {
      y = viewportHeight - 400;
    }

    episodeWindow.style.top = `${y}px`;
    episodeWindow.style.left = `${x}px`;
    episodeWindow.style.zIndex = 1000;
    episodeWindow.style.backgroundColor = '#1c1c1c';
    episodeWindow.style.color = '#fff';
    episodeWindow.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    episodeWindow.style.padding = '15px';
    episodeWindow.style.borderRadius = '10px';
    episodeWindow.style.maxWidth = '300px';
    episodeWindow.style.overflowY = 'auto';
    document.body.appendChild(episodeWindow);

    return episodeWindow;
  };

  const closeExistingEpisodeWindows = () => {
    document.querySelectorAll('.episode-window').forEach((window) => window.remove());
  };

  const addImageErrorHandling = (img) => {
    img.onerror = () => {
      img.style.display = 'none';
    };
  };

  const showLoader = () => {
    loader.style.display = 'block';
  };

  const hideLoader = () => {
    loader.style.display = 'none';
  };

  const fetchAndDisplayCategories = async () => {
    for (const category of categories) {
      const section = document.createElement('section');
      section.className = 'category';
      section.innerHTML = `<h2>${category.name}</h2>`;

      const categoryContainer = document.createElement('div');
      categoryContainer.className = 'movies';
      section.appendChild(categoryContainer);

      const arrowLeft = document.createElement('button');
      arrowLeft.className = 'arrow arrow-left';
      arrowLeft.innerHTML = '&#10094;';
      arrowLeft.onclick = () => {
        categoryContainer.scrollBy({ left: -300, behavior: 'smooth' });
      };
      section.appendChild(arrowLeft);

      const arrowRight = document.createElement('button');
      arrowRight.className = 'arrow arrow-right';
      arrowRight.innerHTML = '&#10095;';
      arrowRight.onclick = () => {
        categoryContainer.scrollBy({ left: 300, behavior: 'smooth' });
      };
      section.appendChild(arrowRight);

      moviesContainer.appendChild(section);

      try {
        showLoader();
        const response = await fetch(category.endpoint);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const items = data.results || [];

        if (items.length > 0) {
          items.forEach((item) => {
            const isMovie = item.title !== undefined;
            const posterUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '';
            const movieElement = document.createElement('div');
            movieElement.className = 'movie';

            const img = document.createElement('img');
            img.src = posterUrl;
            img.alt = item.title || item.name;
            addImageErrorHandling(img);
            movieElement.appendChild(img);

            movieElement.onclick = async (event) => {
              if (isMovie) {
                window.location.href = `https://embed.su/embed/movie/${item.id}`;
              } else {
                closeExistingEpisodeWindows();
                const episodeWindow = createEpisodeWindow(movieElement);

                try {
                  const seasonResponse = await fetch(`https://api.themoviedb.org/3/tv/${item.id}?api_key=${apiKey}`);
                  const seasonData = await seasonResponse.json();

                  if (!seasonData.seasons) {
                    episodeWindow.innerHTML = '<p>No seasons available.</p>';
                    return;
                  }

                  const seasonList = document.createElement('div');
                  seasonData.seasons.forEach((season) => {
                    const seasonButton = document.createElement('button');
                    seasonButton.innerText = season.name;
                    seasonButton.style.backgroundColor = '#333';
                    seasonButton.style.color = '#fff';
                    seasonButton.style.border = 'none';
                    seasonButton.style.padding = '10px';
                    seasonButton.style.marginBottom = '5px';
                    seasonButton.style.borderRadius = '5px';
                    seasonButton.style.cursor = 'pointer';

                    seasonButton.onclick = async () => {
                      const episodesContainer = document.createElement('div');
                      episodesContainer.className = 'episodes';

                      const seasonDetailResponse = await fetch(
                        `https://api.themoviedb.org/3/tv/${item.id}/season/${season.season_number}?api_key=${apiKey}`
                      );
                      const seasonDetailData = await seasonDetailResponse.json();
                      const episodes = seasonDetailData.episodes || [];

                      episodesContainer.innerHTML = '';
                      episodes.forEach((episode) => {
                        const episodeElement = document.createElement('div');
                        episodeElement.className = 'episode';
                        episodeElement.innerHTML = `<p>${episode.name}</p><p>${episode.air_date}</p>`;
                        episodesContainer.appendChild(episodeElement);
                      });

                      episodeWindow.innerHTML = '';
                      episodeWindow.appendChild(seasonList);
                      episodeWindow.appendChild(episodesContainer);
                    };

                    seasonList.appendChild(seasonButton);
                  });

                  episodeWindow.appendChild(seasonList);
                } catch (error) {
                  console.error('Error fetching seasons or episodes:', error);
                  episodeWindow.innerHTML = '<p>Error fetching data. Try again later.</p>';
                }
              }
            };

            categoryContainer.appendChild(movieElement);
          });
        } else {
          section.innerHTML += '<p>No results found.</p>';
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        section.innerHTML = '<p>Error loading category data.</p>';
      } finally {
        hideLoader();
      }
    }
  };

  // Call the function to display categories
  await fetchAndDisplayCategories();

  // Scroll logic for the search results
const handleSearch = async () => {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  showLoader();
  searchResultsContainer.innerHTML = '';  // Clear the previous search results
  searchResultsContainer.style.display = 'block'; // Ensure the search results container is visible

  const searchSection = document.createElement('section');
  searchSection.className = 'category';
  searchSection.innerHTML = `<h2>Search Results for: ${searchTerm}</h2>`;

  const searchContainer = document.createElement('div');
  searchContainer.className = 'movies';
  searchSection.appendChild(searchContainer);

  const arrowLeft = document.createElement('button');
  arrowLeft.className = 'arrow arrow-left';
  arrowLeft.innerHTML = '&#10094;';
  arrowLeft.onclick = () => {
    searchContainer.scrollBy({ left: -300, behavior: 'smooth' });
  };
  searchSection.appendChild(arrowLeft);

  const arrowRight = document.createElement('button');
  arrowRight.className = 'arrow arrow-right';
  arrowRight.innerHTML = '&#10095;';
  arrowRight.onclick = () => {
    searchContainer.scrollBy({ left: 300, behavior: 'smooth' });
  };
  searchSection.appendChild(arrowRight);

  searchResultsContainer.appendChild(searchSection); // Add search section to the DOM

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`);
    const data = await response.json();
    const items = data.results || [];

    if (items.length > 0) {
      items.forEach((item) => {
        const isMovie = item.media_type === 'movie';
        const posterUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '';
        const searchResultElement = document.createElement('div');
        searchResultElement.className = 'movie';

        const img = document.createElement('img');
        img.src = posterUrl;
        img.alt = item.title || item.name;
        addImageErrorHandling(img);
        searchResultElement.appendChild(img);

        searchResultElement.onclick = async () => {
          if (isMovie) {
            window.location.href = `https://embed.su/embed/movie/${item.id}`;
          } else {
            closeExistingEpisodeWindows();
            const episodeWindow = createEpisodeWindow(searchResultElement);

            try {
              const seasonResponse = await fetch(`https://api.themoviedb.org/3/tv/${item.id}?api_key=${apiKey}`);
              const seasonData = await seasonResponse.json();

              if (!seasonData.seasons) {
                episodeWindow.innerHTML = '<p>No seasons available.</p>';
                return;
              }

              const seasonList = document.createElement('div');
              seasonData.seasons.forEach((season) => {
                const seasonButton = document.createElement('button');
                seasonButton.innerText = season.name;
                seasonButton.style.backgroundColor = '#333';
                seasonButton.style.color = '#fff';
                seasonButton.style.border = 'none';
                seasonButton.style.padding = '10px';
                seasonButton.style.marginBottom = '5px';
                seasonButton.style.borderRadius = '5px';
                seasonButton.style.cursor = 'pointer';

                seasonButton.onclick = async () => {
                  const episodesContainer = document.createElement('div');
                  episodesContainer.className = 'episodes';

                  const seasonDetailResponse = await fetch(
                    `https://api.themoviedb.org/3/tv/${item.id}/season/${season.season_number}?api_key=${apiKey}`
                  );
                  const seasonDetailData = await seasonDetailResponse.json();
                  const episodes = seasonDetailData.episodes || [];

                  episodesContainer.innerHTML = '';
                  episodes.forEach((episode) => {
                    const episodeElement = document.createElement('div');
                    episodeElement.className = 'episode';
                    episodeElement.innerHTML = `<p>${episode.name}</p><p>${episode.air_date}</p>`;
                    episodesContainer.appendChild(episodeElement);
                  });

                  episodeWindow.innerHTML = '';
                  episodeWindow.appendChild(seasonList);
                  episodeWindow.appendChild(episodesContainer);
                };

                seasonList.appendChild(seasonButton);
              });

              episodeWindow.appendChild(seasonList);
            } catch (error) {
              console.error('Error fetching seasons or episodes:', error);
              episodeWindow.innerHTML = '<p>Error fetching data. Try again later.</p>';
            }
          }
        };

        searchContainer.appendChild(searchResultElement);
      });
    } else {
      searchResultsContainer.innerHTML = '<p>No results found.</p>';
    }
  } catch (error) {
    console.error('Error fetching search data:', error);
    searchResultsContainer.innerHTML = '<p>Error fetching search results.</p>';
  } finally {
    hideLoader();
  }
};

  // Event listener for the search button
  searchButton.addEventListener('click', handleSearch);
});
