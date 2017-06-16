# react-mapState
## Add state to components

### 1.- Create a component

```jsx
interface Props {
    value: string;
    onChange: (x: string) => void;
}
class MyComp extends React.PureComponent<Props, {}> {
    render() {
        return <input value={this.props.value} onChange={this.props.onChange} />
    }
}
```

### 2.- Add state to it:
```jsx
import { mapState } from "react-mapState"
const MyCompUncontrolled = mapState((props, state, setState) => ({
    //Define a mapping for each prop, in function of the internal state
    value: state.value,
    onChange: value => setState({ value})
}), 
//Initial state
() => ({ value: "" }))(MyComp);
```

### 3.- Composable functions
```ts
function MakeUncontrolled(valueProp, onChangeProp, initialValue) {
    return mapState((props, state, setState) => ({
        value: state.value,
        onChange: value => setState({ value })
    }), 
    () => ({ value: initialValue }));
}

const MyCompUncontrolled = MakeUncontrolled("value", "onChange", "")(MyComp);
```