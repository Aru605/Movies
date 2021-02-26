import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles={
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    
  },
  input: {
    marginLeft: 1,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
};

class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      fevo:[],
      
      data:[],
    }
    this.getdata=this.getdata.bind(this);
    this.sleep=this.sleep.bind(this);
    this.sleepsolver=this.sleepsolver.bind(this);
    this.fevh=this.fevh.bind(this);
    
  }

 async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async sleepsolver(event)
  {
    this.setState({title:event.target.value})
    await this.sleep(2000);
    if(event.target.value.length>3 && event.target.value === this.state.title)
    {console.log(event.target.value);}

  }

  async getdata(event)
  { 
    event.preventDefault();
    await this.sleep(2000);
    

    fetch("http://www.omdbapi.com/?apikey=2da275f5&t="+event.target.value).then(response => response.json()).then(
                                  (result) => {
                                    
                                    this.setState({data:[result]})
                                    console.log(this.state.data);
                                    console.log(this.state.data.length)
                                  },
                                  // Note: it's important to handle errors here
                                  // instead of a catch() block so that we don't swallow
                                  // exceptions from actual bugs in components.
                                  (error) => {
                                    console.log("something went wrong");
                                  }
                                )
    
   
  }

  async fevh(event)
  {
    event.preventDefault();
    this.state.fevo.push(this.state.data[0]);
    console.log("fec called");
    console.log(this.state.fevo);
      
      

  }


  render()
  {


    const {classes}=this.props;


    

    

    const condition= ()=>{if(this.state.data.length>0)
    {console.log("data");
      return(<Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            
            title="Contemplative Reptile"
            
          />
          <CardContent>
            <img src={this.state.data[0].Poster}></img>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.data[0].Title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            <Typography component="h3" color="textSecondary">Gener:{this.state.data[0].Genre}</Typography>
            <Typography component="h3" color="textSecondary">Cast:{this.state.data[0].Actors}</Typography>
            <Typography component="h3" color="textSecondary">Released:{this.state.data[0].Released}</Typography>
            <Typography component="h3" color="textSecondary">Awards:{this.state.data[0].Awards}</Typography>
            <Typography component="h3" color="textSecondary">{this.state.data[0].Plot}</Typography>
            </Typography>
            
          </CardContent>
          <CardActions>
          
          
        </CardActions>

        </CardActionArea>
        
      </Card>);}

      
    
    }


    const fevlist= ()=>{if(this.state.fevo.length>0)
      {console.log("data");
        return(
        
        this.state.fevo.map((object)=>{
          <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              
              title="Contemplative Reptile"
              
            />
            <CardContent>
              <img src={object.Poster}></img>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.data[0].Title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              <Typography component="h3" color="textSecondary">Gener:{this.state.data[0].Genre}</Typography>
              <Typography component="h3" color="textSecondary">Cast:{this.state.data[0].Actors}</Typography>
              <Typography component="h3" color="textSecondary">Released:{this.state.data[0].Released}</Typography>
              <Typography component="h3" color="textSecondary">Awards:{this.state.data[0].Awards}</Typography>
              <Typography component="h3" color="textSecondary">{this.state.data[0].Plot}</Typography>
              </Typography>
              
            </CardContent>
            <CardActions>
            
            
          </CardActions>
  
          </CardActionArea>
          
        </Card>
        })
        
        );}
  
        
      
      }




    

    return (
      <div className="App">
        <header className="App-header">
          <h1>Movies app</h1>
        </header>

        <Paper component="form" onSubmit={this.getdata} className={classes.root}  align="left" fullwidth={true}>
                        <InputBase placeholder="Search movie by title" className={classes.input} onChange={(event)=>{this.getdata(event)}}/>
                        <Divider className={classes.divider} orientation="vertical" />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                        </IconButton>
        </Paper>

       
        {condition()}
        {fevlist()}
        <Button size="small" color="primary" onClick={this.fevh}>
            Add to fev
          </Button>
          <Button size="small" color="primary" onClick={()=>console.log(this.state.fevo)}>
            Remove fev
          </Button>
        
        
      </div>
    );

  }
}


export default withStyles(styles)(App);
