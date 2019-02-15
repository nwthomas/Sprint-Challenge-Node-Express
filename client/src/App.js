import React, { Component } from "react";
import "./App.css";
import { ProjectsList } from "./components/ProjectsList";
import axios from "axios";

class App extends Component {
  state = {
    projects: [],
    error: ""
  };
  componentDidMount() {
    axios
      .get("http://localhost:8000/api/projects/")
      .then(res => {
        this.setState({
          projects: res.data
        });
      })
      .catch(err => {
        this.setState({
          message: err.message
        });
      });
  }
  render() {
    return (
      <div className="App">
        <ProjectsList projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
