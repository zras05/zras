import * as React from "react";

interface Props {
  count: number
  page: number
}

interface States {
  curnum: number
}

const wrap = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}

const w = '12px';

const base = {
  background: '#ffffff',
  borderRadius: w,
  height: w,
  margin: '0 20px',
  width: w,
}

const active = {
  background: '#445793',
}

export const Paging = class extends React.Component<Props, States> {

  public static getDerivedStateFromProps(nextProps: Props, currentState: States) {
    const next = nextProps.page
    const cur = currentState.curnum
    if (next !== cur) {
      return {
        curnum: next
      }
    }
    return null
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      curnum: 0
    }
  }


  public componentDidUpdate(prevProps: Props) {
    if (prevProps.page !== this.state.curnum) {
      // this.initComp()
      // console.log('page changed')
    }
  }
  public componentDidMount() {
    // this.initComp()
  }

  public render() {
    const { count } = this.props
    const { curnum } = this.state
    const arr = Array(count).fill(1).map((item, index) => (item + index))
    return (
      <div className="paging" style={wrap}>
        {
          arr
            ? arr.map((index: number) => (
              <div className="page-item" key={index} style={index === curnum ? { ...base, ...active } : base} />
            ))
            : null
        }
      </div>
    )
  }
}