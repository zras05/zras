
import { List, ListItem, ListItemText } from '@material-ui/core';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import * as React from "react";
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { axiosRequest } from "src/assets/js/request";
import 'src/assets/styles/resume.min.css';
import { ResumeLogo } from 'src/components/resume/resumeLogo';
import { WorkDetails } from 'src/components/resume/workDetails';
import { WorkExperience } from 'src/components/resume/workExperience';

interface LeftListsModel {
  pid: string
  name: string
}

const showClass = {
  left: 0
}
const hideClass = {
  left: '-240px'
}
const showBtnClass = {
  color: '#fff',
  right: '20px'
}
const hideBtnClass = {
  color: '#445793',
  right: '-40px'
}
class Collection extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      isToggle: false,
      leftLists: [],
      selectedIndex: '',
    }
  }

  public handleListItemClick(id: string, e: any) {
    this.setState({
      isToggle: false,
      selectedIndex: id,
    })
  }

  public toggle = () => {
    const { isToggle } = this.state
    this.setState({
      isToggle: !isToggle
    })
  }

  public async componentDidMount() {
    const obj = {
      type: 'get',
      url: '/api/resume/project',
    }
    const leftLists = await axiosRequest(obj)
    if (leftLists) {
      this.setState({ leftLists })
    } else {
      console.log('Request Error')
    }
  }

  public render() {
    const id = this.props.match.params.id
    const { selectedIndex, leftLists, isToggle } = this.state
    return (
      <div className="zras-resume resume-workCollection">
        <div className="resume-left"
          style={isToggle ? showClass : hideClass}
        >
          <FormatListBulleted className="left-menu"
            onClick={this.toggle}
            style={isToggle ? showBtnClass : hideBtnClass}
          />
          <List component="div" className="company-lists">
            {
              leftLists.length ? leftLists.map(({ pid, name }: LeftListsModel) => (
                <ListItem key={pid} className="item"
                  selected={selectedIndex === pid}
                  onClick={this.handleListItemClick.bind(this, pid)}
                >
                  <NavLink to={`/workCollection/${pid}`}>
                    <ListItemText className="name" primary={name} />
                  </NavLink>
                </ListItem>
              ))
                : ''
            }
          </List>
          <p className="toResume">
            <NavLink to={'/resume'}>
              个人简历
            </NavLink >
          </p>
        </div>
        <div className="resume-right">
          {
            id ? <WorkDetails /> : <WorkExperience />
          }
        </div>
        <ResumeLogo link="/workCollection" />
      </div>
    )
  }
}

export const WorkCollection = withRouter(Collection)
