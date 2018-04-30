import React from "react";
import Head from "next/head";

//material ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import NavigationChevronLeft from "material-ui/svg-icons/navigation/chevron-left";
import NavigationChevronRight from "material-ui/svg-icons/navigation/chevron-right";

//components
import MenuBar from "../components/menuBar";
import { Tile } from "../components/tile";
import inherits from "babel-runtime/helpers/inherits";
import moment from "moment";
import DialogEvent from "../components/dialog";

class Index extends React.Component {
  constructor() {
    super();
    const today = new Date();
    this.state = {
      year: today.getFullYear(),
      month: today.getMonth(),
      date: '',
      events: [{"id":1, "date":"30/4/2018", "name":"Dinner"}],
      open: false
    };
  }

  handleOpen = (today) => {
    const month = this.state.month + 1
    this.setState({ open: true, date: today + "/" + month  + "/" + this.state.year  });
    
  };

  handleCloseChange = () => {
    this.setState({ open: false });
    console.log("parent")
  };

  prev = () => {
    this.setState({
      year: this.state.month ? this.state.year : this.state.year - 1,
      month: (this.state.month + 11) % 12
    });
  };

  next = () => {
    this.setState({
      year: this.state.month ? this.state.year : this.state.year + 1,
      month: (this.state.month + 13) % 12
    });
  };

  today = () => {
    const today = new Date();
    this.setState({
      year: today.getFullYear(),
      month: today.getMonth()
    });
  };

  createClickHandle = idx => {
    console.log("success");
  };
  

  addNewEvent = (event) => {
    this.setState({
      events: [...this.state.events, event]
    })
  }

  render() {
    const { year, month } = this.state;
    const date = moment([year, month]);
    console.log("year", year, "month", month, "date", date);
    const weekdays = moment.weekdaysShort();
    const months = moment.months(month);
    console.log("weekdays", weekdays);
    const lastDate = new Date(year, month + 1, 0).getDate(); //30
    console.log(lastDate);
    const offset = date.weekday(); // num of weekday
    console.log(offset);
    //index = 0 .. 41
    const dateNum = index => {
      if (offset <= index && index < offset + lastDate) {
        return index - offset + 1;
      }
    };

    return (
      <div>
        <Head>
          <title>ReDI Calender</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <style jsx>{`
          h1 {
            text-align: center;
          }
          .tile-day {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            height: 100vmin;
            max-height: 400px;
            box-sizing: border-box;
          }
        `}</style>
        <MuiThemeProvider>
          <MenuBar />
          <Card style={{ height: 800, margin: 5 }}>
            <CardTitle title={months} subtitle={this.state.year} />
            <div className="tile-day">
              {weekdays.map((name, idx) => (
                <Tile
                  value={name + "."}
                  key={idx}
                  style={{ fontSize: 13 }}
                  index={idx}
                />
              ))}
              {[...Array(42).keys()].map((_, idx) => (
                <Tile
                  value={dateNum(idx)}
                  key={idx}
                  onClick={() => this.handleOpen(dateNum(idx), idx)}
                />
              ))}
            </div>
            <br />>
            <CardActions>
              <RaisedButton
                backgroundColor="violet"
                onClick={this.prev}
                icon={<NavigationChevronLeft color="white" />}
              />
              <RaisedButton label="Today" onClick={this.today} />
              <RaisedButton
                backgroundColor="violet"
                onClick={this.next}
                icon={<NavigationChevronRight color="white" />}
              />
            </CardActions>
          </Card>
          <DialogEvent
            events={this.state.events}
            open={this.state.open}
            onHandleClose={this.handleCloseChange}
            date={this.state.date}
            addNewEvent={this.addNewEvent}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Index;
