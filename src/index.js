import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      mockData: [
        {
          id: 1,
          username: "Joe",
          english: 68,
          sst: 89,
          science: 72,
          math: 92,
          avg: 80,
          done: true,
          date: new Date().toString()
        },
        {
          id: 2,
          username: "Timothy",
          english: 68,
          sst: 90,
          science: 62,
          math: 92,
          avg: 71,
          done: true,
          date: new Date().toString()
        },
        {
          id: 3,
          username: "Isaac",
          english: 58,
          sst: 87,
          science: 70,
          math: 82,
          avg: 74,
          done: true,
          date: new Date().toString()
        },
        {
          id: 4,
          username: "Kelvin",
          english: 86,
          sst: 59,
          science: 77,
          math: 68,
          avg: 72,
          done: true,
          date: new Date().toString()
        }
      ]
    };
  }

  onSubmitHandle = event => {
    event.preventDefault();

    this.setState({
      mockData: [
        ...this.state.mockData,
        {
          id: this.state.mockData.length + 1,
          username: event.target.username.value,
          english: event.target.english.value,
          sst: event.target.sst.value,
          science: event.target.science.value,
          math: event.target.math.value,
          avg: event.target.avg.value,
          date: new Date().toString()
        }
      ]
    });

    event.target.item.value = "";
  };

  onDeleteHandle = id => {
    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
        return null;
      })
    });
  };

  onEditHandle = item => {
    this.setState({
      edit: true,
      id: item.id,
      username: item.username,
      english: item.english,
      sst: item.sst,
      science: item.science,
      math: item.math,
      avg: item.avg,
      date: item.date
    });
  };

  onUpdateHandle = event => {
    event.preventDefault();

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id) {
          item["username"] = event.target.username.value;
          item["english"] = event.target.english.value;
          item["sst"] = event.target.sst.value;
          item["science"] = event.target.science.value;
          item["math"] = event.target.math.value;
          item["avg"] = event.target.avg.value;
          return item;
        }
        return item;
      })
    });

    this.setState({
      edit: false
    });
  };

  onCompleteHandle = id => {
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item["done"] = true;
          return item;
        }
        return item;
      })
    });
  };

  renderEditForm = () => {
    if (this.state.edit) {
      return (
        <form onSubmit={this.onUpdateHandle.bind(this)}>
          <label>username</label>
          <input
            type="text"
            name="username"
            className="item"
            defaultValue={this.state.username}
          />
          <label>english</label>
          <input
            type="text"
            name="english"
            className="item"
            defaultValue={this.state.english}
          />
          <label>sst</label>
          <input
            type="text"
            name="sst"
            className="item"
            defaultValue={this.state.sst}
          />
          <label>science</label>
          <input
            type="text"
            name="science"
            className="item"
            defaultValue={this.state.science}
          />
          <label>math</label>
          <input
            type="text"
            name="math"
            className="item"
            defaultValue={this.state.math}
          />
          <label>avg</label>
          <input
            type="text"
            name="avg"
            className="item"
            defaultValue={this.state.avg}
          />
          <button className="update-add-item">Update</button>
        </form>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderEditForm()}
        <form onSubmit={this.onSubmitHandle.bind(this)}>
          <label>username</label>
          <input type="text" name="username" className="item" />
          <label>english</label>
          <input type="text" name="english" className="item" />
          <label>sst</label>
          <input type="text" name="sst" className="item" />
          <label>science</label>
          <input type="text" name="science" className="item" />
          <label>math</label>
          <input type="text" name="math" className="item" />
          <label>avg</label>
          <input type="text" name="avg" className="item" />
          <button className="btn-add-item">Add</button>
        </form>
        <br />
        <br />
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
                <th>Id</th>
                <th>username</th>
                <th>sst</th>
                <th>science</th>
                <th>english</th>
                <th>math</th>
                <th>avg</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {(this.state.mockData.length>0 ? ( 
            this.state.mockData.map(item => (
              <tr key={item.id} className={item.done ? "done" : "hidden"}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.sst}</td>
                <td>{item.science}</td>
                <td>{item.english}</td>
                <td>{item.math}</td>
                <td>{item.avg}</td>
                <td>{item.date}</td>
                <td>
                  <button onClick={this.onDeleteHandle.bind(this, item.id)}>
                    Delete
                  </button>
                  <button
                    onClick={this.onEditHandle.bind(
                      this,
                      item.id,
                      item.username,
                      item.english,
                      item.sst,
                      item.science,
                      item.math,
                      item.avg,
                      item.date
                    )}
                  >
                    Edit
                  </button>
                  <button onClick={this.onCompleteHandle.bind(this, item.id)}>
                    Complete
                  </button>
                </td>
              </tr>
            ))) :
                  (<tr>
                    <td colSpan={7}>No studentsResults</td>
                  </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
