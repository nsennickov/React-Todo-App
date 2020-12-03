/* eslint-disable array-callback-return */
import React from 'react';
import './App.css';
import Todo from './Todo/Todo'
import Clear from './Todo/Clear'


class App extends React.Component {

  state = {
    deal: [],
  }

  fillState(count){
    if(count === 0){
      let deal = [];
      
      for(let i = 0; i < localStorage.length; i++){
        let value = {key: Number(localStorage.key(i)), value: localStorage.getItem(localStorage.key(i))};
        deal.push(value);
      }

      deal.sort((a, b) => {
        if(a.key < b.key) return -1
      })

      this.setState({deal})
    }
  }

  componentDidMount(){
    let count = 0;
    this.fillState.call(this, count);
    count++;
  }

  setNewTodoHandler(){ 
    let deal = this.state.deal;
    const value = document.querySelector('.input-field').value;

    if(value !== ''){
		  localStorage.setItem(`${localStorage.length+1}`, value);

		  let obj = {key: localStorage.length, value: value}

      deal.push(obj);
    
		  this.setState({deal})
    }
    document.querySelector('.input-field').value = '';
	}

  removeHandler(e){
    let target = e.target.parentElement.children[0].innerHTML;
    let value = target.split(')').splice(0, 1).join('').split('>')[1]

    let deal = this.state.deal.filter(item => {
      if(item.key !== Number(value)){
        return item
      } 
    })

    localStorage.removeItem(String(value));

    this.setState({deal})
  }

  changeHandler(item){
    
  }

  render(){

    const child = this.state.deal.length;

    return (
      <div className="wrapper">
          <div className='todo-input-wrapper'>
              <input type='text' placeholder='Input your to-do item here' className='input-field'></input>
              <button className='add-btn' onClick={this.setNewTodoHandler.bind(this)}>Add to list</button>
          </div>
          <div className='todo-wrapper'>
              { child > 0 ?
              this.state.deal.map((deals, index) => {
                return (
                  <Todo kluch = {deals.key}
                        key = {index}
												value = {deals.value}
                        change = {this.changeHandler.bind(this)}    
                        remove = {this.removeHandler.bind(this)}    
                  />
                )
              }) : <Clear />}
          </div>
      </div>
    );
  }
}

export default App;
