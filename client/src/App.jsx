import './App.css';
import React, { Component}  from 'react';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'App'
        }
    }

    render(){
      return (
        <div className="App">
          <header className="App-header">
            <h1>BeStudying.</h1>
            <img src="https://play-lh.googleusercontent.com/zMiGwnxDPRH0pseGALVVc6T7JdvdfpDoygm8Ska7m4fFKJ3hodY3DfwCjT-UiJUy6g=w600-h300-pc0xffffff-pd" className="App-logo" alt="logo" />
            <p>
               <code>Télécharger</code> l'application<br/><button onClick={() => alert('Application pas encore publiée.')} className='App-link'>ici</button>
            </p>
          </header>
        </div>
      );
    }
}