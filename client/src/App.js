import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsLoaded: false,
      cardData: [],
      picture: "",
      message: "",
    };
  }

  async componentDidMount() {
    await fetch("http://localhost:9000/eid")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          cardData: json,
          dataIsLoaded: true,
          message: json.message,
        });
      })
      .catch((err) => err);

    if (this.state.message == null) {
      const base64String = btoa(
        String.fromCharCode(
          ...new Uint8Array(this.state.cardData.imageFile.data)
        )
      );
      this.setState({ picture: base64String });
    }
  }

  render() {
    const { dataIsLoaded, cardData, picture, message } = this.state;
    if (!dataIsLoaded) return <h1>Loading...</h1>;
    if (message) return <h2>{message}</h2>;
    return (
      <div className="App">
        <p>Name: {cardData.name}</p>
        <p>Sex: {cardData.sex}</p>
        <p>Date of Birth: {cardData.dateOfBirth}</p>
        <p>Street + No.: {cardData.street}</p>
        <p>Zipcode: {cardData.zipcode}</p>
        <p>City: {cardData.city}</p>
        <p>Country: {cardData.country}</p>
        <p>National Number: {cardData.nationalNumber}</p>
        <p>Location of Birth: {cardData.locationOfBirth}</p>
        <img alt="profile" src={`data:image/png;base64,${picture}`}></img>
      </div>
    );
  }
}

export default App;
