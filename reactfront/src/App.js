import React, { Component } from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';
import 'bootstrap/dist/css/bootstrap.css'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    this.setState({ results: _results.data })
  }

  handlingChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handlingSubmit = async () => {
    //event.preventDefault() event 의 고유한 default 기능들을 막는다. ( 새로고침 같은거)
    await api.createPost({ title: this.state.title, content: this.state.content })
    //console.log("완료됨!", result.data)
  }

  handlingDelete = async (event) => {
    await api.deletePost(event.target.value)
    this.getPosts()
  }

  render() {
    return (
      <div className="App">
        <Container maxWidth="lg">
          <Paper elevation={2} className="PostingForm">
            <h2>대나무숲 글 작성하기</h2>
            <form onSubmit={this.handlingSubmit}>
              <TextField 
                id="outlined-basic"
                label="글 제목" 
                variant="outlined"
                name="title"
                value={this.state.title}
                onChange={this.handlingChange}
              /> <br /><br />
              <TextField
                id="outlined-multiline-static"
                label="내용"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
              
                name="content"
                value={this.state.content}
                onChange={this.handlingChange}
              /> <br /><br />
              <Button variant="outlined" type="submit" >작성하기</Button>
            </form>
          </Paper>
          <div className="ViewSection">
            {
              this.state.results.map((post) =>
                <div className="post-box"><br/><br/>
                  <PostView title={post.title} content={post.content} key={post.id} />
                  <button value={post.id} onClick={this.handlingDelete} className="btn btn-danger" >지우기</button>
                <br/><br/></div>
              )
            }
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
