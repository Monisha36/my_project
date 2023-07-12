import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box-component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newfilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newfilteredMonsters);

  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange}
        placeholder='Search monsters'
        className='monster-search-box' />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

// class App extends Component {
//   constructor(){
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };

//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//        .then((response) => response.json())
//        .then((users) => 
//        this.setState(
//        () => {
//         return {monsters: users}
//        },

//        ));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     }
//     );
//   }

//   render() {

//     const {monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//   });

//   return (
//     <div className="App">
//       <h1 className="app-title">Monster Rolodex</h1>
//     {/* <SearchBox onChangeHandler= {onSearchChange} 
//     placeholder= 'Search monsters' 
//     className= 'monster-search-box'/>

//      <CardList monsters={filteredMonsters}/> */}
//     </div>
//   );
//   }
// }

export default App;
