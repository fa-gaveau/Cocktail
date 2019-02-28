import React, { Component } from 'react';
import axios from 'axios';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nbLike: 0
      // ...this.props.location.state pour retransmettre tout le state du composant parent (location car Navlink). Ici par d'interet de le remettre dans le state car infos fixes qu'on peut remettre directement dans le return ici
    };
  }

  componentWillMount() {
    const displayLike = axios;
    //console.log({ idCocktail: this.props.location.state.cocktailID });
    displayLike
      .create({
        baseURL: `${process.env.REACT_APP_cocktail_baseURL}`, //Variable environnement ici en front car donnée sensible, on mettra en variable environnement localhost+n° port du back
        timeout: 7000 //create méthode de axios qui permet de vérifier l'accessibilité de l'URL et si pas de réponse à timeout ca va à catch.
      })
      .get('/cocktail_likes', {
        //On peut utiliser plusieurs fois la même route dans différents appels axios si méthodes différentes
        params: { idCocktail: this.props.location.state.cocktailID } //Ici on met l'information qui va permettre d'executer la requete, l'id du cocktail qui est stocké dans la BDD va suffire (le .location est utilisé car props transmis via le state de Navlink de Homepage)
      }) //On doit préciser l'objet dans un objet intitulé params pour le transmettre vers le back. params est à utiliser tel quel.
      //Appel axios dans le CWM avec méthode get pour afficher les likes venant de la BDD directement à l'ouverture du composant

      .then(response => {
        //console.log(response.data[0].Number_Likes); Pour voir la réponse en front
        this.setState({ nbLike: response.data[0].Number_Likes }); //Mise à jour du state sur nblikes par rapport à ce qui existe en BDD et qui vient du back
      })
      .catch(error => {
        console.log(`The BDD encountered a problem: ${error}`); //Pour mettre variable dans un string toujours faire ${} et bactick ` pour le string dans ce cas
      });
  }

  increment = () => {
    this.setState({
      nbLike: this.state.nbLike + 1 //fonction pour augmenter le compteur de 1 à chaque clic
    });
    const likeBdd = axios;
    likeBdd
      .create({
        baseURL: `${process.env.REACT_APP_cocktail_baseURL}`, //Variable environnement ici en front car donnée sensible, on mettra en variable environnement localhost+n° port du back
        timeout: 7000 //create méthode de axios qui permet de vérifier l'accessibilité de l'URL et si pas de réponse à timeout ca va à catch.
      })
      .post('/cocktail_likes', {
        nbLike: this.state.nbLike + 1,
        idCocktail: this.props.location.state.cocktailID
      }) //Lors de cette fonction on fait un appel axios et on fait une méthode post pour transmettre l'objet souhaité vers la route back correspondante
      .then(response => {
        console.log('like registred');
        //Pas besoin de réponse ici on met juste un console.log pour dire que c'est ok.
      })
      .catch(error => {
        console.log(`The BDD encountered a problem: ${error}`); //Pour mettre variable dans un string toujours faire ${} et bactick ` pour le string dans ce cas
      });
  };

  render() {
    return (
      <div>
        <p>{this.props.location.state.cocktailName}</p>
        <img
          src={this.props.location.state.cocktailImage}
          alt={
            this.state.cocktailName
          } /*On peut définir le state du composant parent ici directement et non dans le constructeur car il est fixe pour être affiché (location car Navlink) */
        />
        <h1>
          {
            this.state
              .nbLike /*les likes sont mis à jour par cde qui vient de la BDD et ils peuvent s'incrémenter de +1 au clic */
          }
        </h1>
        <button onClick={this.increment}>Like</button>
      </div>
    );
  }
}

export default Detail;
