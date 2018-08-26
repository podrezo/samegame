const React = require('react');

class SampleComponent extends React.Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div className="content">
        Hello, world! (via ReactJS)
      </div>
    )
  }
}

export default SampleComponent;