import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: '', //Ce qu'on veut taper et rechercher
      cocktails: [] //Tableau vide car tableau d'objet visualisé dans le retour API. On initialise le state cocktail
    };
  }

  updateIngredient = event => {
    this.setState({
      ingredient: event.target.value //Toujours setState pour faire mise à jour du state. Mise à jour du state par la valeur saisie dans la barre de recherche. L'évenement correspond à une cible (=barre recherche) avec valeur à récupérer (=value)
    });
  };

  handleClick = () => {
    const api = axios;
    api
      .create({
        baseURL: 'https://www.thecocktaildb.com/',
        timeout: 7000 //create méthode de axios qui permet de vérifier l'accessibilité de l'URL de l'API et si pas de réponse à timeout ca va à catch.
      })
      .get(
        `api/json/v1/1/filter.php?i=${this.state.ingredient}` //URL complete si pas create sinon suite de l'URL et ce qu'on veut rechercher ici
      )
      .then(response => {
        //console.log(response) ; on récupére toujours d'une API un JSON = tableau d'objet. Un console.log(response) ici permet de le vérifier dans la console
        //console.log(response.data.drinks) ; Chemin de ce que l'on veut obtenir
        this.setState({
          cocktails: response.data.drinks //On met à jour le state par ce qu'on veut obtenir (ici drinks = tableau objet avec pour chaque id, nom et photo du cocktail)
        });
      })
      .catch(error => {
        console.log(`The API cocktaildb encountered a problem: ${error}`); //Pour mettre variable dans un string toujours faire ${} et bactick ` pour le string dans ce cas
      });
  };

  render() {
    //console.log(this.state.cocktails);
    //un console.log(this.state) permet de voir le state et l'actualisation. ATTENTION jamais de console.log après un setState car console.log s'execute plus vite que le setState
    return (
      <div>
        <h1 className='text-center'>Choose your cocktail</h1>
        <input
          className='searchCocktail'
          type='text'
          name='cocktail'
          placeholder='Entrez la base de votre cocktail'
          value={this.state.ingredient} //Pour faire le lien entre barre de recherche et le state
          onChange={this.updateIngredient} //Pour actualiser le state et pouvoir taper dans la barre Recherche. onChange prend en compte le changement à chaque caractère entré
        />
        <button
          type='button'
          onClick={this.handleClick} //Faire appel à la fonction au clic
        >
          Recherche
        </button>

        <div>
          {this.state.cocktails.map((cocktail, index) => {
            //console.log(cocktail); //pour savoir ce qu'on peut recuperer de l'API
            return (
              <div key={index}>
                <p>{cocktail.strDrink}</p>{' '}
                <NavLink
                  to={{
                    pathname: '/detail', //Navlink permet en cliquant sur l'image de diriger vers cette route définit avec son composant dans App.js
                    state: {
                      cocktailID: cocktail.idDrink,
                      cocktailName: cocktail.strDrink,
                      cocktailImage: cocktail.strDrinkThumb //On définit le(s) state(s) à transmettre à detail
                    }
                  }}
                >
                  <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                </NavLink>
              </div>
              //Du JSON de l'API récupéré on utilise un map sur le state à jour pour ce qu'on veut afficher.
              // On définit un élément (ici nommé cocktail) puis return (nécessaire pour affichage) avec pour chaque élément l'affichage du nom et de l'image dans ce cas.
              // key pour différencier chaque élément on peut utiliser index (position dans le tableau) ou une autre proprété unique à chaque élément du tableau (ex : Id)
              //Balise image est particulière : autofermante, avec src (source) et alt (descritpion) à préciser.
            );
          })}
        </div>
      </div>
    );
  }
}

export default Homepage;
