
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
class Collection extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      leftLists: [],
      selectedIndex: '',
    }
  }

  public handleListItemClick(id: string, e: any) {
    this.setState({
      selectedIndex: id
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
    const { selectedIndex, leftLists } = this.state
    return (
      <div className="zras-resume resume-workCollection">
        <div className="resume-left">
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
