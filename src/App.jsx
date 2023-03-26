import React from "react";
import { FcAddRow } from 'react-icons/fc';
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      todo: [
        // {
        // Title :'zia',
        // s:0
        // },
        // {
        //   Title :'zia',
        //   s:0
        //   }
      ],
      inputvalue:0

    }
    console.log('constructure')
  }
  deletedata=(ind)=>{
this.state.todo.splice(ind,1)
localStorage.setItem('todolist', JSON.stringify(this.state.todo))

this.setState({})
  }
  handleValue = (val) => {
    // console.log(val)
    this.setState({
      value: val,
    })

  }

  componentDidMount(){//life cycle method 
    let data=localStorage.getItem('todolist')
    console.log(data)
if(data==null){
  this.state.todo=[]
}else{
  this.state.todo= JSON.parse(data)

}
    this.setState({})
  }
  edit = (ind) => {
    console.log('a')
    let len=this.state.todo[ind].title.length*5
    for (let i = 0; i < this.state.todo.length; i++) {

      this.state.todo[i].s = 0
    }

    this.state.todo[ind].s = 1
    this.setState({})
  }

  Submit = () => {
    let obj = {
      title: this.state.value,
      s: 0
    }


    this.state.todo = [...this.state.todo, obj]
    localStorage.setItem('todolist', JSON.stringify(this.state.todo))
    
    this.setState({
      value: ''
    })
    
    console.log(this.state.todo)
    
  }
  
  setnewtest = (val, i) => {
    this.state.todo[i].title = val
    this.setState({})
  }
  update = (i) => {
    this.state.todo[i].s = 0
    localStorage.setItem('todolist', JSON.stringify(this.state.todo))
    this.setState({})
  }
  render() {
    return (
      <div>
        <h1>Todo list</h1>
        <input type="text" value={this.state.value} id="inputValue" onChange={(e) => { this.handleValue(e.target.value) }} />
        <button onClick={() => this.Submit()}>todo app <FcAddRow size={20} /></button>
        {
          this.state.todo.map((v, i) => {
            return (
              v.s == 0 ?
                <li key={i}>
                  {v.title}
                  <button onClick={() => this.edit(i)}>Edit</button>
                  <button onClick={()=>this.deletedata(i)}>del</button>
                </li> :
                <li key={i}>
                  <input type="text" value={v.title} onChange={(e) => this.setnewtest(e.target.value, i)} />
                  <button onClick={() => this.update(i)}>update</button>
                
                </li>
            )
          })
        }

      </div>
    )
  }
}

export default App;
