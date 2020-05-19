import * as React from "react";
import { connect } from 'react-redux';
// import { Login } from './../components/login';
import { albumDirectory, AlbumDirectoryType, DateWithPrecision, SingleType, translationDate } from "./../assets/r/datas";
import { mapDispatchToProps, mapStateToProps } from "./../store";

const RClass = class extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  public addZreo = (num: number) => (num < 10 ? "0" + num : num)

  public menuDate = (dateStr: number | any) => {
    // number | object
    const dateType = typeof dateStr
    switch (dateType) {
      case 'number':
        return translationDate({ timestamp: dateStr })
      case 'object':
        const strArr = dateStr.map(({ timestamp, precision }: DateWithPrecision) => {
          if (!timestamp) {
            return '今'
          }
          return translationDate({ timestamp, precision })
        })
        return strArr.join('至')
      default:
        return translationDate({ timestamp: dateStr })
    }
  }



  public render() {
    // const { auth } = this.props
    // const { isLogging } = auth
    // if (!isLogging) {
    //   return (
    //     <div className="zras-page">
    //       <Login />
    //     </div>
    //   )
    // }
    return (
      <div className="zras-page">
        <ul className="albumDirectory">
          {
            albumDirectory.map(
              ({ albumID, albumName, date, type, source, directory }: AlbumDirectoryType) =>
                (
                  type !== 6 ? (
                    <li key={albumID} className="album">
                      <p className="albumName">{albumName}</p>
                      <p className="date">{this.menuDate(date)}</p>
                      <p className="source">{source}</p>
                      {
                        directory &&
                        directory.map(({ singlenName, singleID, version }: SingleType) => (
                          <div key={singleID} className="directory">
                            <p className="singlenName">{singlenName}</p>
                            <p className="version">{version}</p>
                          </div>
                        ))
                      }
                    </li>
                  ) : null
                )
            )
          }
        </ul>
      </div>
    )
  }
}

export const R = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  RClass
)