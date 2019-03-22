import React, {Component} from 'react';
import {} from 'reactstrap';

function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max))
}

class OneMovie extends Component {
    constructor(props){
    super(props);
    this.state = {
        item : [],
        isLoad : false,
    }
    }

    componentDidMount(){
        fetch('http://localhost:9292/movies/populate')
        .then(res =>res.json())
        .then(text=>{
            this.setState({
                isLoad : true,
                item : text,
            })
        })
    }

    render(){
        var {isLoad, item} = this.state
        if(!isLoad){
            return <div>Loading...</div>
        }
        else{
            var ref = getRandomInt(56)
            return(
            <div>
            <br/> <br/>
            {item[ref].title}
            {item[ref].synopsis}
            </div>
            )
        }
    }
}

export default OneMovie;
