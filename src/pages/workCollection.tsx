
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as React from "react";
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { companyLists } from 'src/assets/data/resume.js';
import 'src/assets/styles/resume.min.css';
import { ResumeLogo } from 'src/components/resume/resumeLogo';
import { WorkDetails } from 'src/components/resume/workDetails';
import { WorkExperience } from 'src/components/resume/workExperience';
export const WorkCollection = class extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedIndex: ''
    }
  }
 public handleListItemClick (id: string, e: any ) {
this.setState({
  selectedIndex: id
})
 }
  public render() {
    let leftLists: any[] = []
    for (const i in companyLists) {
      if (companyLists[i]) {
        leftLists = [...leftLists, ...companyLists[i].project]
      }
    }
    const {selectedIndex}= this.state
    return (
      <div className="zras-resume resume-workCollection">
        <div className="resume-left">
          <List component="div" className="company-lists">
            {
              leftLists.map(({ pid, name }: any) => (
                <ListItem key={pid} className="item" 
                selected={selectedIndex === pid} 
                onClick={this.handleListItemClick.bind(this, pid)}
                >
                  <NavLink to={`/workCollection/${pid}`}>
                    <ListItemText className="name" primary={name} />
                  </NavLink>
                </ListItem>
              ))
            }
          </List>
          <p className="toResume">
            <NavLink to={'/resume'}>
              个人简历
            </NavLink >
          </p>
        </div>
        <div className="resume-right">
          <Switch>
            <Route path='/workCollection' exact={true} component={WorkExperience} />
            <Route path='/workCollection/:id' component={WorkDetails} />
          </Switch>
        </div>
        <ResumeLogo link="/workCollection" />
      </div>
    )
  }
}

