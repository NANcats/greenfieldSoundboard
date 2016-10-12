'esversion: 6';

class Layout extends React.Component {
  render() {
    return (
      <div className="loading">
        <h1 className="intro">Good Times Ahead . . .</h1>
        <img src="../../assets/tumblr_luxr3mmGVw1r1sjguo1_400.gif"/>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
  <Layout/>
  </div>, document.getElementById('app')
);
