import React, { Component } from "react";
import {
  API_URL,
  API_DEL,
  API_POST,
  API_PUT,
  API_GET,
  API_IMPORT,
} from "./utils/Index";
import "./index.scss";

// Component
import Card from "./components/CardPost";

// Component ANTD
import { Row, Col } from "antd";
import Axios from "axios";

export default class KelasComp extends Component {
  state = {
    post: [],
    bookId: 0,
    data: {
      bookTitle: "",
      author: "",
      price: "",
    },
    isUpdate: false,
  };

  getData = () => {
    Axios.get(API_URL)
      .then((data) => {
        let newData = [...this.state.post];
        newData = data.data;
        this.setState({ post: newData });
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.getData();
  }

  handleRemove = (id) => {
    Axios.delete(API_URL + id).then(() => this.getData());
  };

  handleChange = (e) => {
    let newData = { ...this.state.data };
    newData[e.target.name] = e.target.value;
    this.setState({
      data: newData,
    });
  };

  putDataToApi = () => {
    Axios.put(API_URL + this.state.bookId, this.state.data).then(() => {
      this.getData();
      this.setState({
        isUpdate: false,
        data: {
          bookTitle: "",
          author: "",
          price: "",
        },
      });
    });
  };

  postDataToApi = () => {
    Axios.post(API_URL, this.state.data)
      .then(() => {
        this.getData();
        this.setState({
          isUpdate: false,
          data: {
            bookTitle: "",
            author: "",
            price: "",
          },
        });
      })
      .catch((err) => console.log(err));
  };

  handleSave = () => {
    if (this.state.isUpdate) {
      this.putDataToApi();
    } else {
      this.postDataToApi();
    }
  };

  handleUpdate = (data) => {
    this.setState({ data, isUpdate: true, bookId: data.id });
  };

  handlePdf = () => {
    Axios.get(API_IMPORT + "pdf")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  handleExcel = () => {
    Axios.get(API_IMPORT + "xls")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <h1 className="title">
          Jastip <span>Jablay</span>
        </h1>
        <div className="form">
          <label htmlFor="title">
            Title
            <input
              value={this.state.data.bookTitle}
              type="text"
              name="bookTitle"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="author">
            Author
            <input
              value={this.state.data.author}
              type="text"
              name="author"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            price
            <input
              value={this.state.data.price}
              type="text"
              name="price"
              onChange={this.handleChange}
            />
          </label>
          <button className="btn-submit" onClick={this.handleSave}>
            Simpan
          </button>
        </div>

        <div className="import-section">
          <a className="btn-import" onClick={this.handlePdf}>
            Export to <span>PDF</span>
          </a>
          <a className="btn-import" onClick={this.handleExcel}>
            Export to <span>Excel</span>
          </a>
        </div>
        <Row justify="center">
          {this.state.post.map((item) => {
            return (
              <Col span={6} key={item.bookId}>
                <Card
                  title={item.bookTitle}
                  desc={item.author}
                  price={item.price}
                  onRemove={() => this.handleRemove(item.id)}
                  onUpdate={() => this.handleUpdate(item)}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

// NOTE:
// bookId ganti jadi id
