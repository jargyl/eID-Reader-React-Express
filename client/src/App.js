import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsLoaded: false,
      status: "failed",
      cardData: [],
      picture: "",
      verified: false,
    };
  }

  async componentDidMount() {
    await fetch("http://localhost:9000/eid")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          status: json.status,
          cardData: json.data,
          dataIsLoaded: true,
        });
        console.log(this.state.cardData);
      })
      .catch((err) => err);
  }

  getDocumentType() {
    const documentType = this.state.cardData.documentType;
    if (this.state.cardData) {
      if (documentType === "01") {
        return "Identiteitskaart";
      } else if (documentType === "06") {
        return "Kids-ID";
      } else if (documentType !== "07" && documentType !== "08") {
        return "Vreemdelingenkaart";
      } else {
        return "Onbekend";
      }
    }
  }

  async verifyPin() {
    await fetch("http://localhost:9000/eid/pin")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ verified: json });
      })
      .catch((err) => err);
  }

  render() {
    const { dataIsLoaded, status, cardData, picture } = this.state;
    if (!dataIsLoaded) return <h1>Loading...</h1>;
    if (status === "failed") return <h2>{cardData}</h2>;
    return (
      <div className="App">
        <p>
          Document Type: <strong>{this.getDocumentType()}</strong>
        </p>
        <p>Name: {cardData.firstName + " " + cardData.lastName}</p>
        <p>Sex: {cardData.sex}</p>
        <p>Date of Birth: {cardData.dateOfBirth}</p>
        <p>Street + No.: {cardData.street}</p>
        <p>Zipcode: {cardData.zipcode}</p>
        <p>City: {cardData.city}</p>
        <p>Country: {cardData.country}</p>
        <p>National Number: {cardData.nationalNumber}</p>
        <p>Location of Birth: {cardData.locationOfBirth}</p>
        <img
          alt="profile"
          src={`data:image/png;base64,${cardData.imageFile}`}
        />
        <hr></hr>
        <button onClick={() => this.verifyPin()}>Verify PIN</button>
        <p>VERIFIED: {this.state.verified.toString().toUpperCase()}</p>
      </div>
    );
  }
}

export default App;
