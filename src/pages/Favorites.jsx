import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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

   // componentWillUnmount() {
   //   this.handletarget();
   // }

   // handletarget = () => {
   //   const { musicListFavorite } = this.state;
   //   console.log('music state', musicListFavorite);
   //   const requestId = document.getElementById('remove-music');
   //   const removes = musicListFavorite
   //     .filter((music) => music.trackId === Number(requestId.className));
   //   console.log('remio', removes);
   //   this.setState(() => ({ removeMusics: removes }));
   // }

   render() {
     const { loading, musicListFavorite } = this.state;
     return (
       <div data-testid="page-favorites">
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
