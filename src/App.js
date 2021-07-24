import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovies';
import Header from './components/Header';
import Loading from "./components/loading.gif"

export default function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, getFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(item => item.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * originals[0].items.results.length - 1);
      let chosen = originals[0].items.results[randomChosen] ? originals[0].items.results[randomChosen] : '';
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      getFeaturedData(chosenInfo)
    }
    loadAll();
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      window.scrollY >= 10 ? setBlackHeader(true) : setBlackHeader(false);
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'>❤️</span> por Pdezin
        Direitos de imagem para Netflix<br />
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src={Loading} alt="carregando" />
        </div>
      }

    </div>
  )
}