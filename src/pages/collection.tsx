import * as React from "react";
import { Link } from 'react-router-dom';

interface ListType {
  name: string
  category: string
  pathname: string
}

const collectionList: ListType[] = [
  {
    category: 'Date',
    name: '日期显示格式',
    pathname: '/collection/date',
  }, {
    category: 'Video',
    name: '视频编辑',
    pathname: '/collection/video',
  },
]


export const Collection = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <div className="zras-collection">
        {collectionList.map(({ name, category, pathname }: ListType) => (
          <div className="row">
            <Link to={{
              pathname,
              state: { category }
            }}>{name}</Link>
          </div>
        ))
        }
      </div>
    )
  }
}
