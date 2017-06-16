import React = require("react");

export type SetStateFunc<TState> = <K extends keyof TState>(state: Pick<TState, K>, callback?: () => void) => void;

/**
 * Map external props and an internal state to a component that store that internal state and renders the given inner component
 * @param getProps Get object props given internal state
 * @param getInitialState Gets the initial state
 */
export function mapState<TProps extends object, TState>(getProps: <K extends keyof TProps>(props: TProps, state: TState, setState: SetStateFunc<TState>) => Pick<TProps, K>, getInitialState: (props: TProps) => TState) {
    return function (Component: React.ComponentClass<TProps>) {
        const ret: React.ComponentClass<TProps> = class StateWrapper extends React.PureComponent<TProps, TState> {
            constructor(props) {
                super(props);
                this.state = getInitialState(props);
            }

            render() {
                const childProps = Object.assign(this.props, getProps(this.props, this.state, this.setState));
                return <Component {...childProps} />
            }
        };
        return ret;
    }
}
