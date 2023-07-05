import { Component } from 'react';

 
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      movies: [],
      searchField: ''
    };
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
       .then((response) => response.json())
       .then((users) => 
       this.setState(
       () => {
        return {movies: users}
       },
       () => {
        console.log (this.state);
       }
       ))
  }
  render() {
    console.log('render');
    const filteredMovies = this.state.movies.filter((movie) => {
      return movie.name.toLocaleLowerCase().includes(this.state.searchField);
  });

  return (
    <div className="App">
      <input className= 'serach-box' type='search' placeholder='Serach Movies'
      onChange={(event) => {
        const searchField = event.target.value.toLocaleLowerCase();
        this.setState(() => {
          return { searchField };
        }
        );
      }}
      />
      {
        filteredMovies.map((movie) => {
          return <div key={movie.id}>
            <h1>{movie.name}</h1>
            </div>
        })
      }
    </div>
  );
  }
}

export default App;
