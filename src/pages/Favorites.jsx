import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import trybetunes from '../imgs/imageTrybeTunes.png';

class Favorites extends Component {
  state = {
    loading: false,
    musicListFavorite: [],
    // removeMusics: [],
  }

  async componentDidMount() {
    const listFavorite = await getFavoriteSongs();
    this.setState({ musicListFavorite: listFavorite });
  }

   handleChange = async (ev, musica) => {
     const { musicListFavorite } = this.state;
     this.setState({ loading: true });
     console.log(ev.target.checked);
     console.log('removs', musica);
     await removeSong(musica);
     const listFavorite = musicListFavorite.filter((e) => e.trackId !== musica.trackId);
     this.setState({ loading: false, musicListFavorite: listFavorite });
   }

   render() {
     const { loading, musicListFavorite } = this.state;
     return (
       <div data-testid="page-favorites">
         <header className="header-login">
           <img src={ trybetunes } alt="" />
           <h1 className="title-header">Musicas Favoritas</h1>
           <div className="user">Usuário</div>
         </header>
         <Header />
         {loading ? <Loading /> : (
           <div>
             {musicListFavorite.map((music, index) => (
               <div key={ index }>
                 <MusicCard
                   { ...music }
                   onChange={ (ev) => this.handleChange(ev, music) }
                 />
               </div>
             ))}
           </div>
         )}
       </div>
     );
   }
}

export default Favorites;
