import React, { forwardRef, useRef, useEffect } from 'react';

class Form extends React.Component {
  render() {
    return <div>Form</div>;
  }
}

class Index extends React.Component {
  form = null;
  button = null;

  componentDidMount() {
    const { forwardRef } = this.props;
    forwardRef.current = {
      form: this.form,
      index: this,
      button: this.button,
    };
  }

  render() {
    return (
      <div>
        <button ref={(button) => (this.button = button)}>点击</button>
        <Form ref={(form) => (this.form = form)} />
      </div>
    );
  }
}

const ForwardRefIndex = forwardRef((props, ref) => (
  <Index {...props} forwardRef={ref} />
));

export default function Home() {
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return <ForwardRefIndex ref={ref} />;
}
