import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react';

function Son(props, ref) {
  const inputRef = useRef();
  const [value, setValue] = useState('');

  useImperativeHandle(
    ref,
    () => {
      const handleRefs = {
        onFocus() {
          inputRef.current.focus();
        },
        onChangeValue(value) {
          setValue(value);
        },
      };

      return handleRefs;
    },
    []
  );

  return <input placeholder='请输入内容' ref={inputRef} value={value} />;
}

const ForwardSon = forwardRef(Son);

export default class Father extends React.Component {
  curr = null;

  handleClick = () => {
    const { onFocus, onChangeValue } = this.curr;
    onFocus();
    onChangeValue('hello world');
  };

  render() {
    return (
      <div>
        <ForwardSon ref={(curr) => (this.curr = curr)} />
        <button onClick={this.handleClick}>点击</button>
      </div>
    );
  }
}
