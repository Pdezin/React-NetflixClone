/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import './FeaturedMovie.css';

export default ({ item }) => {
   let firstDate = new Date(item.first_air_date);
   let genres = [];
   let descriptionLength = () => 'Sem descrição';
   if (genres !== '') {
      for (let i in item.genres) {
         genres.push(item.genres[i].name)
      }
   }

   if (item.overview !== '' && item.overview !== null && item.overview !== undefined) {
      descriptionLength = () => item.overview.split(' ').length >= 32 ? item.overview.split(' ').slice(0, 32).join(' ') + '...' : item.overview;
   }

   return (
      <section className='featured' style={{
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
      }}>
         <div className='featured--vertical'>
            <div className='featured--horizontal'>
               <div className='featured--name'>{item.original_name}</div>
               <div className='featured--info'>
                  <div className='featured--points'>{item.vote_average} ponto{item.vote_average === 1 ? '' : 's'}</div>
                  <div className='featured--year'>{firstDate.getFullYear()}</div>
                  <div className='featured--seasons'>{item.number_of_seasons} temporada{item.number_of_seasons === 1 ? '' : 's'}</div>
               </div>
               <div className='featured--description'>{descriptionLength()}</div>
               <div className='featured--buttons'>
                  <a href={`/watch/${item.id}`}>► Assistir</a>
                  <a href={`/list/add/${item.id}`}>+ Minha Lista</a>
               </div>
               <div className='featured--genres'><strong>Gêneros: </strong>{genres.join(', ')}</div>
            </div>
         </div>
      </section>
   )
}